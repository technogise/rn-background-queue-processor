package com.technogise.rnqueueprocessor;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;

import androidx.work.Constraints;
import androidx.work.ExistingWorkPolicy;
import androidx.work.NetworkType;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;
import androidx.work.WorkRequest;

/**
 *  class to manage the enqueuing of the workers
 */
public class QueueRequestManager {

    /**
     * Get Sync constraints builder
     *
     * @return Builder
     */
    public Constraints.Builder getSyncConstraintsBuilder() {
        return new Constraints.Builder();
    }

    /**
     * Request builder for starting queue processor
     *
     * @return WorkRequest.Builder Builder
     */
    public WorkRequest.Builder getWorkRequestBuilder() {
        return new OneTimeWorkRequest.Builder(QueueRequestWorker.class)
                .addTag(this.getWorkName());
    }

    /**
     * Work Name
     *
     * @return Work name
     */
    public String getWorkName() {
        return QueueRequestWorker.START_PROCESSING_JOB;
    }

    /**
     * Default "Existing Work Policy"
     * Override to change the policy
     *
     * @return Existing Work Policy
     */
    public ExistingWorkPolicy getExistingWorkPolicy(){
        return ExistingWorkPolicy.REPLACE;
    }

    /**
     * Enqueue work provided by the independent implementations
     * @param context
     */
    public final void enqueueWork(ReactApplicationContext context) {
        Constraints constraints = this.getSyncConstraintsBuilder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build();
        WorkRequest.Builder workRequestBuilder = this.getWorkRequestBuilder();
        WorkRequest syncRequest = workRequestBuilder.setConstraints(constraints)
                .build();
        if (syncRequest instanceof OneTimeWorkRequest) {
            Log.i("QueueRequestManager", "Enqueue "+this.getWorkName()+" :Replacing");
            WorkManager.getInstance(context)
                    .enqueueUniqueWork(this.getWorkName(), this.getExistingWorkPolicy(), (OneTimeWorkRequest) syncRequest);
        }
    }
}

package com.technogise.RnQueueProcessor.Manager;

import android.content.Context;
import android.util.Log;

import androidx.work.Constraints;
import androidx.work.ExistingWorkPolicy;
import androidx.work.NetworkType;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;
import androidx.work.WorkRequest;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Abstract class to manage the enqueuing of the workers
 */
public abstract class SyncManager {

    /**
     * Get Sync constraints builder
     *
     * @return Builder
     */
    public Constraints.Builder getSyncConstraintsBuilder() {
        return new Constraints.Builder();
    }

    /**
     * Work request builder
     *
     * @return Builder
     */
    public abstract WorkRequest.Builder getWorkRequestBuilder();

    /**
     * Work Name
     *
     * @return Work Name
     */
    public abstract String getWorkName();

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
            Log.i("SyncManager", "Enqueue "+this.getWorkName()+" :Replacing");
            WorkManager.getInstance(context)
                    .enqueueUniqueWork(this.getWorkName(), this.getExistingWorkPolicy(), (OneTimeWorkRequest) syncRequest);
        }
    }
}

package com.technogise.RnQueueProcessor.Manager;

import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkRequest;

import com.technogise.RnQueueProcessor.Worker.SyncUpWorker;

/**
 * Sync up manager to handle Syncing up requests
 */
public class SyncUpManager extends SyncManager {

    /**
     * Request builder for Syncing up
     *
     * @return WorkRequest.Builder Builder
     */
    @Override
    public WorkRequest.Builder getWorkRequestBuilder() {
        return new OneTimeWorkRequest.Builder(SyncUpWorker.class)
                .addTag(this.getWorkName());
    }

    /**
     * Work Name
     *
     * @return Work name
     */
    @Override
    public String getWorkName() {
        return SyncUpWorker.JOB_TYPE;
    }

}

package com.technogise.rnqueueprocessor.worker;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.work.WorkerParameters;

public class SyncUpWorker extends BackgroundWorker{
    /**
     * Event for starting the Push Cache Sync
     */
    public static final String EVENT_START_PUSH_SYNC = "StartJsPushSync";

    /**
     * Job Type
     */
    public static final String JOB_TYPE = "SYNCUPJOB";

    public SyncUpWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
    }

    /**
     * Js Event Name
     *
     * @return Event name
     */
    @Override
    public String getJsEventName() {
        return EVENT_START_PUSH_SYNC;
    }

}

package com.technogise.rnqueueprocessor;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

public class QueueRequestWorker extends Worker {
    private Context context;
    private static final String TAG = "QueueRequestWorker";

    /**
     * Event for starting the Processing queue
     */
    public static final String EVENT_START_PROCESSING_QUEUE = "startProcessingQueue";

    /**
     * Start Processing Job
     */
    public static final String START_PROCESSING_JOB = "STARTPROCESSINGJOB";

    public QueueRequestWorker(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
        this.context = context;
    }

    /**
     * Js Event Name
     *
     * @return Event name
     */
    public String getJsEventName() {
        return EVENT_START_PROCESSING_QUEUE;
    }
    /**
     * Work definition of the worker
     *
     * @return Result
     */
    @NonNull
    @Override
    public Result doWork() {
        this.sendMessage(this.getJsEventName());
        return Result.success();
    }

    /**
     * Broadcast event to start processing queue to the module
     */
    private void sendMessage(String jsEventName) {
        try {
            Intent intent = new Intent(jsEventName);
            LocalBroadcastManager.getInstance(this.context).sendBroadcast(intent);
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
            e.printStackTrace();
        }
    }
}


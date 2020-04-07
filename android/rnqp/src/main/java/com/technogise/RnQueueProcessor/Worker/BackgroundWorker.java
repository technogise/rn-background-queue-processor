package com.technogise.RnQueueProcessor.Worker;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

public abstract class BackgroundWorker extends Worker {
    private Context context;
    private static final String TAG = "BackgroundWorker";

    public BackgroundWorker(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
        this.context = context;
    }

    /**
     * Get JS Event to broadcast
     *
     * @return Event name
     */
    public abstract String getJsEventName();

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
     * Broadcast event to start pull cache sync to the module
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


package com.technogise.rnqueueprocessor;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

public class SyncModule extends ReactContextBaseJavaModule {

   private static String MODULE_NAME = "SyncModule";
   private static String JS_EVENT_START_PROCESSING_QUEUE = "startProcessingQueue";
   private static String TAG = SyncModule.class.getSimpleName();
   private static ReactApplicationContext context;

   public SyncModule(ReactApplicationContext reactContext) {
       super(reactContext);
       context = reactContext;
       Log.i(TAG, "Sync Module constructor");
       Map<String, String> eventMaps = new HashMap<>();
       eventMaps.put(QueueRequestWorker.EVENT_START_PROCESSING_QUEUE, JS_EVENT_START_PROCESSING_QUEUE);
       this.registerRelayMessage(eventMaps, reactContext);
   }

    private void registerRelayMessage(Map<String, String> eventMaps, ReactApplicationContext reactContext) {
        LocalBroadcastManager localBroadcastManager = LocalBroadcastManager.getInstance(reactContext);
        for (Map.Entry<String, String> event: eventMaps.entrySet()) {
            String eventName = event.getKey();
            final String jsEventName = event.getValue();

            BroadcastReceiver cacheSyncReceiver = new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                    Log.i(TAG, "Received broadcast");
                    SyncModule.this.sendEvent(jsEventName);
                }
            };
            localBroadcastManager.registerReceiver(cacheSyncReceiver, new IntentFilter(eventName));
        }
    }

   @Override
   public String getName() {
       return MODULE_NAME;
   }

   /**
    * Schedule sync up/down job
    */
   @ReactMethod
   public void scheduleJob(String jobType) {
       Log.i(TAG, "Scheduling " + jobType);

       if (jobType.equals(QueueRequestWorker.START_PROCESSING_JOB)) {
           new QueueRequestManager().enqueueWork(context);
       }
   }

    /**
     * Send JS event to start the pull cache sync
     */
    private void sendEvent(String event) {
        Log.i(TAG, "JS event emitted:" + event);
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(event, null);
    }


}

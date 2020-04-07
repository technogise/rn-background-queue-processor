package com.technogise.RnQueueProcessor;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.technogise.RnQueueProcessor.Manager.SyncUpManager;
import com.technogise.RnQueueProcessor.Worker.SyncUpWorker;

import java.util.HashMap;
import java.util.Map;

public class SyncModule extends ReactContextBaseJavaModule {

   private static String MODULE_NAME = "SyncModule";
   private static String JS_EVENT_START_PUSH_SYNC = "startPushSync";
   private static String TAG = SyncModule.class.getSimpleName();
   private static ReactApplicationContext context;

   public SyncModule(ReactApplicationContext reactContext) {
       super(reactContext);
       context = reactContext;
       Log.i(TAG, "Sync Module constructor");
       Map<String, String> eventMaps = new HashMap<>();
       eventMaps.put(SyncUpWorker.EVENT_START_PUSH_SYNC, JS_EVENT_START_PUSH_SYNC);
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

       if (jobType.equals(SyncUpWorker.JOB_TYPE)) {
           new SyncUpManager().enqueueWork(context);
       }
   }

}

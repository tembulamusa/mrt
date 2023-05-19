/*
 * Copyright (c) 2018. All rights reserved.
 */

package com.bikosports.android.net;

import org.json.JSONObject;

import java.util.ArrayList;


/**
 * Created by Reuben on 12/16/2015.
 */
public interface ICallWebService {
    String API_URL = "https://bikoapi.bikosports.co.tz";
    interface CallWebServiceDelegate{
        void ReceivedWebServiceAnswerWithCode(String sType, JSONObject dData, CallWebService cwsCall);
    }
   //check app version
    void checkForUpdates();

}

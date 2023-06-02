/*
 * Copyright (c) 2018. All rights reserved.
 */

package com.bikosports.android.net;

import org.json.JSONObject;

import java.util.ArrayList;


/**
 * Created by Reuben on 10/19/2016.
 */
public interface ISyncModel {
    CallWebService GetWebService(String sCode);



    interface WebServiceErrorDelegate{
        void onErrorReceived();
    }

    //check app version
    void checkForUpdates();

    interface CheckUpdateDelegate{
        void onCheckUpdate(String version);
    }

}

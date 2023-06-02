package com.bikosports.android.net;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Handler;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import javax.net.ssl.HttpsURLConnection;

public class SyncModel implements ISyncModel, ICallWebService.CallWebServiceDelegate {

    Timer timer;
    boolean isExecuting = false;
    private CheckUpdateDelegate checkUpdateDelegate;
    private WebServiceErrorDelegate webServiceErrorDelegate;
    private Context context;
    private String scode = null;

    public SyncModel(Context context) {
        this.context = context;
    }


    public void setCheckUpdateDelegate(CheckUpdateDelegate checkUpdateDelegate) {
        this.checkUpdateDelegate = checkUpdateDelegate;
    }

    @Override
    public CallWebService GetWebService(String sCode) {
        CallWebService cws = new CallWebService(context);
        cws.sCode = sCode;
        cws.delegate = this;
        return cws;
    }

    @Override
    public void ReceivedWebServiceAnswerWithCode(String sType, final JSONObject dData, CallWebService cwsCall) {

//        Log.e("DATA",dData.toString());

        scode = cwsCall.sCode;
        if (dData == null) {
            if (webServiceErrorDelegate != null)
                webServiceErrorDelegate.onErrorReceived();
            return;
        }

        if (cwsCall.sCode.equals(SCode.CHECK_UPDATES))
            checkUpdatesAction(dData);


    }

    private void checkUpdatesAction(JSONObject dData) {
        try {

            String version = dData.getString("version");

            if (checkUpdateDelegate != null)
                checkUpdateDelegate.onCheckUpdate(version);

        } catch (JSONException e) {
            e.printStackTrace();

        }

    }

    public void setWebServiceErrorDelegate(WebServiceErrorDelegate webServiceErrorDelegate) {
        this.webServiceErrorDelegate = webServiceErrorDelegate;
    }


    private void performTLSWebCall(final String requestURL,
                                   final HashMap<String, String> postDataParams) {

        new AsyncTask<String, String, String>() {


            @Override
            protected String doInBackground(String... params) {

                isExecuting = true;

                URL url;
                String response = "";
                try {
                    url = new URL(requestURL);

                    HttpsURLConnection.setDefaultSSLSocketFactory(new TLSSocketFactory());
                    HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
                    conn.setReadTimeout(15000);
                    conn.setConnectTimeout(15000);
                    conn.setRequestMethod("GET");
                    conn.setDoInput(true);
                    conn.setDoOutput(true);
                    conn.connect();

                    OutputStream os = conn.getOutputStream();
                    BufferedWriter writer = new BufferedWriter(
                            new OutputStreamWriter(os, "UTF-8"));
                    writer.write(getPostDataString(postDataParams));

                    writer.flush();
                    writer.close();
                    os.close();
                    int responseCode = conn.getResponseCode();


                    if (responseCode == HttpsURLConnection.HTTP_OK) {
                        String line;
                        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                        while ((line = br.readLine()) != null) {
                            response += line;
                        }
                    } else {
                        response = "";

                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

                Log.e("request_url", requestURL);
                Log.e("request_url_request_res", response);

                return response;

            }


        }.execute();
    }
    private String getPostDataString(HashMap<String, String> params) throws UnsupportedEncodingException {
        StringBuilder result = new StringBuilder();
        boolean first = true;
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (first)
                first = false;
            else
                result.append("&");

            result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
            result.append("=");
            result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
        }

        return result.toString();
    }
    @Override
    public void checkForUpdates() {
        GetWebService(SCode.CHECK_UPDATES).checkForUpdates();
    }

}
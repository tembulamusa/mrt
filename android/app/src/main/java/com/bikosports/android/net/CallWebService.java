package com.bikosports.android.net;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Looper;
import android.util.Log;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.PersistentCookieStore;
import com.loopj.android.http.RequestParams;
import com.loopj.android.http.SyncHttpClient;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.net.ssl.HttpsURLConnection;
import cz.msebera.android.httpclient.Header;

/**
 * Created by MUOKI on 10/12/2021.
 */
public class CallWebService extends AsyncHttpResponseHandler implements ICallWebService {
    CallWebServiceDelegate delegate = null;
    String sCode, sRootPath = null;

    private Context context;

    public static String getPublicIPAddress(){
        String value = null;
        ExecutorService es = Executors.newSingleThreadExecutor();
        Future<String> result = es.submit(new Callable<String>() {
            public String call() throws Exception {
                try {
                    URL url = new URL("http://whatismyip.akamai.com/");
                    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                    try {
                        InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                        BufferedReader r = new BufferedReader(new InputStreamReader(in));
                        StringBuilder total = new StringBuilder();
                        String line;

                        while ((line = r.readLine()) != null) {
                            total.append(line);
                        }
                        urlConnection.disconnect();
                        return total.toString();
                    } finally {

                        urlConnection.disconnect();
                    }
                }catch (IOException e){
                    Log.e("Public IP: ", e.getMessage());
                }
                return null;
            }
        });
        try {
            value = result.get();
        } catch (Exception e) {
            // failed
        }
        es.shutdown();
        return value;
    }

    public CallWebService(Context context) {
        this.context = context;
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {

        String result = new String(responseBody);//json result

        Log.e("JSONResponse","scode:"+sCode+"Result:"+ result);

        try {
            //check if json object or array
            JSONObject object = null;
            Object json = new JSONTokener(result).nextValue();
            if (json instanceof JSONObject){
                //do something for JSONObject
                Log.e("Response","Type:::JSONObject:");

                object = new JSONObject(result);

            } else {
                //do something for JSONArray
                Log.e("Response","Type:::JSONArray:");

                JSONArray jsonArray = new JSONArray(result);
                Log.e("jsonarray==>", jsonArray.toString());

                object = new JSONObject();

                object.put("data",jsonArray);
                Log.e("resulting jsonobject", object.toString());

            }


            if (delegate != null){

                delegate.ReceivedWebServiceAnswerWithCode(sCode, object , this);

            }else {
                Log.e("delegate","is null");

            }
        } catch (JSONException e) {
            //e.printStackTrace();
        }
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
        //web service call failed //show error message
        //   error.printStackTrace();
        Log.v(" Failure Status ", " Failure Status Code " + statusCode + " " + new String(responseBody));
        String result = new String(responseBody);//json result

        if (responseBody != null) {
            if (statusCode == 422) {

                try {
                    JSONArray jsonArray = new JSONArray();

                    JSONObject object = new JSONObject(result);
                    //todo include this in endpoint currentCode =  object.getString("sCode");//parse sCode from Json

                    jsonArray.put(object);


                    if (delegate != null)

                        delegate.ReceivedWebServiceAnswerWithCode(sCode, object, this);

                } catch (JSONException e) {

                    e.printStackTrace();

                }

            } else {


                Log.e("Failed SCODE::", sCode);

                try {

                        JSONArray jsonArray = new JSONArray();

                        Log.e("Failed result:: " + sCode, result);

                        JSONObject object = new JSONObject(result);

                        jsonArray.put(object);

                        if(delegate != null )
                            delegate.ReceivedWebServiceAnswerWithCode(sCode, object, this);
                        Log.v(" Ll", " hhh");


                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }

        }
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


    private void performTLSWebCall(final String requestURL,
                                   final String postDataParams) {

        new AsyncTask<String, String, String>() {


            @Override
            protected String doInBackground(String... params) {



                URL url;
                String response = "";
                try {
                    url = new URL(requestURL);

                    HttpsURLConnection.setDefaultSSLSocketFactory(new TLSSocketFactory());
                    HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
                    conn.setReadTimeout(15000);
                    conn.setConnectTimeout(15000);
                    conn.setRequestMethod("POST");
                    conn.setDoInput(true);
                    conn.setDoOutput(true);
                    conn.connect();

                    OutputStream os = conn.getOutputStream();
                    BufferedWriter writer = new BufferedWriter(
                            new OutputStreamWriter(os, "UTF-8"));
                    writer.write(postDataParams);

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

                return response;

            }

            @Override
            protected void onPostExecute(String s) {

                Log.v("REsponse", "Live Bet:Finished webcall " + s);

                String result = new String(s);//json result

                // Log.i("JSONResponse","scode:"+sCode+"Result:"+ result);
                // Toast.makeText(context,result,Toast.LENGTH_LONG).show();

                //  String currentCode = "" ;
                try {
                    JSONArray jsonArray = new JSONArray();


                    JSONObject object = new JSONObject(result);

                    jsonArray.put(object);


                    if (delegate != null)
                        delegate.ReceivedWebServiceAnswerWithCode(sCode, object, CallWebService.this);

                } catch (JSONException e) {
                    //e.printStackTrace();
                }

            }
        }.execute();
    }

    @Override
    public void checkForUpdates() {
        sCode = SCode.CHECK_UPDATES;

        AsyncHttpClient client = new AsyncHttpClient();
//        Log.e("checkForUpdates", "sending checkForUpdates");
        //client.setBasicAuth(context.getString(R.string.username),context.getString(R.string.pass));
        client.get(context, "https://bikoapi.bikosports.co.tz/checkVersion", null, "application/json",
                this);
    }


    public class HttpRequest {

        // A SyncHttpClient is an AsyncHttpClient
        public AsyncHttpClient syncHttpClient = new SyncHttpClient();
        public AsyncHttpClient asyncHttpClient = new AsyncHttpClient();


        public void setCookieStore(PersistentCookieStore cookieStore) {
            getClient().setCookieStore(cookieStore);
        }

        public void get(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
            getClient().get(url, params, responseHandler);

        }


        /**
         * @return an async client when calling from the main thread, otherwise a sync client.
         */
        private AsyncHttpClient getClient() {

            asyncHttpClient.setMaxRetriesAndTimeout(3,5000);
            syncHttpClient.setMaxRetriesAndTimeout(3,5000);



            // Return the synchronous HTTP client when the thread is not prepared
            if (Looper.myLooper() == null)
                return syncHttpClient;
            return asyncHttpClient;
        }
    }

}

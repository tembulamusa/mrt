package com.bikosports.android;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.webkit.WebView;
import android.widget.Toast;

import com.bikosports.android.net.ISyncModel;
import com.bikosports.android.net.SyncModel;
import com.bikosports.android.util.PrefUtils;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private ProgressDialog mProgressDialog;
    private boolean backPressedOnce = false;
    boolean isDownloading = false;

    @Override
    public void onResume() {
        super.onResume();
        final PrefUtils prefs = new PrefUtils(this);
        prefs.setIsFirstRun(false);

        SyncModel syncModel = new SyncModel(this);
        syncModel.setCheckUpdateDelegate(new ISyncModel.CheckUpdateDelegate() {
            @Override
            public void onCheckUpdate(String version) {
                double currentVersion = getVersionCode(MainActivity.this);
                Log.e("currentVersion", "currentVersion:" + currentVersion);

                if (!isDownloading)
                    if (currentVersion != Double.parseDouble(version)) {
                        AlertDialog.Builder bd = new AlertDialog.Builder(MainActivity.this, R.style.AlertDialogTheme);
                        bd.setTitle("Update Available");
                        bd.setMessage("Would you like to download and install new update?");
                        bd.setNegativeButton("Remind me Later", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                dialog.dismiss();

                                prefs.shouldUpdate(false);
                            }
                        });
                        bd.setPositiveButton("Install Now", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                // execute this when the downloader must be fired

                                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.bikosports.co.tz/app"));
                                startActivity(browserIntent);
                            }
                        });
                        bd.show();
                    }
            }
        });
        syncModel.checkForUpdates();//check for updates first
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(EchoPlugin.class);
        super.onCreate(savedInstanceState);
        WifiManager manager =(WifiManager)  getApplicationContext().getSystemService(WIFI_SERVICE);
        mProgressDialog = new ProgressDialog(MainActivity.this);
        mProgressDialog.setMessage("Downloading update please wait...");
        mProgressDialog.setIndeterminate(false);
        mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        mProgressDialog.setCancelable(false);
    }
    public static double getVersionCode(Context ctx) {
        try {
            PackageManager manager = ctx.getPackageManager();
            PackageInfo info = manager.getPackageInfo(ctx.getPackageName(), 0);
            return Double.parseDouble("" + info.versionCode);
        } catch (PackageManager.NameNotFoundException e) {
            return -1.0;
        }
    }
    @Override
    public void onBackPressed() {
        WebView webView = getBridge().getWebView();
        if(webView.canGoBack()){
            webView.goBack();
        } else if (backPressedOnce) {
            super.onBackPressed();
            return;
        } else {
            backPressedOnce = true;
            Toast.makeText(this, "Press back again to exit the app or click the Biko icon to get back to Home Page", Toast.LENGTH_LONG).show();
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    backPressedOnce = false;
                }
            }, 2000);
        }
    }
    
}
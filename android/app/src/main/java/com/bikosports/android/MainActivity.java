package com.bikosports.android;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.example.myapp.EchoPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(EchoPlugin.class);
        super.onCreate(savedInstanceState);
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

}

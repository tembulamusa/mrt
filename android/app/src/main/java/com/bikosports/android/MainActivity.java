package com.bikosports.android;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.example.myapp.EchoPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(EchoPlugin.class);
        super.onCreate(savedInstanceState);
    }
}

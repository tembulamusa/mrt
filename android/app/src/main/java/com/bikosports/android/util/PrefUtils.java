package com.bikosports.android.util;

import android.content.Context;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Miller on 06/1/2023.
 */

public class PrefUtils {


    private Context context;

    public PrefUtils(Context context) {
        this.context = context;
    }


    public void shouldUpdate(boolean remindMe)
    {
        context.getSharedPreferences("PREFS", Context.MODE_PRIVATE).edit().putBoolean("remind_update", remindMe).commit();

    }

    public  boolean shouldUpdate(){
        return  context.getSharedPreferences("PREFS", Context.MODE_PRIVATE).getBoolean("remind_update", true);

    }

    public void setIsFirstRun(boolean isFirstRun){
        context.getSharedPreferences("PREFS", Context.MODE_PRIVATE).edit().putBoolean("isFirstRun", isFirstRun).commit();

    }


    public boolean  isFirstRun(){
        return  context.getSharedPreferences("PREFS", Context.MODE_PRIVATE).getBoolean("isFirstRun",true);

    }
    public void setVerifyToken(String authToken) {
        context.getSharedPreferences("PREFS", Context.MODE_PRIVATE).edit().putString("authToken", authToken).commit();
    }
    //save phone

    public void setUserID(String id) {
        context.getSharedPreferences("PREFS", Context.MODE_PRIVATE).edit().putString("userID", id).commit();
    }

}
package com.applicationforaac

import android.os.Bundle;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.google.firebase.FirebaseApp;
import com.google.firebase.firestore.FirebaseFirestore;

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

   private lateinit var firestore: FirebaseFirestore

  override fun getMainComponentName(): String = "ApplicationForAAC"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)

     // Initialize Firebase
    FirebaseApp.initializeApp(this); 

    // Now you can use Firestore
    firestore = FirebaseFirestore.getInstance()
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)


}



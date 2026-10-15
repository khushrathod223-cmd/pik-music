#!/bin/bash
set -e

echo "=== 1. Building Web Assets with Vite ==="
npm run build

echo "=== 2. Setting up APK build workspace ==="
rm -rf apk-build
mkdir -p apk-build/src/com/pik/music/scui
mkdir -p apk-build/res/values
mkdir -p apk-build/res/mipmap-hdpi
mkdir -p apk-build/res/mipmap-mdpi
mkdir -p apk-build/res/mipmap-xhdpi
mkdir -p apk-build/res/mipmap-xxhdpi
mkdir -p apk-build/bin
mkdir -p apk-build/assets

# Copy built dist files to assets
cp -r dist/* apk-build/assets/

# Copy launcher icons
cp public/pwa-192x192.png apk-build/res/mipmap-hdpi/ic_launcher.png
cp public/pwa-192x192.png apk-build/res/mipmap-mdpi/ic_launcher.png
cp public/pwa-512x512.png apk-build/res/mipmap-xhdpi/ic_launcher.png
cp public/pwa-512x512.png apk-build/res/mipmap-xxhdpi/ic_launcher.png

# Create strings.xml
cat << 'EOF' > apk-build/res/values/strings.xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">PiK Music SCuII</string>
</resources>
EOF

# Create AndroidManifest.xml
cat << 'EOF' > apk-build/AndroidManifest.xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.pik.music.scui"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="33" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:supportsRtl="true">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|screenLayout|keyboardHidden"
            android:theme="@android:style/Theme.NoTitleBar.Fullscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
EOF

# Create MainActivity.java
cat << 'EOF' > apk-build/src/com/pik/music/scui/MainActivity.java
package com.pik.music.scui;

import android.app.Activity;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );

        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/index.html");

        setContentView(webView);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
EOF

echo "=== 3. Compiling Java with javac ==="
javac -source 8 -target 8 -bootclasspath /usr/lib/android-sdk/platforms/android-23/android.jar -d apk-build/bin apk-build/src/com/pik/music/scui/MainActivity.java

echo "=== 4. Packaging Dalvik bytecode with dalvik-exchange ==="
/usr/bin/dalvik-exchange --dex --output=apk-build/classes.dex apk-build/bin

echo "=== 5. Packaging resources with aapt ==="
aapt package -f -m \
  -F apk-build/unaligned.apk \
  -M apk-build/AndroidManifest.xml \
  -S apk-build/res \
  -A apk-build/assets \
  -I /usr/lib/android-sdk/platforms/android-23/android.jar

(cd apk-build && aapt add unaligned.apk classes.dex)

echo "=== 6. Aligning APK with zipalign ==="
zipalign -f -p 4 apk-build/unaligned.apk apk-build/aligned.apk

echo "=== 7. Signing APK with apksigner ==="
if [ ! -f debug.keystore ]; then
  keytool -genkeypair -v \
    -keystore debug.keystore \
    -storepass android \
    -alias androiddebugkey \
    -keypass android \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -dname "CN=Android Debug,O=Android,C=US"
fi

mkdir -p public
apksigner sign \
  --ks debug.keystore \
  --ks-pass pass:android \
  --key-pass pass:android \
  --ks-key-alias androiddebugkey \
  --out public/pik-music-scui.apk \
  apk-build/aligned.apk

echo "=== 8. Verifying APK signature ==="
apksigner verify -v public/pik-music-scui.apk

ls -lh public/pik-music-scui.apk
echo "SUCCESS! Real signed Android APK ready at public/pik-music-scui.apk"

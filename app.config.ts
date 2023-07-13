import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  slug: 'contacts',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#FFF',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFF',
    },
    package: Env.PACKAGE,
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          // anything higher than version 0.182.0 will fail at the moment
          flipper: '0.182.0',
          enableProguardInReleaseBuilds: true,
          extraProguardRules:
            '-keep @com.facebook.proguard.annotations.DoNotStrip class * -keepclassmembers class * { @com.facebook.proguard.annotations.DoNotStrip *; } -keep @com.facebook.proguard.annotations.DoNotStripAny class * { *; } -keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * { void set*(***); *** get*(); } -keep class * implements com.facebook.react.bridge.JavaScriptModule { *; } -keep class * implements com.facebook.react.bridge.NativeModule { *; } -keepclassmembers,includedescriptorclasses class * { native <methods>; } -keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; } -keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }  -dontwarn com.facebook.react.** -keep,includedescriptorclasses class com.facebook.react.bridge.** { *; } -keep,includedescriptorclasses class com.facebook.react.turbomodule.core.** { *; } -keep class com.facebook.jni.** { *; } -keep class sun.misc.Unsafe { *; } -dontwarn java.nio.file.* -dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement -dontwarn okio.** -keep class com.swmansion.reanimated.** { *; } -keep class com.facebook.react.turbomodule.** { *; } -keep public class com.horcrux.svg.** {*;}',
        },
      },
    ],
  ],
});

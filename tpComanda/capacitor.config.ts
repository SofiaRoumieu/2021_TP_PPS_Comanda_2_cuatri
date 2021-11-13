import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.comandaionic.tpcomandaapp',
  appName: 'TpComandaApp',
  webDir: 'www',
  bundledWebRuntime: false,
  npmClient:'npm',
  plugins:{
    SplashScreen:{
      launchShowDuration: 1000,
      FadeSplashScreen: false
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    }
  },
  cordova: {}
};

export default config;

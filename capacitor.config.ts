import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.solso',
  appName: 'CargaUsuarios',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen : {
      launchShowDuration: 2950
    }
  },
};

export default config;

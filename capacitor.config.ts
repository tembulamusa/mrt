import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ivlab5-mobile-app',
  webDir: 'dist',
  bundledWebRuntime: false,

  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: [
      "http://test.test.id/api/*"
    ]
  }
};

export default config;

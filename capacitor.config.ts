import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.ultrondevelopments.markethub',
    appName: 'MarketHub',
    webDir: 'out',
    server: {
        androidScheme: 'https',
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            backgroundColor: '#ffffff',
            showSpinner: false,
        },
    },
};

export default config;

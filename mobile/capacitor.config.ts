import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.oaes',
	appName: 'oaes',
	webDir: 'build',
	bundledWebRuntime: false,
	server: {
		allowNavigation: [process.env.REACT_APP_SERVER_URL ?? 'http://localhost:8000'],
	},
};

export default config;


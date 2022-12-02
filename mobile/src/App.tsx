import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@avidian/extras';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/** Tailwind */
import './theme/tailwind.css';

/* Theme variables */
import './theme/variables.css';
import { routes } from './routes';
import Administrator from './pages/Administrator/Index';
import Rider from './pages/Rider/Index';
import Customer from './pages/Customer/Index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import stateService from './services/State';
import httpService from './services/Http';
import { useToggle } from '@avidian/hooks';

setupIonicReact({
	mode: 'ios',
});

const App: React.FC = () => {
	const [loading, setLoading] = useToggle(true);

	const validateToken = async (token: string) => {
		const types = ['administrator', 'customer', 'rider'];

		let isAuthenticated = false;

		for (const type of types) {
			try {
				await httpService.get(`/v1/${type}/auth/check`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				isAuthenticated = true;
				break;
			} catch (error) {}
		}

		if (!isAuthenticated) {
			throw new Error();
		}
	};

	const check = async () => {
		const token = stateService.get('token');

		if (token) {
			try {
				await validateToken(token);
			} catch (error) {
				stateService.remove('token');
			}
		}

		setLoading(false);
	};

	useEffect(() => {
		check();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<QueryClientProvider client={new QueryClient()}>
			<IonApp>
				{!loading ? (
					<IonReactRouter>
						<IonRouterOutlet>
							<Route exact path={routes.HOME} render={(props) => <Home {...props} />} />
							<Route path={routes.ADMINISTRATOR} render={(props) => <Administrator {...props} />} />
							<Route path={routes.CUSTOMER} render={(props) => <Customer {...props} />} />
							<Route path={routes.RIDER} render={(props) => <Rider {...props} />} />
							<Route>
								<Redirect to={routes.HOME} />
							</Route>
						</IonRouterOutlet>
					</IonReactRouter>
				) : null}
			</IonApp>
		</QueryClientProvider>
	);
};

export default App;


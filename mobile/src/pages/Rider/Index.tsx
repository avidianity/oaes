import { IonContent, IonPage, IonRouterOutlet } from '@ionic/react';
import React, { FC } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import Login from '../../components/Login';
import { useLogin } from '../../hooks';
import { routes } from '../../routes';
import Home from './Home';

interface Props extends RouteComponentProps {}

const Rider: FC<Props> = (props) => {
	useLogin(routes.RIDER);

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonRouterOutlet>
					<Route path={`${routes.RIDER}${routes.children.rider.LOGIN}`} render={(props) => <Login {...props} />} />
					<Route path={`${routes.RIDER}/home`} render={(props) => <Home {...props} />} />
					<Route exact path={`${routes.RIDER}`} render={() => <Redirect to={`${routes.RIDER}${routes.children.rider.LOGIN}`} />} />
				</IonRouterOutlet>
			</IonContent>
		</IonPage>
	);
};

export default Rider;

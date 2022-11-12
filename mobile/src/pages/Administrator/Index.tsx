import { IonContent, IonPage, IonRouterOutlet } from '@ionic/react';
import React, { FC } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import Login from '../../components/Login';
import { routes } from '../../routes';
import Home from './Home';

interface Props extends RouteComponentProps {}

const Administrator: FC<Props> = (props) => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<IonRouterOutlet>
					<Route path={`${routes.ADMINISTRATOR}${routes.children.administrator.LOGIN}`} render={(props) => <Login {...props} />} />
					<Route path={`${routes.ADMINISTRATOR}/home`} render={(props) => <Home {...props} />} />
					<Route exact path={`${routes.ADMINISTRATOR}`} render={() => <Redirect to={`${routes.ADMINISTRATOR}${routes.children.administrator.LOGIN}`} />} />
				</IonRouterOutlet>
			</IonContent>
		</IonPage>
	);
};

export default Administrator;

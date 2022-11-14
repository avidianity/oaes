import { IonContent, IonPage, IonRouterOutlet } from '@ionic/react';
import React, { FC } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import Login from '../../components/Login';
import Register from '../../components/Register';
import { useLogin } from '../../hooks';
import { routes } from '../../routes';
import Home from './Home';

interface Props extends RouteComponentProps {}

const Customer: FC<Props> = (props) => {
	useLogin(routes.CUSTOMER);

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonRouterOutlet>
					<Route exact path={`${routes.CUSTOMER}${routes.children.customer.LOGIN}`} render={(props) => <Login {...props} />} />
					<Route exact path={`${routes.CUSTOMER}${routes.children.customer.REGISTER}`} render={(props) => <Register {...props} />} />
					<Route path={`${routes.CUSTOMER}/home`} render={(props) => <Home {...props} />} />
					<Route exact path={`${routes.CUSTOMER}`} render={() => <Redirect to={`${routes.RIDER}${routes.children.customer.LOGIN}`} />} />
				</IonRouterOutlet>
			</IonContent>
		</IonPage>
	);
};

export default Customer;

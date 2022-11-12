import { IonContent, IonPage, IonRouterOutlet } from '@ionic/react';
import React, { FC } from 'react';
import { Route, RouteComponentProps } from 'react-router';
import Login from '../../components/Login';
import { useLogin } from '../../hooks';
import { routes } from '../../routes';

interface Props extends RouteComponentProps {}

const Customer: FC<Props> = (props) => {
	useLogin(routes.CUSTOMER);

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonRouterOutlet>
					<Route exact path={`${routes.CUSTOMER}${routes.children.customer.LOGIN}`} render={(props) => <Login {...props} />} />
				</IonRouterOutlet>
			</IonContent>
		</IonPage>
	);
};

export default Customer;

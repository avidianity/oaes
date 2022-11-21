import { IonContent, IonPage } from '@ionic/react';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { useLogin } from '../../hooks';
import { routes } from '../../routes';
import { bodyOutline, settingsOutline, pricetagOutline } from 'ionicons/icons';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import Settings from '../Settings';
import Customers from './Customers';
import Orders from './Orders';

interface Props extends RouteComponentProps {}

const Home: FC<Props> = (props) => {
	useLogin(routes.RIDER);

	return (
		<IonPage>
			<IonContent fullscreen>
				<BottomNavigationBar
					tabs={[
						{
							route: `${routes.RIDER}/home/customers`,
							default: true,
							icon: bodyOutline,
							label: 'Customers',
							name: 'customers',
							render: (_: RouteComponentProps) => <Customers />,
						},
						{
							route: `${routes.RIDER}/home/orders`,
							default: false,
							icon: pricetagOutline,
							label: 'Orders',
							name: 'orders',
							render: (_: RouteComponentProps) => <Orders />,
						},
						{
							route: `${routes.RIDER}/home/settings`,
							default: false,
							icon: settingsOutline,
							label: 'Settings',
							name: 'settings',
							render: (_: RouteComponentProps) => <Settings type={routes.RIDER} />,
						},
					]}
					homeRoute={`${routes.RIDER}/home`}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Home;

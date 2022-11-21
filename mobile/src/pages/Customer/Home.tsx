import { IonContent, IonPage } from '@ionic/react';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { routes } from '../../routes';
import { storefrontOutline, settingsOutline, cardOutline, cartOutline, pricetagsOutline } from 'ionicons/icons';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import Settings from '../Settings';
import Billers from './Billers';
import Stores from './Stores';
import Cart from './Cart';
import Orders from './Orders';

interface Props extends RouteComponentProps {}

const Home: FC<Props> = (props) => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<BottomNavigationBar
					tabs={[
						{
							route: `${routes.CUSTOMER}/home/stores`,
							default: true,
							icon: storefrontOutline,
							label: 'Stores',
							name: 'stores',
							render: (_: RouteComponentProps) => <Stores />,
						},
						{
							route: `${routes.CUSTOMER}/home/cart`,
							default: false,
							icon: cartOutline,
							label: 'Cart',
							name: 'cart',
							render: (_: RouteComponentProps) => <Cart />,
						},
						{
							route: `${routes.CUSTOMER}/home/orders`,
							default: false,
							icon: pricetagsOutline,
							label: 'Orders',
							name: 'orders',
							render: (_: RouteComponentProps) => <Orders />,
						},
						{
							route: `${routes.CUSTOMER}/home/billers`,
							default: false,
							icon: cardOutline,
							label: 'Billers',
							name: 'billers',
							render: (_: RouteComponentProps) => <Billers />,
						},
						{
							route: `${routes.CUSTOMER}/home/settings`,
							default: false,
							icon: settingsOutline,
							label: 'Settings',
							name: 'settings',
							render: (_: RouteComponentProps) => <Settings type={routes.CUSTOMER} />,
						},
					]}
					homeRoute={`${routes.CUSTOMER}/home/stores`}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Home;

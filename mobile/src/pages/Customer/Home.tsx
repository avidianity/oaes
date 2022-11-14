import { IonContent, IonPage } from '@ionic/react';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { routes } from '../../routes';
import { storefrontOutline, settingsOutline, cardOutline } from 'ionicons/icons';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import Settings from '../Settings';
import Billers from './Billers';

interface Props extends RouteComponentProps {}

const Home: FC<Props> = (props) => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<BottomNavigationBar
					tabs={[
						{
							route: `${routes.CUSTOMER}/home/stores`,
							default: false,
							icon: storefrontOutline,
							label: 'Stores',
							name: 'stores',
							render: (_: RouteComponentProps) => <div>Stores</div>,
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
							default: true,
							icon: settingsOutline,
							label: 'Settings',
							name: 'settings',
							render: (_: RouteComponentProps) => <Settings type={routes.CUSTOMER} />,
						},
					]}
					homeRoute={`${routes.CUSTOMER}/home`}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Home;

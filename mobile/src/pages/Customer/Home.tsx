import { IonContent, IonPage } from '@ionic/react';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { useLogin } from '../../hooks';
import { routes } from '../../routes';
import { storefrontOutline, settingsOutline, cardOutline } from 'ionicons/icons';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import Settings from '../Settings';

interface Props extends RouteComponentProps {}

const Home: FC<Props> = (props) => {
	useLogin(routes.CUSTOMER);

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
							render: (_: RouteComponentProps) => <div>Billers</div>,
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

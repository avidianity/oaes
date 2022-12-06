import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { useLogin } from '../../hooks';
import { routes } from '../../routes';
import { personCircleOutline, bicycleOutline, bodyOutline, settingsOutline, storefrontOutline } from 'ionicons/icons';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import Administrators from './Administrators';
import Settings from '../Settings';
import Riders from './Riders';
import Customers from './Customers';
import Stores from './Stores';

interface Props extends RouteComponentProps {}

const Home: FC<Props> = (props) => {
	useLogin(routes.ADMINISTRATOR);

	return (
		<BottomNavigationBar
			tabs={[
				{
					route: `${routes.ADMINISTRATOR}/home/administrators`,
					default: true,
					icon: personCircleOutline,
					label: 'Administrators',
					name: 'administrators',
					render: (_: RouteComponentProps) => <Administrators />,
				},
				{
					route: `${routes.ADMINISTRATOR}/home/riders`,
					default: false,
					icon: bicycleOutline,
					label: 'Riders',
					name: 'riders',
					render: (_: RouteComponentProps) => <Riders />,
				},
				{
					route: `${routes.ADMINISTRATOR}/home/customers`,
					default: false,
					icon: bodyOutline,
					label: 'Customers',
					name: 'customers',
					render: (_: RouteComponentProps) => <Customers />,
				},
				{
					route: `${routes.ADMINISTRATOR}/home/stores`,
					default: false,
					icon: storefrontOutline,
					label: 'Stores',
					name: 'stores',
					render: (_: RouteComponentProps) => <Stores />,
				},
				{
					route: `${routes.ADMINISTRATOR}/home/settings`,
					default: false,
					icon: settingsOutline,
					label: 'Settings',
					name: 'settings',
					render: (_: RouteComponentProps) => <Settings type={routes.ADMINISTRATOR} />,
				},
			]}
			homeRoute={`${routes.ADMINISTRATOR}/home`}
		/>
	);
};

export default Home;

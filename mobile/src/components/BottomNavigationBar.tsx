import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import React, { FC } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';

export type Tab = {
	route: string;
	default?: boolean;
	icon: string;
	label: string;
	name: string;
	render: (props: RouteComponentProps) => React.ReactNode;
	exact?: boolean;
};

type Props = {
	homeRoute: string;
	tabs: Tab[];
};

const BottomNavigationBar: FC<Props> = ({ tabs, homeRoute }) => {
	const defaultComponent = tabs.find((item) => item.route === homeRoute || item.default === true);

	return (
		<IonTabs>
			<IonRouterOutlet>
				<Switch>
					{tabs.map(({ route, render, exact }, index) => (
						<Route exact={exact} path={route} render={render} key={index} />
					))}
					{defaultComponent ? (
						<Route>
							<Redirect to={defaultComponent.route} />
						</Route>
					) : null}
				</Switch>
			</IonRouterOutlet>
			<IonTabBar slot='bottom'>
				{tabs.map(({ route, icon, label, name }, index) => (
					<IonTabButton tab={name} href={route} className='py-1' key={index}>
						<IonIcon icon={icon} />
						<IonLabel>{label}</IonLabel>
					</IonTabButton>
				))}
			</IonTabBar>
		</IonTabs>
	);
};

export default BottomNavigationBar;

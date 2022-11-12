import { IonPage, IonContent, IonRouterOutlet } from '@ionic/react';
import React, { FC } from 'react';
import { Redirect, Route, useRouteMatch } from 'react-router';
import List from './List';

type Props = {};

const Orders: FC<Props> = (props) => {
	const match = useRouteMatch();

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonRouterOutlet>
					<Route exact path={match.url} render={() => <List />} />
					<Route render={() => <Redirect to={match.url} />} />
				</IonRouterOutlet>
			</IonContent>
		</IonPage>
	);
};

export default Orders;

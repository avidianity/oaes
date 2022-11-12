import { IonPage, IonContent, IonRouterOutlet } from '@ionic/react';
import React, { FC } from 'react';
import { Redirect, Route, useRouteMatch } from 'react-router';
import Form from './Form';
import List from './List';

type Props = {};

const Riders: FC<Props> = (props) => {
	const match = useRouteMatch();

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonRouterOutlet>
					<Route exact path={match.url} render={() => <List />} />
					<Route path={`${match.url}/add`} render={() => <Form mode='add' />} />
					<Route path={`${match.url}/:id/edit`} render={() => <Form mode='edit' />} />
					<Route render={() => <Redirect to={match.url} />} />
				</IonRouterOutlet>
			</IonContent>
		</IonPage>
	);
};

export default Riders;

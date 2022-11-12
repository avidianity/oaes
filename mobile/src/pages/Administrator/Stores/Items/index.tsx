import { IonPage, IonContent, IonRouterOutlet } from '@ionic/react';
import React, { FC } from 'react';
import { Redirect, Route, useParams, useRouteMatch } from 'react-router';
import Form from './Form';
import List from './List';

type Props = {};

const Items: FC<Props> = () => {
	const match = useRouteMatch();
	const { id } = useParams<{ id: string }>();

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonRouterOutlet>
					<Route exact path={match.url} render={() => <List id={id} />} />
					<Route path={`${match.url}/add`} render={() => <Form id={id} mode='add' />} />
					<Route path={`${match.url}/:id/edit`} render={() => <Form id={id} mode='edit' />} />
					<Route render={() => <Redirect to={match.url} />} />
				</IonRouterOutlet>
			</IonContent>
		</IonPage>
	);
};

export default Items;

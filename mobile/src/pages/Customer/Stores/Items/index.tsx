import { IonPage, IonContent, IonRouterOutlet } from '@ionic/react';
import React, { FC } from 'react';
import { Redirect, Route, useParams, useRouteMatch } from 'react-router';
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
					<Route render={() => <Redirect to={match.url} />} />
				</IonRouterOutlet>
			</IonContent>
		</IonPage>
	);
};

export default Items;

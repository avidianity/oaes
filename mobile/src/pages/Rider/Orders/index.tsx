import { IonContent, IonPage } from '@ionic/react';
import React, { FC } from 'react';

type Props = {};

const Orders: FC<Props> = (props) => {
	return (
		<IonPage>
			<IonContent>
				<p>Orders</p>
			</IonContent>
		</IonPage>
	);
};

export default Orders;

import { IonPage, IonContent } from '@ionic/react';
import React, { FC, useState } from 'react';
import Pay from './Pay';
import Prompt from './Prompt';
import Transactions from './Transactions';

type Props = {};

const Billers: FC<Props> = (props) => {
	const [type, setType] = useState('prompt');

	let component: JSX.Element | null = null;

	switch (type) {
		case 'prompt':
			component = <Prompt onChange={setType} />;
			break;
		case 'pay':
			component = <Pay onChange={setType} />;
			break;
		case 'transactions':
			component = <Transactions onChange={setType} />;
			break;
	}

	return (
		<IonPage>
			<IonContent fullscreen>{component}</IonContent>
		</IonPage>
	);
};

export default Billers;

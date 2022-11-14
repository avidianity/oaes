import { IonPage, IonContent, IonButton } from '@ionic/react';
import React, { FC } from 'react';

type Props = {
	onChange: (type: string) => void;
};

const Prompt: FC<Props> = ({ onChange }) => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<div className='text-center pt-40'>
					<h1 className='text-3xl mb-3'>Billers</h1>
					<div className='flex flex-col'>
						<div className='my-1'>
							<IonButton
								className='w-40 text-center'
								onClick={(e) => {
									e.preventDefault();
									onChange('transactions');
								}}>
								Transactions
							</IonButton>
						</div>
						<div className='my-1'>
							<IonButton
								className='w-40 text-center'
								onClick={(e) => {
									e.preventDefault();
									onChange('pay');
								}}>
								Pay
							</IonButton>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Prompt;

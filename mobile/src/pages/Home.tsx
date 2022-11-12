import { IonButton, IonContent, IonPage } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { routes } from '../routes';

const Home: React.FC<RouteComponentProps> = ({ history }) => {
	const go = (name: string) => {
		history.push(name);
	};

	return (
		<IonPage>
			<IonContent fullscreen>
				<div className='text-center'>
					<div className='flex'>
						<img src='/assets/icon/icon.png' alt='OAES' className='h-40 mt-10 mx-auto' />
					</div>
					<h1 className='text-xl'>Welcome back!</h1>
					<p>Please choose a role and sign in</p>
					<div className='flex flex-col'>
						<div className='my-1'>
							<IonButton
								className='w-40 text-center'
								onClick={(e) => {
									e.preventDefault();
									go(routes.ADMINISTRATOR);
								}}>
								Administrator
							</IonButton>
						</div>
						<div className='my-1'>
							<IonButton
								className='w-40 text-center'
								onClick={(e) => {
									e.preventDefault();
									go(routes.RIDER);
								}}>
								Rider
							</IonButton>
						</div>
						<div className='my-1'>
							<IonButton
								className='w-40 text-center'
								onClick={(e) => {
									e.preventDefault();
									go(routes.CUSTOMER);
								}}>
								Customer
							</IonButton>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;


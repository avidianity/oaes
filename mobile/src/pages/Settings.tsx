import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonPage, useIonAlert } from '@ionic/react';
import React, { FC } from 'react';
import { logOutOutline } from 'ionicons/icons';
import { useToggle } from '@avidian/hooks';
import stateService from '../services/State';
import httpService from '../services/Http';
import { useHistory } from 'react-router';
import { useMe } from '../hooks';

type Props = {
	type: string;
};

type AnonymousModel = { id: string };

const Settings: FC<Props> = ({ type }) => {
	const [processing, setProcessing] = useToggle(false);
	const history = useHistory();
	const me = useMe<AnonymousModel>(type);
	const [alert] = useIonAlert();

	const logout = async () => {
		setProcessing(true);

		try {
			const token = stateService.get('token');

			if (token) {
				await httpService.get(`/v1${type}/auth/logout`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			}
		} catch (_) {
		} finally {
			stateService.clear();

			history.replace(`${type}/login`);
			setProcessing(false);
		}
	};

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Settings</IonCardTitle>
						<span className='text-xs'>
							ID: <b>{me?.id.toUpperCase()}</b>
						</span>
					</IonCardHeader>
				</IonCard>
				<div className='text-center'>
					<IonButton
						color='danger'
						className='w-32'
						onClick={(e) => {
							e.preventDefault();
							alert('Are you sure you want to logout?', [
								{
									text: 'Cancel',
								},
								{
									text: 'Confirm',
									handler: () => {
										logout();
									},
								},
							]);
						}}
						disabled={processing}>
						<IonIcon icon={logOutOutline} className='mr-1' />
						Logout
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Settings;

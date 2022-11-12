import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, useIonAlert } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { deleteRider, listRiders } from '../../../api/riders';
import { useLogin } from '../../../hooks';
import { routes } from '../../../routes';
import dayjs from 'dayjs';
import { useHistory, useRouteMatch } from 'react-router';
import { AxiosError } from 'axios';
import { useToggle } from '@avidian/hooks';

type Props = {};

const List: FC<Props> = (props) => {
	useLogin(routes.ADMINISTRATOR);
	const history = useHistory();
	const match = useRouteMatch();
	const [confirmDeleteAlert] = useIonAlert();
	const [successfulDeleteAlert] = useIonAlert();

	const { data: riders, refetch, isFetching } = useQuery(['riders'], () => listRiders(routes.ADMINISTRATOR));
	const [processing, setProcessing] = useToggle(false);

	const deleteItem = async (id: string) => {
		setProcessing(true);

		try {
			await deleteRider(routes.ADMINISTRATOR, id);
			await successfulDeleteAlert('Rider deleted successfully!', [
				{
					text: 'Ok',
					handler: () => {
						refetch();
					},
				},
			]);
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.response!.data.message);
			}
		} finally {
			setProcessing(false);
		}
	};

	return (
		<IonPage>
			<IonContent>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Rider List</IonCardTitle>
						<IonCardSubtitle>List of riders</IonCardSubtitle>
						<IonButton
							className='w-24'
							color='primary'
							onClick={(e) => {
								e.preventDefault();
								refetch();
							}}
							disabled={isFetching || processing}>
							Refresh
						</IonButton>
						<IonButton
							className='w-24'
							color='tertiary'
							onClick={(e) => {
								e.preventDefault();
								history.push(`${match.url}/add`);
							}}
							disabled={isFetching || processing}>
							Add
						</IonButton>
					</IonCardHeader>
				</IonCard>
				<div className='px-8'>
					<hr />
				</div>
				{riders?.map((rider, index) => (
					<IonCard key={index}>
						<IonCardHeader>
							<IonCardSubtitle>ID: {rider.id.toUpperCase()}</IonCardSubtitle>
							<IonCardSubtitle>Email: {rider.email}</IonCardSubtitle>
							Created {dayjs(rider.created_at).format('MMMM DD, YYYY')}
							<IonCardContent>
								<IonButton
									color='warning'
									onClick={(e) => {
										e.preventDefault();
										history.push(`${match.url}/${rider.id}/edit`);
									}}>
									<span className='text-white'>Edit</span>
								</IonButton>
								<IonButton
									color='danger'
									onClick={(e) => {
										e.preventDefault();
										confirmDeleteAlert({
											header: 'Delete Rider',
											message: 'Are you sure you want to delete this rider?',
											buttons: [
												{
													text: 'Confirm',
													role: 'confirm',
													handler: () => deleteItem(rider.id),
												},
												{
													text: 'Cancel',
													role: 'cancel',
												},
											],
										});
									}}>
									Delete
								</IonButton>
							</IonCardContent>
						</IonCardHeader>
					</IonCard>
				))}
			</IonContent>
		</IonPage>
	);
};

export default List;

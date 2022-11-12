import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, useIonAlert } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { deleteAdministrator, listAdministrators } from '../../../api/administrators';
import { useLogin, useMe } from '../../../hooks';
import { routes } from '../../../routes';
import dayjs from 'dayjs';
import { AdministratorModel } from '../../../models/administrator';
import { useHistory, useRouteMatch } from 'react-router';
import { AxiosError } from 'axios';
import { useToggle } from '@avidian/hooks';

type Props = {};

const List: FC<Props> = (props) => {
	useLogin(routes.ADMINISTRATOR);
	const me = useMe<AdministratorModel>(routes.ADMINISTRATOR);
	const history = useHistory();
	const match = useRouteMatch();
	const [confirmDeleteAlert] = useIonAlert();
	const [successfulDeleteAlert] = useIonAlert();

	const { data: administrators, refetch, isFetching } = useQuery(['administrators'], () => listAdministrators(routes.ADMINISTRATOR));
	const [processing, setProcessing] = useToggle(false);

	const deleteItem = async (id: string) => {
		setProcessing(true);

		try {
			await deleteAdministrator(routes.ADMINISTRATOR, id);
			await successfulDeleteAlert('Administrator deleted successfully!', [
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
						<IonCardTitle>Administrator List</IonCardTitle>
						<IonCardSubtitle>List of administrators</IonCardSubtitle>
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
				{administrators?.map((administrator, index) => (
					<IonCard key={index}>
						<IonCardHeader>
							<IonCardSubtitle>ID: {administrator.id.toUpperCase()}</IonCardSubtitle>
							<IonCardSubtitle>Email: {administrator.email}</IonCardSubtitle>
							Created {dayjs(administrator.created_at).format('MMMM DD, YYYY')}
							{me?.id !== administrator.id ? (
								<IonCardContent>
									<IonButton
										color='warning'
										onClick={(e) => {
											e.preventDefault();
											history.push(`${match.url}/${administrator.id}/edit`);
										}}>
										<span className='text-white'>Edit</span>
									</IonButton>
									<IonButton
										color='danger'
										onClick={(e) => {
											e.preventDefault();
											confirmDeleteAlert({
												header: 'Delete Administrator',
												message: 'Are you sure you want to delete this administrator?',
												buttons: [
													{
														text: 'Confirm',
														role: 'confirm',
														handler: () => deleteItem(administrator.id),
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
							) : null}
						</IonCardHeader>
					</IonCard>
				))}
			</IonContent>
		</IonPage>
	);
};

export default List;

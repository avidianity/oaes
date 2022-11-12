import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, useIonAlert } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { deleteCustomer, listCustomers } from '../../../api/customers';
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

	const { data: customers, refetch, isFetching } = useQuery(['customers'], () => listCustomers(routes.ADMINISTRATOR));
	const [processing, setProcessing] = useToggle(false);

	const deleteItem = async (id: string) => {
		setProcessing(true);

		try {
			await deleteCustomer(routes.ADMINISTRATOR, id);
			await successfulDeleteAlert('Customer deleted successfully!', [
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
						<IonCardTitle>Customer List</IonCardTitle>
						<IonCardSubtitle>List of customers</IonCardSubtitle>
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
				{customers?.map((customer, index) => (
					<IonCard key={index}>
						<IonCardHeader>
							<IonCardSubtitle>ID: {customer.id.toUpperCase()}</IonCardSubtitle>
							<IonCardSubtitle>
								Name: {customer.last_name}, {customer.first_name}
							</IonCardSubtitle>
							<IonCardSubtitle>Birthday: {dayjs(customer.birthday).format('MMMM DD, YYYY')}</IonCardSubtitle>
							<IonCardSubtitle>Address: {customer.address}</IonCardSubtitle>
							<IonCardSubtitle>Phone: {customer.phone}</IonCardSubtitle>
							<IonCardSubtitle>Email: {customer.email}</IonCardSubtitle>
							Created {dayjs(customer.created_at).format('MMMM DD, YYYY')}
							<IonCardContent>
								<IonButton
									color='warning'
									onClick={(e) => {
										e.preventDefault();
										history.push(`${match.url}/${customer.id}/edit`);
									}}>
									<span className='text-white'>Edit</span>
								</IonButton>
								<IonButton
									color='danger'
									onClick={(e) => {
										e.preventDefault();
										confirmDeleteAlert({
											header: 'Delete Customer',
											message: 'Are you sure you want to delete this customer?',
											buttons: [
												{
													text: 'Confirm',
													role: 'confirm',
													handler: () => deleteItem(customer.id),
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

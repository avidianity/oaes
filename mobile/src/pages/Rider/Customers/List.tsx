import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { listCustomers } from '../../../api/customers';
import { useLogin } from '../../../hooks';
import { routes } from '../../../routes';
import dayjs from 'dayjs';
import { useHistory, useRouteMatch } from 'react-router';

type Props = {};

const List: FC<Props> = (props) => {
	useLogin(routes.RIDER);
	const history = useHistory();
	const match = useRouteMatch();

	const { data: customers, refetch, isFetching } = useQuery(['customers'], () => listCustomers(routes.RIDER));

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
							disabled={isFetching}>
							Refresh
						</IonButton>
						<IonButton
							className='w-24'
							color='tertiary'
							onClick={(e) => {
								e.preventDefault();
								history.push(`${match.url}/add`);
							}}
							disabled={isFetching}>
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
						</IonCardHeader>
					</IonCard>
				))}
			</IonContent>
		</IonPage>
	);
};

export default List;

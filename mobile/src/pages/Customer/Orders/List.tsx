import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useLogin } from '../../../hooks';
import { routes } from '../../../routes';
import dayjs from 'dayjs';
import { useHistory, useRouteMatch } from 'react-router';
import { listOrders } from '../../../api/orders';
import { CustomerModel } from '../../../models/customer';

type Props = {};

const List: FC<Props> = (props) => {
	useLogin(routes.CUSTOMER);
	const history = useHistory();
	const match = useRouteMatch();

	const { data: orders, refetch, isFetching } = useQuery(['orders'], () => listOrders(routes.CUSTOMER));

	const getCustomerName = (customer: CustomerModel) => {
		return `${customer.last_name}, ${customer.first_name}`;
	};

	return (
		<IonPage>
			<IonContent>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Order List</IonCardTitle>
						<IonCardSubtitle>List of orders</IonCardSubtitle>
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
					</IonCardHeader>
				</IonCard>
				<div className='px-8'>
					<hr />
				</div>
				{orders?.map((order, index) => (
					<IonCard key={index}>
						<IonCardHeader>
							<IonCardSubtitle>ID: {order.id.toUpperCase()}</IonCardSubtitle>
							<IonCardSubtitle>
								Status: <b>{order.status}</b>
							</IonCardSubtitle>
							<IonCardSubtitle>Customer: {order.customer ? getCustomerName(order.customer) : 'N/A'}</IonCardSubtitle>
							<IonCardSubtitle>Rider: {order.rider ? order.rider.email : 'N/A'}</IonCardSubtitle>
							<p>Created {dayjs(order.created_at).format('MMMM DD, YYYY hh:mm A')}</p>
							<p>Updated {dayjs(order.created_at).format('MMMM DD, YYYY hh:mm A')}</p>
							<IonCardContent>
								<IonButton
									color='primary'
									onClick={(e) => {
										e.preventDefault();
										history.push(`${match.url}/${order.id}/items`);
									}}>
									<span className='text-white'>Items</span>
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

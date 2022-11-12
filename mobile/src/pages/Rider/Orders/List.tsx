import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, useIonAlert } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useLogin } from '../../../hooks';
import { routes } from '../../../routes';
import dayjs from 'dayjs';
import { useHistory, useRouteMatch } from 'react-router';
import { listOrders, updateOrder } from '../../../api/orders';
import { CustomerModel } from '../../../models/customer';
import { OrderModel } from '../../../models/order';
import { AxiosError } from 'axios';

type Props = {};

const List: FC<Props> = (props) => {
	useLogin(routes.RIDER);
	const history = useHistory();
	const match = useRouteMatch();
	const [alert] = useIonAlert();

	const { data: orders, refetch, isFetching } = useQuery(['orders'], () => listOrders(routes.RIDER));

	const getCustomerName = (customer: CustomerModel) => {
		return `${customer.last_name}, ${customer.first_name}`;
	};

	const assignToSelf = async (order: OrderModel) => {
		try {
			await updateOrder(routes.RIDER, order.id, {
				assign_to_self: true,
			});
			alert(`Order assigned successfully!`, [
				{
					text: 'Ok',
					handler: () => {
						refetch();
					},
				},
			]);
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.response!.data.message, [
					{
						text: 'Ok',
						handler: () => {
							refetch();
						},
					},
				]);
			}
		}
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
							<IonCardSubtitle>Status: {order.status}</IonCardSubtitle>
							<IonCardSubtitle>Customer: {order.customer ? getCustomerName(order.customer) : 'N/A'}</IonCardSubtitle>
							Created {dayjs(order.created_at).format('MMMM DD, YYYY')}
							Updated {dayjs(order.created_at).format('MMMM DD, YYYY')}
							<IonCardContent>
								<IonButton
									color='primary'
									onClick={(e) => {
										e.preventDefault();
										history.push(`${match.url}/${order.id}/items`);
									}}>
									<span className='text-white'>Items</span>
								</IonButton>
								<IonButton
									color='warning'
									onClick={(e) => {
										e.preventDefault();
										assignToSelf(order);
									}}
									disabled={order.has_rider}>
									<span className='text-white'>{order.has_rider ? 'Assigned' : 'Assign'}</span>
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

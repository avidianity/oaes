import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useLogin } from '../../../hooks';
import { routes } from '../../../routes';
import { useHistory, useParams } from 'react-router';
import { getOrder } from '../../../api/orders';

type Props = {};

const Items: FC<Props> = (props) => {
	useLogin(routes.CUSTOMER);
	const history = useHistory();
	const { id } = useParams<{ id: string }>();

	const { data: order, refetch, isFetching } = useQuery(['order', id], () => getOrder(routes.CUSTOMER, id));

	return (
		<IonPage>
			<IonContent>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Items List</IonCardTitle>
						<IonCardSubtitle>List of Items</IonCardSubtitle>
						<IonCardSubtitle>
							Order ID:
							<p className='font-bold'>{id.toUpperCase()}</p>
						</IonCardSubtitle>
						<IonCardSubtitle>
							Rider:
							<p className='font-bold'>{order?.rider ? order.rider.email : 'N/A'}</p>
						</IonCardSubtitle>
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
								history.goBack();
							}}
							disabled={isFetching}>
							Back
						</IonButton>
					</IonCardHeader>
				</IonCard>
				<div className='px-8'>
					<hr />
				</div>
				{order?.items?.map((item, index) => (
					<IonCard key={index}>
						<div className='flex justify-center mt-4'>
							<span className='rounded-full border-2 border-gray-100 mb-5'>
								<img src={item.picture.url} alt={item.name} className='h-24 rounded-full shadow cursor-pointer' />
							</span>
						</div>
						<IonCardHeader>
							<IonCardSubtitle>Name: {item.name}</IonCardSubtitle>
							<IonCardSubtitle>Price: {item.price}PHP</IonCardSubtitle>
							<IonCardSubtitle>Description: {item.description}</IonCardSubtitle>
							<IonCardSubtitle>Quantity: {item.quantity}</IonCardSubtitle>
						</IonCardHeader>
					</IonCard>
				))}
			</IonContent>
		</IonPage>
	);
};

export default Items;

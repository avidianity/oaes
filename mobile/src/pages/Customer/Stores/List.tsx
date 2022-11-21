import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { listStores } from '../../../api/stores';
import { routes } from '../../../routes';
import { useHistory, useRouteMatch } from 'react-router';

type Props = {};

const List: FC<Props> = (props) => {
	const history = useHistory();
	const match = useRouteMatch();

	const { data: stores, refetch, isFetching } = useQuery(['stores'], () => listStores(routes.CUSTOMER));

	return (
		<IonPage>
			<IonContent>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Store List</IonCardTitle>
						<IonCardSubtitle>List of stores</IonCardSubtitle>
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
				{stores?.map((store, index) => (
					<IonCard key={index}>
						<div className='flex justify-center mt-4'>
							<span className='rounded-full border-2 border-gray-100 mb-5'>
								<img src={store.picture.url} alt={store.name} className='h-24 rounded-full shadow cursor-pointer' />
							</span>
						</div>
						<IonCardHeader>
							<IonCardSubtitle>ID: {store.id.toUpperCase()}</IonCardSubtitle>
							<IonCardSubtitle>Name: {store.name}</IonCardSubtitle>
							<IonCardSubtitle>Address: {store.address}</IonCardSubtitle>
							<IonCardContent>
								<IonButton
									color='primary'
									onClick={(e) => {
										e.preventDefault();
										history.push(`${match.url}/${store.id}/items`);
									}}>
									<span className='text-white'>View</span>
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

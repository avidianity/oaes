import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, useIonAlert } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { deleteStore, listStores } from '../../../api/stores';
import { useLogin } from '../../../hooks';
import { routes } from '../../../routes';
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

	const { data: stores, refetch, isFetching } = useQuery(['stores'], () => listStores(routes.ADMINISTRATOR));
	const [processing, setProcessing] = useToggle(false);

	const deleteItem = async (id: string) => {
		setProcessing(true);

		try {
			await deleteStore(routes.ADMINISTRATOR, id);
			await successfulDeleteAlert('Store deleted successfully!', [
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
						<IonCardTitle>Store List</IonCardTitle>
						<IonCardSubtitle>List of stores</IonCardSubtitle>
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
									<span className='text-white'>Items</span>
								</IonButton>
								<IonButton
									color='warning'
									onClick={(e) => {
										e.preventDefault();
										history.push(`${match.url}/${store.id}/edit`);
									}}>
									<span className='text-white'>Edit</span>
								</IonButton>
								<IonButton
									color='danger'
									onClick={(e) => {
										e.preventDefault();
										confirmDeleteAlert({
											header: 'Delete Store',
											message: 'Are you sure you want to delete this store?',
											buttons: [
												{
													text: 'Confirm',
													role: 'confirm',
													handler: () => deleteItem(store.id),
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

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, useIonAlert } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useLogin } from '../../../../hooks';
import { routes } from '../../../../routes';
import { useHistory, useRouteMatch } from 'react-router';
import { AxiosError } from 'axios';
import { useToggle } from '@avidian/hooks';
import { deleteStoreItem, listStoreItems } from '../../../../api/stores/items';

type Props = {
	id: string;
};

const List: FC<Props> = ({ id }) => {
	useLogin(routes.ADMINISTRATOR);
	const history = useHistory();
	const match = useRouteMatch();
	const [confirmDeleteAlert] = useIonAlert();
	const [successfulDeleteAlert] = useIonAlert();

	const { data: items, refetch, isFetching } = useQuery(['store', id, 'items'], () => listStoreItems(id, routes.ADMINISTRATOR));
	const [processing, setProcessing] = useToggle(false);

	const deleteItem = async (id: string) => {
		setProcessing(true);

		try {
			await deleteStoreItem(id, routes.ADMINISTRATOR, id);
			await successfulDeleteAlert('Item deleted successfully!', [
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
						<IonCardTitle>Store Items List</IonCardTitle>
						<IonCardSubtitle>List of Store Items</IonCardSubtitle>
						<IonButton
							className='w-20'
							color='primary'
							onClick={(e) => {
								e.preventDefault();
								refetch();
							}}
							disabled={isFetching || processing}>
							Refresh
						</IonButton>
						<IonButton
							className='w-20'
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
				{items?.map((item, index) => (
					<IonCard key={index}>
						<div className='flex justify-center mt-4'>
							<span className='rounded-full border-2 border-gray-100 mb-5'>
								<img src={item.picture.url} alt={item.name} className='h-24 rounded-full shadow cursor-pointer' />
							</span>
						</div>
						<IonCardHeader>
							<IonCardSubtitle>ID: {item.id.toUpperCase()}</IonCardSubtitle>
							<IonCardSubtitle>Name: {item.name}</IonCardSubtitle>
							<IonCardSubtitle>Price: {item.price}PHP</IonCardSubtitle>
							<IonCardSubtitle>Description: {item.description}</IonCardSubtitle>
							<IonCardContent>
								<IonButton
									color='warning'
									onClick={(e) => {
										e.preventDefault();
										history.push(`${match.url}/${item.id}/edit`);
									}}>
									<span className='text-white'>Edit</span>
								</IonButton>
								<IonButton
									color='danger'
									onClick={(e) => {
										e.preventDefault();
										confirmDeleteAlert({
											header: 'Delete Store',
											message: 'Are you sure you want to delete this store item?',
											buttons: [
												{
													text: 'Confirm',
													role: 'confirm',
													handler: () => deleteItem(item.id),
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

import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonItem, IonList, IonPage, useIonAlert } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { getItems } from '../../api/stores/items';
import { useStorage } from '../../hooks';
import { routes } from '../../routes';
import { CartItem } from '../../types/misc';
import { trashOutline } from 'ionicons/icons';
import { useToggle } from '@avidian/hooks';
import { useHistory } from 'react-router';
import { AxiosError } from 'axios';
import { createOrder } from '../../api/orders';

type Props = {};

const Cart: FC<Props> = (props) => {
	const storage = useStorage<CartItem[]>('cart', [], localStorage);
	const {
		data: items,
		isFetching,
		refetch,
	} = useQuery(['cart'], () =>
		getItems(
			routes.CUSTOMER,
			storage.value.map((item) => item.id)
		)
	);
	const [alert] = useIonAlert();
	const [checkoutAlert] = useIonAlert();
	const [errorAlert] = useIonAlert();
	const [processing, setProcessing] = useToggle(false);
	const history = useHistory();

	const getQuantity = (id: string) => storage.value?.find((item) => item.id === id)?.quantity ?? 1;

	const remove = (id: string) => {
		const index = storage.value?.findIndex((item) => item.id === id) ?? -1;

		if (index >= 0) {
			alert('Are you sure you want to remove this item in your cart?', [
				{
					text: 'Cancel',
				},
				{
					text: 'Confirm',
					handler() {
						storage.value.splice(index, 1);
						storage.setValue([...storage.value]);
						refetch();
					},
				},
			]);
		}
	};

	const checkout = async (items: CartItem[]) => {
		setProcessing(true);

		try {
			await createOrder(routes.CUSTOMER, { items });

			storage.remove();

			alert(`Checkout successful!`, [
				{
					text: 'Ok',
					handler: () => {
						history.push(`${routes.CUSTOMER}/home/stores`);
					},
				},
			]);
		} catch (error) {
			if (error instanceof AxiosError) {
				errorAlert(error.response?.data.message, [
					{
						text: 'Ok',
					},
				]);
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
						<IonCardTitle>Cart</IonCardTitle>
						<IonCardSubtitle>List of Cart Items</IonCardSubtitle>
						<IonButton
							className='w-28'
							color='primary'
							onClick={(e) => {
								e.preventDefault();
								refetch();
							}}
							disabled={isFetching || processing}>
							Refresh
						</IonButton>
						<IonButton
							className='w-28'
							color='tertiary'
							onClick={(e) => {
								e.preventDefault();
								checkoutAlert('Proceed to checkout?', [
									{
										text: 'Cancel',
									},
									{
										text: 'Proceed',
										handler() {
											return checkout(storage.value);
										},
									},
								]);
							}}
							disabled={isFetching || processing}>
							Checkout
						</IonButton>
					</IonCardHeader>
				</IonCard>
				<div className='px-8'>
					<hr />
				</div>
				<IonList lines='none'>
					{items?.map((item, index) => (
						<IonItem key={index}>
							<div className='flex items-center w-full'>
								<img src={item.picture.url} alt={item.name} className='ml-10 w-10 h-10 shadow-xl object-cover rounded-full mr-4' />
								<span className='ml-4'>
									{item.name} ({getQuantity(item.id)})
								</span>
								<IonButton
									type='button'
									color='danger h-10 w-10 flex items-center justify-center ml-auto mr-4'
									onClick={(e) => {
										e.preventDefault();
										remove(item.id);
									}}
									disabled={processing}>
									<IonIcon icon={trashOutline} />
								</IonButton>
							</div>
						</IonItem>
					))}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Cart;

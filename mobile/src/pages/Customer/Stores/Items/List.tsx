import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { routes } from '../../../../routes';
import { listStoreItems } from '../../../../api/stores/items';
import { useStorage } from '../../../../hooks';
import { CartItem } from '../../../../types/misc';

type Props = {
	id: string;
};

const List: FC<Props> = ({ id }) => {
	const { data: items, refetch, isFetching } = useQuery(['store', id, 'items'], () => listStoreItems(id, routes.CUSTOMER));
	const { value: cart, setValue: setCart } = useStorage<CartItem[]>('cart', [], localStorage);
	const [quantities, setQuantities] = useState([...cart]);

	const addToCart = (id: string, quantity: number) => {
		const index = cart.findIndex((cart) => cart.id === id);
		if (index < 0) {
			setCart([...cart, { id, quantity }]);
		}
	};

	const removeFromCart = (id: string) => {
		const index = cart.findIndex((cart) => cart.id === id);
		if (index >= 0) {
			cart.splice(index, 1);
			setCart([...cart]);
		}
		const quantityIndex = quantities.findIndex((quantity) => quantity.id === id);

		if (quantityIndex >= 0) {
			quantities.splice(quantityIndex, 1);
			setQuantities([...quantities]);
		}
	};

	const setQuantity = (id: string, quantity: number) => {
		const index = quantities.findIndex((quantity) => quantity.id === id);

		const payload = { id, quantity };

		if (index >= 0) {
			quantities[index] = payload;
		} else {
			quantities.push(payload);
		}
		setQuantities([...quantities]);

		if (cart.length > 0) {
			const cartIndex = cart.findIndex((cart) => cart.id === id);

			if (cartIndex >= 0) {
				cart.splice(cartIndex, 1, payload);
				setCart([...cart]);
			}
		}
	};

	const getQuantity = (id: string) => {
		const quantity = quantities.find((quantity) => quantity.id === id);

		return quantity?.quantity ?? 1;
	};

	return (
		<IonPage>
			<IonContent>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Store Items List</IonCardTitle>
						<IonCardSubtitle>List of Store Items</IonCardSubtitle>
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
								window.location.href = '/customer/home/stores';
							}}
							disabled={isFetching}>
							Back
						</IonButton>
					</IonCardHeader>
				</IonCard>
				<div className='px-8'>
					<hr />
				</div>
				{items?.map((item, index) => {
					const exists = cart.has((cart) => cart.id === item.id);

					return (
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
									<div className='flex my-2'>
										<IonButton
											type='button'
											onClick={(e) => {
												e.preventDefault();
												const quantity = getQuantity(item.id);
												if (quantity > 1) {
													setQuantity(item.id, quantity - 1);
												}
											}}>
											-
										</IonButton>
										<span className='my-auto mx-4 text-xl font-bold'>{getQuantity(item.id)}</span>
										<IonButton
											type='button'
											onClick={(e) => {
												e.preventDefault();
												const quantity = getQuantity(item.id);
												setQuantity(item.id, quantity + 1);
											}}>
											+
										</IonButton>
									</div>
									<IonButton
										color={exists ? 'danger' : 'tertiary'}
										onClick={(e) => {
											e.preventDefault();
											const exists = cart.has((cart) => cart.id === item.id);
											if (!exists) {
												const quantity = getQuantity(item.id);
												addToCart(item.id, quantity);
											} else {
												removeFromCart(item.id);
												setQuantity(item.id, 1);
											}
										}}>
										<span className='text-white'>{exists ? 'Remove from Cart' : 'Add to Cart'}</span>
									</IonButton>
								</IonCardContent>
							</IonCardHeader>
						</IonCard>
					);
				})}
			</IonContent>
		</IonPage>
	);
};

export default List;

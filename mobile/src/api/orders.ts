import { OrderModel } from '../models/order';
import { StoreItemModel } from '../models/store-item';
import httpService from '../services/Http';
import stateService from '../services/State';

type Item = Pick<StoreItemModel, 'id'> & { quantity: number };

export type CustomerOrderData = { items: Item[] };
export type RiderOrderData = Pick<OrderModel, 'status'> & { assign_to_self: boolean };

export async function listOrders(type: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: OrderModel[] }>(`/v1${type}/orders`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function getOrder(type: string, id: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: OrderModel }>(`/v1${type}/orders/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function createOrder(type: string, payload: CustomerOrderData) {
	const token = stateService.get('token');

	const { data } = await httpService.post<{ data: OrderModel }>(`/v1${type}/orders`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function updateOrder(type: string, id: string, payload: Partial<RiderOrderData>) {
	const token = stateService.get('token');

	const { data } = await httpService.put<{ data: OrderModel }>(`/v1${type}/orders/${id}`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function deleteOrder(type: string, id: string) {
	const token = stateService.get('token');

	await httpService.delete(`/v1${type}/orders/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

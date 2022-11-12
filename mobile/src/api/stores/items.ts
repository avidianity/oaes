import { StoreItemModel } from '../../models/store-item';
import httpService from '../../services/Http';
import stateService from '../../services/State';

export type StoreItemData = Omit<StoreItemModel, 'id' | 'picture'> & { picture_url: string };

export async function listStoreItems(storeId: string, type: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: StoreItemModel[] }>(`/v1${type}/stores/${storeId}/items`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function getStoreItem(storeId: string, type: string, id: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: StoreItemModel }>(`/v1${type}/stores/${storeId}/items/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function createStoreItem(storeId: string, type: string, payload: StoreItemData) {
	const token = stateService.get('token');

	const { data } = await httpService.post<{ data: StoreItemModel }>(`/v1${type}/stores/${storeId}/items`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function updateStoreItem(storeId: string, type: string, id: string, payload: Partial<StoreItemData>) {
	const token = stateService.get('token');

	const { data } = await httpService.put<{ data: StoreItemModel }>(`/v1${type}/stores/${storeId}/items/${id}`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function deleteStoreItem(storeId: string, type: string, id: string) {
	const token = stateService.get('token');

	await httpService.delete(`/v1${type}/stores/${storeId}/items/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

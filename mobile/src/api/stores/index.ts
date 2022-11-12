import { StoreModel } from '../../models/store';
import httpService from '../../services/Http';
import stateService from '../../services/State';

export type StoreData = Omit<StoreModel, 'id' | 'picture'> & { picture_url: string };

export async function listStores(type: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: StoreModel[] }>(`/v1${type}/stores`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function getStore(type: string, id: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: StoreModel }>(`/v1${type}/stores/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function createStore(type: string, payload: StoreData) {
	const token = stateService.get('token');

	const { data } = await httpService.post<{ data: StoreModel }>(`/v1${type}/stores`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function updateStore(type: string, id: string, payload: Partial<StoreData>) {
	const token = stateService.get('token');

	const { data } = await httpService.put<{ data: StoreModel }>(`/v1${type}/stores/${id}`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function deleteStore(type: string, id: string) {
	const token = stateService.get('token');

	await httpService.delete(`/v1${type}/stores/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

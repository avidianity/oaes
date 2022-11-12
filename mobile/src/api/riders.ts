import { RiderModel } from '../models/rider';
import httpService from '../services/Http';
import stateService from '../services/State';

export type RiderData = Omit<RiderModel, 'id' | 'created_at'> & { password: string };

export async function listRiders(type: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: RiderModel[] }>(`/v1${type}/riders`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function getRider(type: string, id: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: RiderModel }>(`/v1${type}/riders/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function createRider(type: string, payload: RiderData) {
	const token = stateService.get('token');

	const { data } = await httpService.post<{ data: RiderModel }>(`/v1${type}/riders`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function updateRider(type: string, id: string, payload: Partial<RiderData>) {
	const token = stateService.get('token');

	const { data } = await httpService.put<{ data: RiderModel }>(`/v1${type}/riders/${id}`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function deleteRider(type: string, id: string) {
	const token = stateService.get('token');

	await httpService.delete(`/v1${type}/riders/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

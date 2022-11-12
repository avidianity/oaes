import { AdministratorModel } from '../models/administrator';
import httpService from '../services/Http';
import stateService from '../services/State';

export type AdministratorData = Omit<AdministratorModel, 'id' | 'created_at'> & { password: string };

export async function listAdministrators(type: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: AdministratorModel[] }>(`/v1${type}/administrators`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function getAdministrator(type: string, id: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: AdministratorModel }>(`/v1${type}/administrators/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function createAdministrator(type: string, payload: AdministratorData) {
	const token = stateService.get('token');

	const { data } = await httpService.post<{ data: AdministratorModel }>(`/v1${type}/administrators`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function updateAdministrator(type: string, id: string, payload: Partial<AdministratorData>) {
	const token = stateService.get('token');

	const { data } = await httpService.put<{ data: AdministratorModel }>(`/v1${type}/administrators/${id}`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function deleteAdministrator(type: string, id: string) {
	const token = stateService.get('token');

	await httpService.delete(`/v1${type}/administrators/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

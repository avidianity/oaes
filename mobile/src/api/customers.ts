import { CustomerModel } from '../models/customer';
import httpService from '../services/Http';
import stateService from '../services/State';

export type CustomerData = Omit<CustomerModel, 'id' | 'created_at'> & { password: string };

export async function listCustomers(type: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: CustomerModel[] }>(`/v1${type}/customers`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function getCustomer(type: string, id: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: CustomerModel }>(`/v1${type}/customers/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function createCustomer(type: string, payload: CustomerData) {
	const token = stateService.get('token');

	const { data } = await httpService.post<{ data: CustomerModel }>(`/v1${type}/customers`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function updateCustomer(type: string, id: string, payload: Partial<CustomerData>) {
	const token = stateService.get('token');

	const { data } = await httpService.put<{ data: CustomerModel }>(`/v1${type}/customers/${id}`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function deleteCustomer(type: string, id: string) {
	const token = stateService.get('token');

	await httpService.delete(`/v1${type}/customers/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

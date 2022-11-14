import { BillModel } from '../models/bill';
import httpService from '../services/Http';
import stateService from '../services/State';

export type BillData = Omit<BillModel, 'id' | 'created_at'>;

export async function listBills(type: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: BillModel[] }>(`/v1${type}/bill-payments`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function getBill(type: string, id: string) {
	const token = stateService.get('token');

	const { data } = await httpService.get<{ data: BillModel }>(`/v1${type}/bill-payments/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function createBill(type: string, payload: BillData) {
	const token = stateService.get('token');

	const { data } = await httpService.post<{ data: BillModel }>(`/v1${type}/bill-payments`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function updateBill(type: string, id: string, payload: Partial<BillData>) {
	const token = stateService.get('token');

	const { data } = await httpService.put<{ data: BillModel }>(`/v1${type}/bill-payments/${id}`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

export async function deleteBill(type: string, id: string) {
	const token = stateService.get('token');

	await httpService.delete(`/v1${type}/bill-payments/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

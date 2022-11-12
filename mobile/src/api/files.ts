import { FileModel } from '../models/file';
import httpService from '../services/Http';
import stateService from '../services/State';
import FormData from '@avidian/form-data';

export type FileData = File;

export async function createFile(type: string, file: FileData) {
	const token = stateService.get('token');

	const payload = new FormData({ file });

	const { data } = await httpService.post<{ data: FileModel }>(`/v1${type}/files`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data.data;
}

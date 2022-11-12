import { SERVER_URL } from '../config/urls';
import stateService from './State';
import axios from 'axios';

const httpService = axios.create({
	baseURL: SERVER_URL,
	headers: {
		Accept: 'application/json',
	},
	withCredentials: true,
});

httpService.interceptors.response.use((response) => {
	if (response.status === 401 && response.data.message === 'Unauthenticated.') {
		if (stateService.get('token')) {
			stateService.remove('token');
		}
	}

	return response;
});

export default httpService;

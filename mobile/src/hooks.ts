import { useNullable } from '@avidian/hooks';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import httpService from './services/Http';
import stateService from './services/State';

export function useLogin(path: string) {
	const history = useHistory();

	const check = async () => {
		const token = stateService.get('token');

		if (!token) {
			return history.push(`${path}/login`);
		}

		try {
			if (stateService.get('auth.checking') === true) {
				return;
			}

			stateService.set('auth.checking', true);
			await httpService.get(`/v1${path}/auth/check`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			return history.push(`${path}/login`);
		} finally {
			stateService.set('auth.checking', false);
		}
	};

	useEffect(() => {
		check();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}

export function useMe<T>(type: string) {
	const [me, setMe] = useNullable<T>();

	const fetch = async () => {
		const token = stateService.get('token');

		if (token) {
			const { data } = await httpService.get(`/v1${type}/auth/check`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setMe(data.data);
		}
	};

	useEffect(() => {
		fetch();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return me;
}

export function useValidationErrors<T extends string>() {
	const [errors, setErrors] = useState<{ [key in T]: string[] | null }>({} as any);

	const hasError = (key: T) => key in errors && errors[key] !== null;
	const setError = (key: T, value: string[] | null) => {
		errors[key] = value;
		setErrors({ ...errors });
	};
	const clearErrors = () => {
		setErrors({} as any);
	};

	return { errors, setErrors, hasError, setError, clearErrors };
}

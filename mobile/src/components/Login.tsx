import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonRouterLink, useIonAlert } from '@ionic/react';
import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { upperFirst } from 'lodash-es';
import { routes } from '../routes';
import httpService from '../services/Http';
import { useForm } from 'react-hook-form';
import { useToggle } from '@avidian/hooks';
import { AxiosError } from 'axios';
import stateService from '../services/State';

interface Props extends RouteComponentProps {}

const Login: FC<Props> = ({ location, history }) => {
	const { register, handleSubmit, reset } = useForm();
	const [processing, setProcessing] = useToggle(false);
	const [alert] = useIonAlert();

	const type = (() => {
		switch (true) {
			case location.pathname.includes('administrator'):
				return 'administrator';
			case location.pathname.includes('rider'):
				return 'rider';
			case location.pathname.includes('customer'):
				return 'customer';
			default:
				return '';
		}
	})();

	const submit = async (payload: any) => {
		setProcessing(true);

		try {
			const response = await httpService.post(`/v1/${type}/auth/login`, {
				email: payload.email,
				password: payload.password,
			});

			stateService.set('token', response.data.access.token);
			stateService.set('user', response.data.user);

			history.push(`/${type}/home`);

			reset();
		} catch (error) {
			if (error instanceof AxiosError) {
				await alert(error.response!.data.message);
			}
		} finally {
			setProcessing(false);
		}
	};

	const check = async () => {
		if (stateService.has('token')) {
			const token = stateService.get('token');
			try {
				await httpService.get(`/v1/${type}/auth/check`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				history.replace(`/${type}/home`);
			} catch (error) {
				stateService.clear();
			}
		}
	};

	useEffect(() => {
		check();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<IonPage>
			<IonContent fullscreen>
				<form className='text-center' onSubmit={handleSubmit(submit)}>
					<div className='flex'>
						<img src='/assets/icon/icon.png' alt='OAES' className='h-40 mt-10 mx-auto' />
					</div>
					<h1 className='text-xl'>Sign In ({upperFirst(type)})</h1>
					<div className='flex'>
						<div className='mx-auto px-10 mt-4'>
							<IonList>
								<IonItem>
									<IonLabel>
										<span className='text-gray-600'>Email</span>
									</IonLabel>
									<IonInput type='email' {...register('email')} />
								</IonItem>
								<IonItem>
									<IonLabel>
										<span className='text-gray-600'>Password</span>
									</IonLabel>
									<IonInput type='password' {...register('password')} />
								</IonItem>
							</IonList>
						</div>
					</div>
					<p className='mt-4'>
						Don't have an account?{' '}
						<IonRouterLink
							href='/customer/register'
							onClick={(e) => {
								e.preventDefault();
								if (!processing) {
									history.replace('/customer/register');
								}
							}}>
							Sign Up
						</IonRouterLink>
					</p>
					<IonButton type='submit' class='mt-10 w-40' disabled={processing}>
						Submit
					</IonButton>
					<br />
					<IonButton
						disabled={processing}
						color='tertiary'
						class='mt-2 w-40'
						onClick={(e) => {
							e.preventDefault();
							history.replace(routes.HOME);
						}}>
						Change Role
					</IonButton>
				</form>
			</IonContent>
		</IonPage>
	);
};

export default Login;

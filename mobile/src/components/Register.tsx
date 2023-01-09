import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonRouterLink, useIonAlert } from '@ionic/react';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import httpService from '../services/Http';
import { useForm } from 'react-hook-form';
import { useToggle } from '@avidian/hooks';
import { AxiosError } from 'axios';
import stateService from '../services/State';
import { CustomerData } from '../api/customers';
import { routes } from '../routes';
import { createFile } from '../api/files';

interface Props extends RouteComponentProps {}

type Inputs = Omit<CustomerData, 'id' | 'created_at' | 'updated_at'> & { password: string; password_confirmation: string };

const Register: FC<Props> = ({ location, history }) => {
	const { register, handleSubmit, reset } = useForm<Inputs>();
	const [processing, setProcessing] = useToggle(false);
	const [alert] = useIonAlert();
	const fileRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState('');

	const submit = async (payload: Inputs) => {
		setProcessing(true);

		try {
			payload.valid_id_url = preview;

			const response = await httpService.post(`/v1/customer/auth/register`, payload);

			stateService.set('token', response.data.access.token);
			stateService.set('user', response.data.user);

			history.push(`/customer/home`);

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
		if (stateService.get('token')) {
			history.replace(`/customer/home`);
		}
	};

	const processFile = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) {
			return;
		}

		const file = event.target.files.item(0)!;

		const { url } = await createFile(routes.CUSTOMER, file);

		setPreview(url);
	};

	useEffect(() => {
		check();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<IonPage>
			<IonContent fullscreen>
				<form className='text-center pb-10' onSubmit={handleSubmit(submit)}>
					<div className='flex'>
						<img src='/assets/icon/icon.png' alt='OAES' className='h-40 mt-10 mx-auto' />
					</div>
					<h1 className='text-xl'>Sign Up (Customer)</h1>
					<div className='flex'>
						<div className='mx-auto px-10 mt-4'>
							<IonList>
								<IonItem>
									<IonLabel>
										<span className='text-gray-600'>First Name</span>
									</IonLabel>
									<IonInput type='text' {...register('first_name')} />
								</IonItem>
								<IonItem>
									<IonLabel>
										<span className='text-gray-600'>Last Name</span>
									</IonLabel>
									<IonInput type='text' {...register('last_name')} />
								</IonItem>
								<IonItem>
									<IonLabel>
										<span className='text-gray-600'>Birthday</span>
									</IonLabel>
									<IonInput type='date' {...register('birthday')} />
								</IonItem>
								<IonItem>
									<IonLabel>
										<span className='text-gray-600'>Address</span>
									</IonLabel>
									<IonInput type='text' {...register('address')} />
								</IonItem>
								<IonItem>
									<IonLabel>
										<span className='text-gray-600'>Phone</span>
									</IonLabel>
									<IonInput type='text' {...register('phone')} />
								</IonItem>
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
								<IonItem>
									<IonLabel>
										<span className='text-gray-600'>Confirm Password</span>
									</IonLabel>
									<IonInput type='password' {...register('password_confirmation')} />
								</IonItem>
								<IonItem>
									<input ref={fileRef} type='file' className='hidden' onChange={processFile} />
									<IonButton
										onClick={(e) => {
											e.preventDefault();
											fileRef.current?.click();
										}}>
										Upload Valid ID
									</IonButton>
								</IonItem>
							</IonList>
						</div>
					</div>
					<p className='mt-4'>
						Already have an account?{' '}
						<IonRouterLink
							href='/customer/register'
							onClick={(e) => {
								e.preventDefault();
								if (!processing) {
									history.replace('/customer/login');
								}
							}}>
							Sign In
						</IonRouterLink>
					</p>
					<IonButton type='submit' class='mt-10 w-40' disabled={processing}>
						Submit
					</IonButton>
				</form>
			</IonContent>
		</IonPage>
	);
};

export default Register;

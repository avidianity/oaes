import { useToggle } from '@avidian/hooks';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, useIonAlert } from '@ionic/react';
import { AxiosError } from 'axios';
import { upperFirst } from 'lodash-es';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { RiderData, createRider, getRider, updateRider } from '../../../api/riders';
import { verbs } from '../../../config/verbs';
import { useValidationErrors } from '../../../hooks';
import { routes } from '../../../routes';
import { FormMode } from '../../../types/form';

type Props = {
	mode: FormMode;
};

type Inputs = RiderData;

const Form: FC<Props> = ({ mode }) => {
	const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
	const [processing, setProcessing] = useToggle(false);
	const [alert] = useIonAlert();
	const history = useHistory();
	const params = useParams<{ id: string }>();
	const { errors, hasError, setError, clearErrors } = useValidationErrors<keyof Inputs>();

	const process = async (payload: Inputs) => {
		if (mode === 'add') {
			return await createRider(routes.ADMINISTRATOR, payload);
		}

		return await updateRider(routes.ADMINISTRATOR, params.id, payload);
	};

	const submit = async (payload: Inputs) => {
		setProcessing(true);

		try {
			await process(payload);

			const verb = verbs[mode];

			alert(`Rider ${verb} successfully!`, [
				{
					text: 'Ok',
					handler: () => {
						reset();
						history.goBack();
					},
				},
			]);
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 422) {
					for (const key in error.response.data!.errors) {
						const errors = error.response.data!.errors[key];

						setError(key as any, errors);
					}

					setTimeout(() => {
						clearErrors();
					}, 5000);
				}
			}
		} finally {
			setProcessing(false);
		}
	};

	const fetch = async () => {
		setProcessing(true);
		try {
			const rider = await getRider(routes.ADMINISTRATOR, params.id);

			setValue('email', rider.email);
		} catch (error) {
			history.goBack();
		} finally {
			setProcessing(false);
		}
	};

	useEffect(() => {
		if (mode === 'edit') {
			fetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<IonPage>
			<IonContent fullscreen>
				<form onSubmit={handleSubmit(submit)}>
					<IonCard>
						<IonCardHeader>
							<IonCardTitle>{upperFirst(mode)} Rider</IonCardTitle>
						</IonCardHeader>
					</IonCard>
					<div className='flex'>
						<div className='mx-auto px-10 mt-4'>
							<IonList>
								<IonItem fill='solid' className={hasError('email') ? 'ion-invalid' : ''}>
									<IonLabel>
										<span className='text-gray-600'>Email</span>
									</IonLabel>
									<IonInput type='email' {...register('email')} disabled={mode === 'edit'} />
								</IonItem>
								{hasError('email')
									? errors.email?.map((error, index) => (
											<div className='pt-1' key={index}>
												<IonNote slot='error' className='ml-5 text-red-400'>
													{error}
												</IonNote>
											</div>
									  ))
									: null}
								<IonItem fill='solid' className={hasError('password') ? 'ion-invalid' : ''}>
									<IonLabel>
										<span className='text-gray-600'>Password</span>
									</IonLabel>
									<IonInput type='password' {...register('password')} />
								</IonItem>
								{hasError('password')
									? errors.password?.map((error, index) => (
											<div className='pt-1' key={index}>
												<IonNote slot='error' className='ml-5 text-red-400'>
													{error}
												</IonNote>
											</div>
									  ))
									: null}
							</IonList>
						</div>
					</div>
					<div className='text-center'>
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
								history.goBack();
							}}>
							Cancel
						</IonButton>
					</div>
				</form>
			</IonContent>
		</IonPage>
	);
};

export default Form;

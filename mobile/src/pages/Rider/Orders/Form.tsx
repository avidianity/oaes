import { useToggle } from '@avidian/hooks';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonNote, IonPage, IonSelect, IonSelectOption, useIonAlert } from '@ionic/react';
import { AxiosError } from 'axios';
import { snakeCase, upperCase, upperFirst } from 'lodash-es';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { RiderOrderData, getOrder, updateOrder } from '../../../api/orders';
import { verbs } from '../../../config/verbs';
import { OrderStatus } from '../../../constants';
import { useValidationErrors } from '../../../hooks';
import { routes } from '../../../routes';
import { FormMode } from '../../../types/form';

type Props = {
	mode: FormMode;
};

type Inputs = RiderOrderData;

const Form: FC<Props> = ({ mode }) => {
	const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
	const [processing, setProcessing] = useToggle(false);
	const [alert] = useIonAlert();
	const history = useHistory();
	const params = useParams<{ id: string }>();
	const { errors, hasError, setError, clearErrors } = useValidationErrors<keyof Inputs>();

	const submit = async (payload: Inputs) => {
		setProcessing(true);

		try {
			await updateOrder(routes.RIDER, params.id, {
				status: payload.status,
			});

			const verb = verbs[mode];

			alert(`Order ${verb} successfully!`, [
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
			const order = await getOrder(routes.RIDER, params.id);

			setValue('status', order.status);
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
							<IonCardTitle>{upperFirst(mode)} Order</IonCardTitle>
						</IonCardHeader>
					</IonCard>
					<div className='flex'>
						<div className='mx-auto px-10 mt-4'>
							<IonList>
								<IonItem fill='solid' className={hasError('status') ? 'ion-invalid' : ''}>
									<IonLabel>
										<span className='text-gray-600'>Status</span>
									</IonLabel>
									<IonSelect {...register('status')} placeholder='Status' interface='action-sheet'>
										{Object.entries(OrderStatus).map(([key, value], index) => (
											<IonSelectOption key={index} value={value}>
												{upperCase(snakeCase(key))}
											</IonSelectOption>
										))}
									</IonSelect>
								</IonItem>
								{hasError('status')
									? errors.status?.map((error, index) => (
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

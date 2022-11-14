import { useToggle } from '@avidian/hooks';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonSelect, IonSelectOption, useIonAlert } from '@ionic/react';
import { AxiosError } from 'axios';
import { isEmpty } from 'lodash-es';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBill } from '../../../api/bill';
import { useValidationErrors } from '../../../hooks';
import { BillModel } from '../../../models/bill';
import { routes } from '../../../routes';

type Props = {
	onChange: (type: string) => void;
};

type Inputs = Omit<BillModel, 'id' | 'created_at'>;

const Pay: FC<Props> = ({ onChange }) => {
	const { register, handleSubmit, reset } = useForm<Inputs>();
	const [processing, setProcessing] = useToggle(false);
	const [alert] = useIonAlert();
	const { errors, hasError, setError, clearErrors } = useValidationErrors<keyof Inputs>();
	const [biller, setBiller] = useState('');

	const submit = async (payload: Inputs) => {
		setProcessing(true);

		try {
			payload.biller = biller;
			await createBill(routes.CUSTOMER, payload);

			alert(`Bill paid successfully!`, [
				{
					text: 'Ok',
					handler: () => {
						reset();
						onChange('prompt');
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

	return (
		<IonPage>
			<IonContent>
				<div className='pt-20 flex flex-col items-center justify-center'>
					<IonButton
						onClick={(e) => {
							e.preventDefault();
							onChange('prompt');
						}}>
						Go Back
					</IonButton>
					<h1 className='text-2xl my-4'>Pay Bills</h1>
					<div className='px-10 w-full'>
						<form className='mt-4' onSubmit={handleSubmit(submit)}>
							<IonList>
								<IonItem>
									<IonLabel>Biller</IonLabel>
									<IonSelect
										interface='action-sheet'
										onIonChange={(e) => {
											e.preventDefault();
											setBiller(e.target.value);
										}}
										value={biller}>
										<IonSelectOption value=''> -- Select -- </IonSelectOption>
										<IonSelectOption value='panelco'>Panelco</IonSelectOption>
										<IonSelectOption value='converge'>Converge</IonSelectOption>
										<IonSelectOption value='pldt'>PLDT</IonSelectOption>
									</IonSelect>
								</IonItem>
								{!isEmpty(biller) ? (
									<>
										<IonItem fill='solid' className={hasError('account_number') ? 'ion-invalid' : ''}>
											<IonLabel>
												<span className='text-gray-600'>Account Number</span>
											</IonLabel>
											<IonInput type='text' {...register('account_number')} disabled={processing} />
										</IonItem>
										{hasError('account_number')
											? errors.account_number?.map((error, index) => (
													<div className='pt-1' key={index}>
														<IonNote slot='error' className='ml-5 text-red-400'>
															{error}
														</IonNote>
													</div>
											  ))
											: null}
										<IonItem fill='solid' className={hasError('name') ? 'ion-invalid' : ''}>
											<IonLabel>
												<span className='text-gray-600'>Name</span>
											</IonLabel>
											<IonInput type='text' {...register('name')} disabled={processing} />
										</IonItem>
										{hasError('name')
											? errors.name?.map((error, index) => (
													<div className='pt-1' key={index}>
														<IonNote slot='error' className='ml-5 text-red-400'>
															{error}
														</IonNote>
													</div>
											  ))
											: null}
										<IonItem fill='solid' className={hasError('total') ? 'ion-invalid' : ''}>
											<IonLabel>
												<span className='text-gray-600'>Amount</span>
											</IonLabel>
											<IonInput type='number' {...register('total')} disabled={processing} />
										</IonItem>
										{hasError('total')
											? errors.total?.map((error, index) => (
													<div className='pt-1' key={index}>
														<IonNote slot='error' className='ml-5 text-red-400'>
															{error.replace('total', 'amount')}
														</IonNote>
													</div>
											  ))
											: null}
										<IonItem fill='solid' className={hasError('due_date') ? 'ion-invalid' : ''}>
											<IonLabel>
												<span className='text-gray-600'>Due Date</span>
											</IonLabel>
											<IonInput type='date' {...register('due_date')} disabled={processing} />
										</IonItem>
										{hasError('due_date')
											? errors.due_date?.map((error, index) => (
													<div className='pt-1' key={index}>
														<IonNote slot='error' className='ml-5 text-red-400'>
															{error}
														</IonNote>
													</div>
											  ))
											: null}
										<div className='text-center'>
											<IonButton type='submit' class='mt-10 w-40' disabled={processing}>
												Submit
											</IonButton>
										</div>
									</>
								) : null}
							</IonList>
						</form>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Pay;

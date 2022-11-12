import { useToggle } from '@avidian/hooks';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, useIonAlert } from '@ionic/react';
import { AxiosError } from 'axios';
import { upperFirst } from 'lodash-es';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { createFile } from '../../../../api/files';
import { StoreItemData, createStoreItem, getStoreItem, updateStoreItem } from '../../../../api/stores/items';
import { verbs } from '../../../../config/verbs';
import { useValidationErrors } from '../../../../hooks';
import { routes } from '../../../../routes';
import { FormMode } from '../../../../types/form';

type Props = {
	mode: FormMode;
	id: string;
};

type Inputs = StoreItemData;

const Form: FC<Props> = ({ mode, id }) => {
	const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
	const [processing, setProcessing] = useToggle(false);
	const [alert] = useIonAlert();
	const history = useHistory();
	const params = useParams<{ id: string }>();
	const { errors, hasError, setError, clearErrors } = useValidationErrors<keyof Inputs>();
	const [preview, setPreview] = useState('https://avatars.dicebear.com/api/identicon/:seed.svg');
	const fileRef = useRef<HTMLInputElement>(null);

	const process = async (payload: Inputs) => {
		if (mode === 'add') {
			return await createStoreItem(id, routes.ADMINISTRATOR, payload);
		}

		return await updateStoreItem(id, routes.ADMINISTRATOR, params.id, payload);
	};

	const submit = async (payload: Inputs) => {
		setProcessing(true);

		try {
			payload.picture_url = preview;

			await process(payload);

			const verb = verbs[mode];

			alert(`Store Item ${verb} successfully!`, [
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
			const store = await getStoreItem(id, routes.ADMINISTRATOR, params.id);

			setValue('name', store.name);
			setValue('price', store.price);
			setValue('description', store.description);
			setPreview(store.picture.url);
		} catch (error) {
			history.goBack();
		} finally {
			setProcessing(false);
		}
	};

	const processFile = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) {
			return;
		}

		const file = event.target.files.item(0)!;

		const { url } = await createFile(routes.ADMINISTRATOR, file);

		setPreview(url);
	};

	const openFileDialog = () => {
		fileRef.current?.click();
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
							<IonCardTitle>{upperFirst(mode)} Store Item</IonCardTitle>
						</IonCardHeader>
					</IonCard>
					<div className='flex'>
						<div className='mx-auto px-10 mt-4'>
							<div className='flex justify-center'>
								<input
									ref={fileRef}
									type='file'
									className='hidden'
									onChange={(e) => {
										processFile(e);
									}}
								/>
								<span className='rounded-full border-2 border-gray-100 mb-5'>
									<img
										src={preview}
										alt='Preview'
										className='h-24 rounded-full shadow cursor-pointer'
										onClick={(e) => {
											e.preventDefault();
											openFileDialog();
										}}
									/>
								</span>
							</div>
							<IonList>
								<IonItem fill='solid' className={hasError('name') ? 'ion-invalid' : ''}>
									<IonLabel>
										<span className='text-gray-600'>Name</span>
									</IonLabel>
									<IonInput type='text' {...register('name')} />
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
								<IonItem fill='solid' className={hasError('price') ? 'ion-invalid' : ''}>
									<IonLabel>
										<span className='text-gray-600'>Price</span>
									</IonLabel>
									<IonInput type='number' {...register('price')} />
								</IonItem>
								{hasError('price')
									? errors.price?.map((error, index) => (
											<div className='pt-1' key={index}>
												<IonNote slot='error' className='ml-5 text-red-400'>
													{error}
												</IonNote>
											</div>
									  ))
									: null}
								<IonItem fill='solid' className={hasError('price') ? 'ion-invalid' : ''}>
									<IonLabel>
										<span className='text-gray-600'>Description</span>
									</IonLabel>
									<IonInput type='text' {...register('description')} />
								</IonItem>
								{hasError('description')
									? errors.description?.map((error, index) => (
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

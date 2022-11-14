import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useLogin } from '../../../hooks';
import { routes } from '../../../routes';
import dayjs from 'dayjs';
import { listBills } from '../../../api/bill';

type Props = {
	onChange: (type: string) => void;
};

const Transactions: FC<Props> = ({ onChange }) => {
	useLogin(routes.CUSTOMER);
	const { data: bills, refetch, isFetching } = useQuery(['bills'], () => listBills(routes.CUSTOMER));

	const mask = (value: string) => {
		if (value.length > 3) {
			let masked = '';

			for (let x = 0; x < value.length; x++) {
				const letter = value[x];

				if (x < 3) {
					masked += letter;
				} else {
					masked += '*';
				}
			}

			return masked;
		}

		return `${value}**`;
	};

	return (
		<IonPage>
			<IonContent>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Bill Payments List</IonCardTitle>
						<IonCardSubtitle>List of bill payments</IonCardSubtitle>
						<IonButton
							className='w-24'
							color='primary'
							onClick={(e) => {
								e.preventDefault();
								refetch();
							}}
							disabled={isFetching}>
							Refresh
						</IonButton>
						<IonButton
							className='w-24'
							color='tertiary'
							onClick={(e) => {
								e.preventDefault();
								onChange('prompt');
							}}
							disabled={isFetching}>
							Back
						</IonButton>
					</IonCardHeader>
				</IonCard>
				<div className='px-8'>
					<hr />
				</div>
				{bills?.map((bill, index) => (
					<IonCard key={index}>
						<IonCardHeader>
							<IonCardSubtitle>ID: {bill.id.toUpperCase()}</IonCardSubtitle>
							<IonCardSubtitle>Biller: {bill.biller.toUpperCase()}</IonCardSubtitle>
							<IonCardSubtitle>Account Number: {mask(bill.account_number)}</IonCardSubtitle>
							<IonCardSubtitle>Name: {bill.name}</IonCardSubtitle>
							<IonCardSubtitle>Amount: {bill.total}</IonCardSubtitle>
							<IonCardSubtitle>Due Date: {dayjs(bill.due_date).format('MMMM DD, YYYY')}</IonCardSubtitle>
							Paid: {dayjs(bill.created_at).format('MMMM DD, YYYY')}
						</IonCardHeader>
					</IonCard>
				))}
			</IonContent>
		</IonPage>
	);
};

export default Transactions;

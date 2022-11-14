export interface BillModel {
	id: string;
	biller: string;
	account_number: string;
	name: string;
	total: number;
	due_date: string;
	created_at: string;
}

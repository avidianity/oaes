import { OrderStatus } from '../types/models';
import { CustomerModel } from './customer';
import { OrderItemModel } from './order-item';

export interface OrderModel {
	id: string;
	status: OrderStatus;
	has_rider: boolean;
	customer?: CustomerModel;
	items?: OrderItemModel[];
	created_at: string;
	updated_at: string;
}

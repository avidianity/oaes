import { Picture } from '../types/misc';

export interface OrderItemModel {
	name: string;
	picture: Picture;
	price: number;
	description: string;
	quantity: number;
}

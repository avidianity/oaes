import { Picture } from '../types/misc';

export interface StoreItemModel {
	id: string;
	name: string;
	price: number;
	description: string;
	picture: Picture;
}

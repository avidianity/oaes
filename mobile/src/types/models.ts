/* eslint-disable @typescript-eslint/no-redeclare */
import { OrderStatus } from '../constants';

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

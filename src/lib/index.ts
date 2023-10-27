import * as db from './database';
import type OrderStatus from './utilities/status';

export const getOrder = (id: string) => {
	return db.getOrder(id);
};

export const getOrders = () => {
	return db.getOrders();
};

export const createOrder = (items: Omit<Item, 'id'>[]) => {
	return db.createOrder(items);
};

export const updateOrderStatus = (id: string, status: OrderStatus) => {
	return db.updateOrderStatus(id, status);
};

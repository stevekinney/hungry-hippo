import axios from 'axios';
import * as db from './database';
import OrderStatus from './utilities/status';

export const getOrder = (id: string) => {
	return db.getOrder(id);
};

export const getOrders = () => {
	return db.getOrders();
};

export const createOrder = (items: Omit<Item, 'id'>[]) => {
	return db.createOrder(items);
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
	if (status === OrderStatus.ProcessingPayment) {
		// This is going to go poorly if the payment processor is down.
		await axios.post(`http://localhost:3333/charge/${id}`);
	}

	return db.updateOrderStatus(id, status);
};

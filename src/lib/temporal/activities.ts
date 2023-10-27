import axios from 'axios';
import { Context } from '@temporalio/activity';

import { createOrder as create, updateOrderStatus } from '$lib/database';
import type OrderStatus from '$lib/utilities/status';

export const createOrder = (items: Omit<Item, 'id'>[], id: string) => {
	return create(items, id);
};

export const processPayment = async (id: string) => {
	Context.current().log.info(`💸 Processing payment: ${id}`);
	await axios.post(`http://localhost:3333/charge/${id}`);
};

export const updateOrder = async (id: string, status: OrderStatus) => {
	return updateOrderStatus(id, status);
};

export const sendFollowUp = async () => {
	Context.current().log.info('💸 Payment processed');
};

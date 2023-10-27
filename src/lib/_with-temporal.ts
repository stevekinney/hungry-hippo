import { randomUUID } from 'node:crypto';

import * as db from './database';
import temporal from './temporal';
import { kickOffFoodOrderWorkflow, updateStatus } from './temporal/workflows';

import type OrderStatus from './utilities/status';

export const getOrder = (id: number) => {
	return db.getOrder(id);
};

export const getOrders = () => {
	return db.getOrders();
};

export const createOrder = async (items: Omit<Item, 'id'>[]) => {
	const id = randomUUID();

	await temporal.workflow.start(kickOffFoodOrderWorkflow, {
		args: [items, id],
		taskQueue: 'food-order',
		workflowId: `order-${id}`
	});

	return { id };
};

export const updateOrderStatus = (id: number | string, status: OrderStatus) => {
	const workflow = temporal.workflow.getHandle(`order-${id}`, 'food-order');
	workflow.signal(updateStatus, status);
};

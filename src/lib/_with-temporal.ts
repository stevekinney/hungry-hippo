import * as db from './database';
import temporal from './temporal';
import { kickOffFoodOrderWorkflow, updateStatus } from './temporal/workflows';
import { generateId } from './utilities/id';

import type OrderStatus from './utilities/status';

export const getOrder = (id: string) => {
	return db.getOrder(id);
};

export const getOrders = () => {
	return db.getOrders();
};

export const createOrder = async (items: Omit<Item, 'id'>[], id: string = generateId()) => {
	await temporal.workflow.start(kickOffFoodOrderWorkflow, {
		args: [items, id],
		taskQueue: 'food-order',
		workflowId: `order-${id}`
	});

	return { id };
};

export const updateOrderStatus = (id: string, status: OrderStatus) => {
	const workflow = temporal.workflow.getHandle(`order-${id}`);
	workflow.signal(updateStatus, status);
};

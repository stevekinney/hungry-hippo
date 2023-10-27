import {
	condition,
	defineQuery,
	defineSignal,
	proxyActivities,
	setHandler,
	sleep
} from '@temporalio/workflow';

import OrderStatus, { formatStatus } from '../utilities/status';
import type * as activities from './activities';

const { createOrder, updateOrder, processPayment, sendFollowUp } = proxyActivities<
	typeof activities
>({
	startToCloseTimeout: '1 minute'
});

export const resturantConfirmation = defineSignal('confirm');
export const updateStatus = defineSignal<[OrderStatus]>('updateStatus');
export const getStatus = defineQuery('getStatus');

export async function kickOffFoodOrderWorkflow(items: Omit<Item, 'id'>[], id: string) {
	const order = await createOrder(items, id);

	let status: OrderStatus = order.status;
	let confirmed = false;
	let paymentVeried = false;

	// We can use signals to communicate with the workflow.
	setHandler(resturantConfirmation, () => {
		confirmed = true;
	});

	// Signals are added to the history, so we can use them to update the workflow.
	setHandler(updateStatus, async (newStatus: OrderStatus) => {
		status = await updateOrder(id, newStatus);
	});

	// We can use queries to get information from the workflow.
	setHandler(getStatus, () => {
		return formatStatus(status);
	});

	status = await updateOrder(id, OrderStatus.ProcessingPayment);

	await processPayment(id);

	paymentVeried = true;

	// Pause and wait for this expression to be truthy.
	await condition(() => paymentVeried);

	status = await updateOrder(id, OrderStatus.WaitingForRestaurantConfirmation);

	await condition(() => confirmed);

	status = await updateOrder(id, OrderStatus.Confirmed);

	await sleep('1 minute');

	// In a perfect world, we'd implement more logic here.
	// But, I think you're starting to get the idea.
	status = await updateOrder(id, OrderStatus.ReadyForPickup);
	status = await updateOrder(id, OrderStatus.EnRoute);
	status = await updateOrder(id, OrderStatus.Delivered);

	// Think about all of the code you're *not* writing.
	await sleep('1 day');

	await sendFollowUp();
}

import { condition, defineSignal, proxyActivities, setHandler, sleep } from '@temporalio/workflow';
import type * as activities from './activities';
import OrderStatus from '../utilities/status';

const { createOrder, updateOrder, processPayment, sendFollowUp } = proxyActivities<
	typeof activities
>({
	startToCloseTimeout: '1 minute'
});

export const resturantConfirmation = defineSignal('confirm');

export const updateStatus = defineSignal<[OrderStatus]>('updateStatus');

export async function kickOffFoodOrderWorkflow(items: Omit<Item, 'id'>[], id: string) {
	const order = await createOrder(items, id);
	const orderId = order.id;

	let confirmed = false;

	setHandler(resturantConfirmation, () => {
		confirmed = true;
	});

	await updateOrder(orderId, OrderStatus.ProcessingPayment);

	await processPayment(orderId);

	await updateOrder(orderId, OrderStatus.WaitingForRestaurantConfirmation);

	await condition(() => confirmed);

	await updateOrder(orderId, OrderStatus.Confirmed);

	await sleep('1 minute');

	await updateOrder(orderId, OrderStatus.ReadyForPickup);
	await updateOrder(orderId, OrderStatus.EnRoute);
	await updateOrder(orderId, OrderStatus.Delivered);

	await sleep('1 day');

	await sendFollowUp();
}

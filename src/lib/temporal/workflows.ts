import { defineSignal } from '@temporalio/workflow';
import type OrderStatus from '$lib/utilities/status';

// import type * as activities from './activities';

export const resturantConfirmation = defineSignal('confirm');

export const updateStatus = defineSignal<[OrderStatus]>('updateStatus');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function kickOffFoodOrderWorkflow(items: Omit<Item, 'id'>[], id: string) {}

import { generateId } from '$lib/utilities/id';
import { sleep } from '$lib/utilities/sleep';
import type OrderStatus from '$lib/utilities/status';
import prisma from './prisma';

export const getOrders = async () => {
	await sleep();
	return prisma.order.findMany();
};

export const getOrder = async (id: string) => {
	await sleep();
	console.log({ id });
	return prisma.order.findFirstOrThrow({
		where: { id },
		include: { items: true }
	});
};

export const createOrder = async (items: Omit<Item, 'id'>[], id: string = generateId()) => {
	await sleep();
	return prisma.order.create({
		data: {
			id,
			items: {
				create: items
			}
		},
		include: {
			items: true
		}
	});
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
	await sleep();
	await prisma.order.update({
		where: { id },
		data: { status }
	});
	return status;
};

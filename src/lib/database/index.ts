import { sleep } from '$lib/utilities/sleep';
import type OrderStatus from '$lib/utilities/status';
import prisma from './prisma';

export const getOrders = async () => {
	await sleep();
	return prisma.order.findMany({
		orderBy: { id: 'desc' }
	});
};

export const getOrder = async (id: number | string) => {
	await sleep();
	return prisma.order.findFirstOrThrow({
		where: { id: Number(id) },
		include: { items: true }
	});
};

export const createOrder = async (items: Omit<Item, 'id'>[], workflow: string | null = null) => {
	console.log({ workflow, items });
	await sleep();
	return prisma.order.create({
		data: {
			workflow,
			items: {
				create: items
			}
		},
		include: {
			items: true
		}
	});
};

export const updateOrderStatus = async (id: number | string, status: OrderStatus) => {
	await sleep();
	return prisma.order.update({
		where: { id: Number(id) },
		data: { status }
	});
};

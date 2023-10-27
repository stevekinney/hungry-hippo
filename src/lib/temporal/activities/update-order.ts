import { updateOrderStatus } from '$lib/database';
import type OrderStatus from '$lib/utilities/status';

export const updateOrder = (id: number, status: OrderStatus) => {
	return updateOrderStatus(id, status);
};

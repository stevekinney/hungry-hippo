import { createOrder as create } from '$lib/database';

export const createOrder = (items: Omit<Item, 'id'>[], workflow?: string) => {
	return create(items, workflow);
};

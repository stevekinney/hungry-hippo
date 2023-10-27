import type { PageServerLoad, Actions } from './$types';

import { createOrder, getOrders } from '$lib/database';
import { toOrder } from '$lib/items';

export const load: PageServerLoad = async () => {
	const orders = getOrders();
	return { orders };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const items = toOrder(data);

		const order = await createOrder(items);

		return { order };
	}
} satisfies Actions;

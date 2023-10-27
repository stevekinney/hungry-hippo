import type { PageServerLoad, Actions } from './$types';

import { getOrder, updateOrderStatus } from '$lib/database';

export const load: PageServerLoad = async ({ params }) => {
	const order = getOrder(params.order);
	return { order };
};

export const actions = {
	default: async ({ params, request }) => {
		const form = await request.formData();
		const status = Number(form.get('status'));
		const order = await updateOrderStatus(params.order, status);

		return order;
	}
} satisfies Actions;

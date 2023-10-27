import type { PageServerLoad, Actions } from './$types';

import { getOrder, updateOrderStatus } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	const order = getOrder(params.order);
	return { order };
};

export const actions = {
	default: async ({ params, request }) => {
		const form = await request.formData();
		const status = Number(form.get('status'));
		const id = params.order;
		const order = await updateOrderStatus(id, status);

		return order;
	}
} satisfies Actions;

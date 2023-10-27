import type { PageServerLoad, Actions } from './$types';

import { getOrder, updateOrderStatus } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	const order = getOrder(+params.order);
	return { order };
};

export const actions = {
	default: async ({ params, request }) => {
		const form = await request.formData();
		const status = Number(form.get('status'));
		const workflow = String(form.get('workflow'));
		const id = +params.order;
		const order = await updateOrderStatus(workflow || id, status);

		return order;
	}
} satisfies Actions;

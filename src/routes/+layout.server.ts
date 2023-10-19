import crypto from 'node:crypto';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const userId = cookies.get('user-id');
	if (!userId) cookies.set('user-id', crypto.randomUUID());

	return {
		userId
	};
};

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { webSockets } from './plugins/websockets';

export default defineConfig({
	plugins: [sveltekit(), webSockets],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

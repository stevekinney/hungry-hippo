import type { ViteDevServer } from 'vite';

import { Server } from 'socket.io';

export let io: Server;

export const webSockets = {
	name: 'web-socket-server',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) throw new Error('No HTTP server.');

		io = new Server(server.httpServer);
	}
};

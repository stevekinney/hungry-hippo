import { createRequire } from 'module';

import { Worker } from '@temporalio/worker';

import * as activities from './activities';

const require = createRequire(import.meta.url);
const workflowsPath = require.resolve('./workflows');

const worker = await Worker.create({
	workflowsPath,
	activities,
	taskQueue: 'food-order'
});

await worker.run();

import axios from 'axios';
import { Context } from '@temporalio/activity';

export const processPayment = () => {
	axios
		.post('http://localhost:3333/charge')
		.then(() => {
			Context.current().log.info('💸 Payment processed');
		})
		.catch((error) => {
			Context.current().log.error(`💣 Error: ${error}`);
		});
};

import axios from 'axios';
import { Context } from '@temporalio/activity';

export const processPayment = async (id: number) => {
	Context.current().log.info(`💸 Processing payment: ${id}`);
	await axios.post('http://localhost:3333/charge');
};

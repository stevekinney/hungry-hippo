import { Context } from '@temporalio/activity';

export const sendFollowUp = async () => {
	Context.current().log.info('💸 Payment processed');
};

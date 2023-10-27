const ms = Number(import.meta.env.VITE_DELAY) || 0;

export const sleep = (): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, Number(ms)));
};

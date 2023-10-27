type Order = {
	id: number;
	status: import('./lib/utilities/status').OrderStatus;
	items: Item[];
};

type Item = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};

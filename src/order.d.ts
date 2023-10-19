type OrderStatus = 'Pending' | 'Confirmed' | 'Ready for Pickup' | 'En Route' | 'Delivered';

type Order = {
	id: number;
	items: OrderItem[];
};

type OrderItem = Item & { status: OrderStatus };

type Item = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};

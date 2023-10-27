export const items: Item[] = [
	{ id: 1, name: 'Vegan Ham Burrito', price: 15, quantity: 0 },
	{ id: 2, name: 'Oatmeal Nachos', price: 5, quantity: 0 },
	{ id: 3, name: 'Chocolate Chip Cookie Fajitas', price: 12, quantity: 0 }
] as const;

export const getItem = (id: string): Item => {
	const item = items.find((item) => item.id === Number(id));
	if (!item) throw new Error(`Item ${id} is not found`);
	return item;
};

export const toOrder = (form: FormData): Omit<Item, 'id'>[] => {
	return Array.from(form.entries())
		.map(([id, quantity]) => {
			const { price, name } = getItem(id);
			return { price, name, quantity: Number(quantity) };
		})
		.filter(({ quantity }) => quantity > 0);
};

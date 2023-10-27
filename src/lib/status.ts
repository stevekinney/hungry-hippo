export enum OrderStatus {
	Pending,
	ProcessingPayment,
	WaitingForRestaurantConfirmation,
	Confirmed,
	ReadyForPickup,
	EnRoute,
	Delivered
}

export const formatStatus = (status: OrderStatus) => {
	switch (status) {
		case OrderStatus.Pending:
			return 'Pending';
		case OrderStatus.ProcessingPayment:
			return 'Processing Payment';
		case OrderStatus.WaitingForRestaurantConfirmation:
			return 'Waiting for Restaurant Confirmation';
		case OrderStatus.Confirmed:
			return 'Confirmed';
		case OrderStatus.ReadyForPickup:
			return 'Ready for Pickup';
		case OrderStatus.EnRoute:
			return 'En Route';
		case OrderStatus.Delivered:
			return 'Delivered';
	}
};

export default OrderStatus;

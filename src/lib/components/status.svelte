<script lang="ts">
	import OrderStatus, { formatStatus } from '$lib/utilities/status';

	export let status: OrderStatus;
</script>

<span
	class="px-2 py-1 text-blue-600 bg-blue-200 border-2 border-blue-600 rounded-md"
	class:pending={status === OrderStatus.Pending}
	class:delivered={status === OrderStatus.Delivered}
>
	{formatStatus(status)}
</span>

<style lang="postcss">
	.pending {
		@apply bg-yellow-200 text-yellow-600 border-yellow-600;
	}

	.delivered {
		@apply bg-green-200 text-green-600 border-green-600;
	}
</style>

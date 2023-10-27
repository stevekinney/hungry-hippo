<script lang="ts">
	import OrderStatus, { formatStatus } from '$lib/status';

	export let step: OrderStatus;
	export let status: OrderStatus;
</script>

<div
	class="flex items-center justify-center w-full h-20 px-4 border-2 rounded-md shadow-sm bg-slate-100"
	class:previous={step < status}
	class:current={step === status}
>
	<span class="text-center">{formatStatus(step)}</span>
</div>

<style lang="postcss">
	.previous {
		@apply bg-green-200 text-green-600 border-green-600;
	}

	.current {
		@apply bg-yellow-200 text-yellow-600 border-yellow-600;
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	import OrderStep from '$lib/components/order-step.svelte';
	import Status from '$lib/components/status.svelte';
	import { formatStatus } from '$lib/utilities/status';

	export let data: PageData;
</script>

<svelte:head>
	<title>Hungry Hippo — Order</title>
</svelte:head>

<header class="flex items-center place-content-between">
	<h2>Order {data.order.id}</h2>
	<Status status={data.order.status} />
</header>

<table>
	<thead>
		<tr>
			<th>Item</th>
			<th>Price</th>
			<th>Quantity</th>
			<th>Total</th>
		</tr>
	</thead>
	<tbody>
		{#each data.order.items as { id, name, price, quantity } (id)}
			<tr>
				<td>{name}</td>
				<td>${price}</td>
				<td>{quantity}</td>
				<td>${price * quantity}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<td colspan="4" class="text-right">
			<span class="font-semibold">Order Total</span>: ${data.order.items.reduce(
				(total, item) => total + item.quantity * item.price,
				0
			)}
		</td>
	</tfoot>
</table>

<div
	class="flex flex-col items-center justify-center py-6 space-y-5 md:flex-row md:space-x-5 md:space-y-0"
>
	<OrderStep step={0} status={data.order.status} />
	<OrderStep step={1} status={data.order.status} />
	<OrderStep step={2} status={data.order.status} />
	<OrderStep step={3} status={data.order.status} />
	<OrderStep step={4} status={data.order.status} />
	<OrderStep step={5} status={data.order.status} />
	<OrderStep step={6} status={data.order.status} />
</div>

<footer class="flex items-center justify-between mt-6 text-right">
	<a href="/orders">&larr; Back to Orders</a>
	{#if data.order.status < 6}
		<form action="/orders/{data.order.id}" method="post" class="flex justify-end" use:enhance>
			<label for="next-status" class="sr-only">Next Status</label>
			<input id="next-status" type="hidden" name="status" value={data.order.status + 1} />
			<button type="submit" class="primary">
				Move to {formatStatus(data.order.status + 1)}
			</button>
		</form>
	{/if}
</footer>

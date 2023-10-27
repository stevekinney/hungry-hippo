<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { items } from '$lib/utilities/items';

	$: total = items.reduce((total, item) => total + item.quantity * item.price, 0);
</script>

<svelte:head>
	<title>Hungry Hippo</title>
</svelte:head>

<form
	method="POST"
	action="/orders"
	class="flex flex-col gap-4 mx-auto"
	use:enhance={({ action }) => {
		items.forEach((item) => (item.quantity = 0));
		return goto(action.pathname);
	}}
>
	<table id="menu" class="w-full">
		<thead>
			<tr>
				<th>Item</th>
				<th>Price</th>
				<th>Quantity</th>
				<th>Total</th>
			</tr>
		</thead>
		<tbody>
			{#each items as item (item.id)}
				<tr>
					<td>{item.name}</td>
					<td>${item.price}</td>
					<td>
						<label for="quantity-{item.id}" class="sr-only">Quantity</label>
						<input
							id="quantity-{item.id}"
							type="number"
							min="0"
							max="100"
							name={String(item.id)}
							bind:value={item.quantity}
						/>
					</td>
					<td>${item.price * item.quantity}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<td colspan="4" class="text-right">
				<span class="font-semibold">Order Total</span>: ${total}
			</td>
		</tfoot>
	</table>
	<div class="flex items-center justify-between gap-4">
		<footer>
			<a href="/orders">View Orders</a>
		</footer>
		<button class="primary" disabled={!total}>Submit Order</button>
	</div>
</form>

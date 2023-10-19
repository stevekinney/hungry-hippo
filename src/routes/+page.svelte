<script lang="ts">
	import { items } from '../lib/items';

	const handleSubmit = (event: SubmitEvent) => {
		const order = items.filter((item) => item.quantity > 0);
		console.log({ order, total });
	};

	$: total = items.reduce((total, item) => total + item.quantity * item.price, 0);
</script>

<svelte:head>
	<title>Hungry Hippo</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit} class="mx-auto flex flex-col gap-4">
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
	<div class="flex gap-4 justify-end">
		<button class="primary" disabled={!total}>Submit Order</button>
	</div>
</form>

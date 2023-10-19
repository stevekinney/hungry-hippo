<script lang="ts">
	import { items } from '../items';

	$: total = items.reduce((total, item) => total + item.quantity * item.price, 0);
</script>

<form on:submit|preventDefault class="mx-auto flex flex-col gap-4">
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
						<label for="item-{item.id}" />
						<input id="item-{item.id}" type="number" min="0" max="100" bind:value={item.quantity} />
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

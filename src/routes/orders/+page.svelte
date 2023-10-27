<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import Status from '$lib/components/status.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Hungry Hippo — Orders</title>
</svelte:head>

{#if form?.order}
	<p class="p-4 mb-6 text-green-800 bg-green-100 border-2 border-green-400 rounded-md">
		<span class="font-semibold">Submitted</span>: {form.order.id}
	</p>
{/if}

<table id="menu" class="w-full table-fixed">
	<thead>
		<tr>
			<th>ID</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		{#each data.orders as { id, status } (id)}
			<tr>
				<td><a href="/orders/{id}">Order {id}</a></td>
				<td><Status {status} /></td>
			</tr>
		{:else}
			<tr>
				<td colspan="2">
					<p class="py-10 text-xl text-center text-gray-500">No orders found.</p>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

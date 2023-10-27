<script lang="ts">
	import '../styles.css';
</script>

<main class="container max-w-5xl px-4 mx-auto my-8">
	<header class="flex items-center justify-between mb-12 font-heading">
		<a href="/">
			<h1 class="text-6xl font-bold drop-shadow-lg text-slate-950 shadow-purple-800">
				Hungry Hippo
			</h1>
		</a>
	</header>
	<slot />
</main>

<script lang="ts">
	import { page } from '$app/stores';

	const { children } = $props();

	import '../app.css';
</script>

<svelte:head>
	<title>{$page.data.title}</title>
</svelte:head>

<main class="mx-auto mb-8 max-w-7xl px-4">
	<h1 class="mb-2 mt-8 text-4xl font-bold">{$page.data.title}</h1>
	{#if $page.data.description}
		<p class="mb-2">{$page.data.description}</p>
	{/if}
	<hr class="mb-4" />
	{@render children()}
</main>

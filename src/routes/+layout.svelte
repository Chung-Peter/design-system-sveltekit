<script lang="ts">
	import { base } from '$app/paths'
	import { page } from '$app/stores'

	const { children } = $props()

	import '../app.css'
</script>

<svelte:head>
	<title>{$page.data.title}</title>
</svelte:head>

<div class="h-screen w-screen overflow-y-auto">
	<div class="mx-auto flex max-w-7xl">
		<nav class="fixed top-0 flex flex-col overflow-y-auto p-2">
			<a href={`${base}/introduction`}>Introduction</a>
			<details open class="accordion my-4">
				<summary class="accordion-label font-medium">Components</summary>
				<div class="accordion-content ml-4 flex flex-col border-l border-gray-500">
					<a href={`${base}/components/accordion`}>Accordion</a>
					<a href={`${base}/components/button`}>Button</a>
					<a href={`${base}/components/card`}>Card</a>
					<a href={`${base}/components/json-viewer`}>JSON Viewer</a>
					<a href={`${base}/components/json-viewer/etl`} class="ml-4">ETL</a>
				</div>
			</details>
			<a href={`${base}/repl`}>REPL</a>
		</nav>
		<main class="mb-8 w-full flex-grow px-4">
			<h1 class="mb-2 mt-8 text-4xl font-bold">{$page.data.title}</h1>
			{#if $page.data.description}
				<p class="mb-2">{$page.data.description}</p>
			{/if}
			<hr class="mb-4" />
			{@render children()}
		</main>
	</div>
</div>

<style lang="postcss">
	:root {
		--nav-width: 12rem;
	}

	nav {
		--accordion-label-padding-block: var(--gap-xxs);
		--accordion-content-padding-block: 0px;
		--accordion-content-padding-inline: var(--gap-xs);

		width: var(--nav-width);

		& :is(a, summary) {
			@apply px-2 text-gray-500 no-underline hover:bg-gray-100 hover:text-gray-800;
		}

		& + main {
			padding-left: var(--nav-width);
		}
	}
</style>

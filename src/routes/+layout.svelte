<script lang="ts">
	import { page } from '$app/stores'

	const { children } = $props()

	import '../app.css'
</script>

<svelte:head>
	<title>{$page.data.title}</title>
</svelte:head>

<div class="h-screen w-screen overflow-y-auto">
	<div class="mx-auto flex max-w-7xl">
		<nav class="fixed top-0 flex w-48 flex-col overflow-y-auto p-2">
			<a href="/">Home</a>
			<details open class="accordion my-4 flex flex-col">
				<summary class="accordion-label font-medium">Components</summary>
				<div class="accordion-content ml-1 flex flex-col border-l border-gray-500 pl-3">
					<a href="/components/button">Button</a>
					<a href="/components/card">Card</a>
					<a href="/components/json-viewer">JSON Viewer</a>
				</div>
			</details>
			<a href="/repl">REPL</a>
		</nav>
		<main class="mb-8 w-full max-w-5xl flex-grow px-4">
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
	:global(body) {
		@apply overflow-hidden;
	}

	:root {
		--nav-width: 16rem;
	}

	nav {
		width: var(--nav-width);

		& a {
			@apply text-gray-500 hover:text-gray-800 hover:no-underline;
		}

		& + main {
			margin-left: var(--nav-width);
		}
	}
</style>

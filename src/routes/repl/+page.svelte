<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let html = `<div class="card variant-outline primary">
	<div class="stretch">
		<img src="https://picsum.photos/id/908/800/600" class="w-full rounded-t-md">
	</div>
	<p>Here's a card with a primary colored border. The div above that holds the image has the 'stretch' class applied.</p>
  <p>Add class="stretch" to any child elements where you want the padding removed.</p>
  <p class="stretch">This paragraph also has the 'stretch' class.</p>
  <p>This is a normal paragraph.</p>
  <p class="stretch">If 'stretch' class is added to the first or last child, the top or bottom padding will also be removed.</p>
</div>
<a class="card variant-outline primary w-[400px] hover:!no-underline">
	<div class="stretch">
		<img src="https://picsum.photos/id/908/800/600" class="w-full rounded-t-md">
	</div>
	<div class="content prose">
		<p>Here's a card with a primary colored border. The div above that holds the image has the 'stretch' class applied.</p>
		<p>Add class="stretch" to any child elements where you want the padding removed.</p>
		<p>This is a normal paragraph.</p>
		<p >If 'stretch' class is added to the first or last child, the top or bottom padding will also be removed.</p>
	</div>
</a>`;
</script>

<svelte:head>
	<script
		src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries"
	></script>
</svelte:head>

<div contenteditable="true" bind:innerText={html} class="mb-4 whitespace-pre border p-2"></div>

<div>{@html html}</div>

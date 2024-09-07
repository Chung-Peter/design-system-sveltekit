<script lang="ts">
	let repl = $state({
		html: `<div class="flex flex-col gap-4">
		<div class="card variant-outline primary">
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
		</a>
	</div>`,
		css: '/* Add your CSS here */',
		js: '// Add your Javascript here',
	})
</script>

<svelte:head>
	<script
		src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries"
	></script>
</svelte:head>

<div class="grid grid-cols-2 gap-4">
	<div class="flex flex-col">
		<h2>CSS</h2>
		<textarea
			bind:value={repl.css}
			spellcheck="false"
			autocapitalize="off"
			autocorrect="off"
			translate="no"
			rows="10"
		></textarea>
	</div>
	<div class="flex flex-col">
		<h2>Javascript</h2>
		<textarea
			bind:value={repl.js}
			spellcheck="false"
			autocapitalize="off"
			autocorrect="off"
			translate="no"
			rows="10"
		></textarea>
	</div>
</div>

<div class="flex flex-col">
	<h2>HTML</h2>
	<textarea
		bind:value={repl.html}
		spellcheck="false"
		autocapitalize="off"
		autocorrect="off"
		translate="no"
		rows="10"
	></textarea>
</div>

<div>{@html repl.html}</div>

<style lang="postcss">
	textarea {
		@apply mb-4 whitespace-pre border p-2 focus:border-current focus:ring-0;
	}
</style>

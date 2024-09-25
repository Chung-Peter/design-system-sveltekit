<script lang="ts">
	const component = 'button'
	const styleVariants = ['', 'style-filled']
	const colorSchemes = [
		'',
		'colors-primary',
		'colors-secondary',
		'colors-danger',
		'colors-success',
	]
	const textSizes = ['', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl']
</script>

<div class="prose mb-4">
	<p>The default styling for a button is the same as "style-outlined".</p>
</div>

<div class="flex flex-col gap-4">
	{#each styleVariants as styling}
		{#each colorSchemes as colorScheme}
			<h2 class="border-b">
				class="{[component, styling, colorScheme].join(' ')} &lt;text-size&gt;"
			</h2>
			<div class="flex flex-wrap items-center justify-center gap-4">
				{#each textSizes as textSize}
					{@const classes = [component, styling, colorScheme, textSize].join(' ')}
					<button class={classes} title={`class="${classes}"`}>Click me</button>
				{/each}
			</div>
		{/each}
	{/each}

	{#each styleVariants as styling}
		<h2 class="border-b">[disabled].button{styling ? `.${styling}` : ''}.&lt;text-size&gt;</h2>
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each textSizes as textSize}
				{@const classes = [component, styling, textSize].join(' ')}
				<button disabled class={classes} title={`class="${classes}"`}>Click me</button>
			{/each}
		</div>
	{/each}
</div>

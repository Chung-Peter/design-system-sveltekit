<script lang="ts">
	const component = 'button'
	const variants = ['', 'variant-filled', 'variant-outline']
	const colorVariants = ['', 'primary', 'secondary', 'danger', 'success']
	const textSizes = ['', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl']
</script>

<div class="flex flex-col gap-4">
	{#each variants as variant}
		{#each colorVariants as colorVariant}
			<h2 class="border-b">
				class="{[component, variant, colorVariant].join(' ')} &lt;text-size&gt;"
			</h2>
			<div class="flex items-center justify-center gap-4">
				{#each textSizes as textSize}
					{@const classes = [component, variant, colorVariant, textSize].join(' ')}
					<button class={classes} title={`class="${classes}"`}>Click me</button>
				{/each}
			</div>
		{/each}
	{/each}
</div>

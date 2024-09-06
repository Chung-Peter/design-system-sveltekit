<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	const component = 'button'
	const variants = ['variant-filled', 'variant-outline']
	const colorVariants = ['', 'primary', 'secondary', 'danger', 'success']
	const textSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl']
</script>

<div class="flex flex-col items-center gap-4">
	{#each variants as variant}
		{#each colorVariants as colorVariant}
			{#each textSizes as textSize}
				{@const classes = `${component} ${variant} ${colorVariant} ${textSize}`}
				<button class={classes}>{classes}</button>
			{/each}
		{/each}
	{/each}
</div>

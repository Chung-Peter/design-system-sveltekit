<script lang="ts">
	const component = 'card'
	const variants = ['', 'style-filled']
	const colorVariants = [
		'',
		'colors-primary',
		'colors-secondary',
		'colors-danger',
		'colors-success',
	]
</script>

<div class="prose mb-4">
	<p>The default styling for a card is the same as "style-outlined".</p>
</div>

<div class="flex flex-col gap-4">
	{#each variants as variant}
		{#each colorVariants as colorVariant}
			{@const classes = `${component} ${variant} ${colorVariant}`.trim()}
			<div class={classes}>
				<div class="card-content flex flex-col gap-4">
					<p>A card with class="{classes}"</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia inventore excepturi
						nam ea amet odit veniam. Itaque, earum similique doloremque illo rerum ipsam quaerat
						blanditiis adipisci veritatis error aperiam reiciendis.
					</p>
				</div>
			</div>
		{/each}
	{/each}
</div>

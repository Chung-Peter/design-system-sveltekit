<script lang="ts">
	const component = 'accordion'
	const variants = ['', 'variant-filled', 'variant-outlined']
	const colorVariants = ['', 'primary', 'secondary', 'danger', 'success']

	type AccordionOptions = {
		accordionClass?: string
		accordionLabelClass?: string
		accordionContentClass?: string
	}

	function accordionHtml(label: string, options: AccordionOptions = {}) {
		return `<details class="accordion ${options.accordionClass ?? ''}">
  <summary class="accordion-label ${options.accordionLabelClass ?? ''}">${label}</summary>
  <div class="accordion-content ${options.accordionContentClass ?? ''} prose">
    <p>That easy. Automatically, all of these beautiful, beautiful things will happen. I started painting as a hobby when I was little. I didn't know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do.</p>
    <p>Everyone wants to enjoy the good parts - but you have to build the framework first. This is a fantastic little painting. In your world you can create anything you desire.</p>
    <p>Poor old tree. Exercising the imagination, experimenting with talents, being creative; these things, to me, are truly the windows to your soul. A beautiful little sunset. If you do too much it's going to lose its effectiveness. Just think about these things in your mind - then bring them into your world.</p>
  </div>
</details>`
	}
</script>

<div class="prose">
	<p>
		Accordions are a way to show/hide content. They are useful for showing/hiding content that is
		related to a parent element.
	</p>
	<p>
		They are made with the built-in HTML <code>details</code> element and a <code>summary</code>
		element. The <code>summary</code> element is the clickable element that shows/hides the content.
	</p>
	<p>
		The content is the content that is shown/hidden. By convention, we wrap the content in a <code
			>div</code
		>
		with the class <code>accordion-content</code>.
	</p>
	<p>
		The <code>summary</code> element is the clickable element that shows/hides the content.
	</p>
</div>

<hr />

{#each variants as variant}
	{#each colorVariants as colorVariant}
		<h3>
			A single accordion on its own with class="{['accordion-label', variant, colorVariant]
				.join(' ')
				.trim()}"
		</h3>
		{@html accordionHtml('A lone accordion', {
			accordionLabelClass: [variant, colorVariant].join(' '),
		})}
	{/each}
{/each}

{#each variants as variant}
	{#each colorVariants as colorVariant}
		<h3>
			An accordion group with a single accordion with class="{[
				'accordion-group',
				variant,
				colorVariant,
			]
				.join(' ')
				.trim()}"
		</h3>
		<div class={['accordion-group', variant, colorVariant].join(' ').trim()}>
			{@html accordionHtml(
				`Accordion 1 in an accordion group, class="${['accordion-group', variant, colorVariant].join(' ').trim()}"`,
			)}
			{@html accordionHtml(
				`Accordion 2 in an accordion group, class="${['accordion-group', variant, colorVariant].join(' ').trim()}"`,
			)}
			{@html accordionHtml(
				`Accordion 3 in an accordion group, class="${['accordion-group', variant, colorVariant].join(' ').trim()}"`,
			)}
		</div>
	{/each}
{/each}

<style lang="postcss">
	h3 {
		@apply mb-2 mt-8 text-[length:--font-lg] font-semibold;
	}
</style>

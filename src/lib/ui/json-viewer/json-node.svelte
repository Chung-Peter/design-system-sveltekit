<script lang="ts">
	import CopyToClipboardButton from '$lib/ui/copy-to-clipboard-button.svelte'
	import ObjectArrayWrapper from './object-array/object-array-wrapper.svelte'
	import type { JsonNodeProps } from './json-viewer.models'
	import { untrack } from 'svelte'

	const props: JsonNodeProps = $props()
	const {
		data,
		name = '',
		depth = 0,
		isLast = true,
		initialOpenDepth = 999,
		openAfterDepth = 999,
	} = $derived(props)

	const isArray = $derived(Array.isArray(data))
	const isObjectArray = $derived(
		Array.isArray(data) && data.length > 0 && typeof data[0] === 'object',
	)
	const isObject = $derived(typeof data === 'object' && data !== null)

	let accordionIsOpen = $state(untrack(() => depth < initialOpenDepth || depth >= openAfterDepth))
</script>

{#if isArray || isObject}
	<details
		bind:open={accordionIsOpen}
		class="flex flex-col has-[>summary>.copy-to-clipboard:hover]:bg-green-50 has-[>summary>.copy-to-clipboard:hover]:outline-dashed has-[>summary>.copy-to-clipboard:hover]:outline-2 has-[>summary>.copy-to-clipboard:hover]:outline-offset-[-2px] has-[>summary>.copy-to-clipboard:hover]:outline-green-900 has-[>summary>.copy-to-clipboard:hover]:transition-all"
		class:is-array={isArray}
		class:is-object={isObject}
	>
		<summary
			class="group relative flex items-center gap-x-1"
			title={!accordionIsOpen ? JSON.stringify(data, null, 4) : 'Click to collapse'}
		>
			{#if isArray}
				<div class="whitespace-nowrap">
					{#if !accordionIsOpen}
						<span class="text-gray-400">
							({data.length})
						</span>
					{/if}
					&lbrack;
				</div>
				{#if !accordionIsOpen}
					<div
						class="array-contents-summary overflow-hidden text-ellipsis whitespace-nowrap italic text-gray-400"
					>
						{JSON.stringify(data).replace(/^\[|\]$/g, '')}
					</div>

					<div>
						&rbrack;{#if !isLast},{/if}
					</div>
				{/if}
			{:else}
				<div>&lbrace;</div>
				{#if !accordionIsOpen}
					<div
						class="object-contents-summary overflow-hidden text-ellipsis whitespace-nowrap italic text-gray-400"
					>
						{JSON.stringify(data).replace(/^\{|\}$/g, '')}
					</div>
					<div>
						&rbrace;{#if !isLast},{/if}
					</div>
				{/if}
			{/if}
			{#if accordionIsOpen}
				<CopyToClipboardButton
					{data}
					text="Copy"
					title={`Copy ${name} to clipboard`}
					class="absolute right-0 top-0 m-1 opacity-0 transition-all group-hover:opacity-100"
				/>
			{/if}
		</summary>

		<div class="accordion-content node-data ml-10 flex flex-col">
			{#if isObjectArray}
				<ObjectArrayWrapper {...props} />
			{:else if isArray}
				<div class="is-array entry">
					{#each data as entry, index}
						<div class="array-index select-none">[{index}]:</div>
						<div class="json-value">
							<svelte:self
								{...props}
								data={entry}
								name={`${name}[${index}]`}
								depth={depth + 1}
								isLast={index === data.length - 1}
							/>
						</div>
					{/each}
				</div>
			{:else if isObject}
				<div class="is-object entry">
					{#each Object.entries(data) as [key, value], index}
						<div class=" flex justify-between">
							<span class="key text-red-800">"{key}"</span>
							<span class="separator">:</span>
						</div>
						<div class="json-value">
							<svelte:self
								{...props}
								data={value}
								name={`${name ? name + '.' : ''}${key}`}
								depth={depth + 1}
								isLast={index === Object.keys(data).length - 1}
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		{#if accordionIsOpen}
			{#if isArray}
				<div class="closing-bracket">
					&rbrack;{#if !isLast},{/if}
				</div>
			{:else}
				<div class="closing-bracket">
					&rbrace;{#if !isLast},{/if}
				</div>
			{/if}
		{/if}
	</details>
{:else if data !== null && data !== undefined}
	{JSON.stringify(data)}{#if !isLast},{/if}
{/if}

<style lang="postcss">
	summary {
		cursor: pointer;
		list-style: none;
	}

	summary::before {
		content: '▶';
		display: inline-block;
		transition: transform 0.2s ease;
	}
	.closing-bracket {
		margin-left: 1rem;
	}

	details[open] > summary::before {
		transform: rotate(90deg);
	}

	:global(.entry) {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: 0.5rem;
	}

	.array-index {
		@apply text-gray-400;
	}

	.json-value {
		overflow: hidden;
	}
	/* .json-value:not(:has(> details)) {
		justify-self: flex-end;
	} */
</style>

<script lang="ts">
	import { onMount } from 'svelte';

	const {
		data,
		depth = 0,
		isLast = true
	} = $props<{ data: unknown; depth?: number; isLast?: boolean }>();

	let sortOrder = $state<'asc' | 'desc' | null>(null);
	let sortKey = $state<string | null>(null);
	let filterValue = $state('');

	const isArray = $derived(Array.isArray(data));
	const isObject = $derived(typeof data === 'object' && data !== null);

	let accordionIsOpen = $state(depth < 2);

	const isArrayOfObjects = $derived(
		Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
	);

	const sortedData = $derived(
		Array.isArray(data) && sortOrder
			? [...data].sort((a, b) => {
					let aValue = isArrayOfObjects && sortKey ? a[sortKey] : a;
					let bValue = isArrayOfObjects && sortKey ? b[sortKey] : b;
					if (sortOrder === 'asc') return aValue > bValue ? 1 : -1;
					return aValue < bValue ? 1 : -1;
				})
			: data
	);

	const filteredData = $derived(
		Array.isArray(sortedData) && filterValue
			? sortedData.filter((entry) =>
					JSON.stringify(entry).toLowerCase().includes(filterValue.toLowerCase())
				)
			: sortedData
	);

	function toggleSort(key: string | null = null) {
		if (key !== sortKey) {
			sortKey = key;
			sortOrder = 'asc';
		} else {
			sortOrder = sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc';
		}
	}

	function getObjectKeys(obj: object): string[] {
		return Object.keys(obj);
	}
</script>

{#if isArray || isObject}
	<details
		bind:open={accordionIsOpen}
		class="flex flex-col"
		class:is-array={isArray}
		class:is-object={isObject}
	>
		<summary class="flex gap-x-1">
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
				<!-- <span>Array [{data.length}]</span> -->
				<!-- {#if isArrayOfObjects}
           {#each getObjectKeys(data[0]) as key}
             <button onclick={() => toggleSort(key)} aria-label={`Sort by ${key}`}>
               {key}
               {sortKey === key ? (sortOrder === 'asc' ? '↑' : '↓') : '⇅'}
             </button>
           {/each}
         {:else}
           <button onclick={() => toggleSort()} aria-label="Toggle sort order">
             {sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '⇅'}
           </button>
         {/if} -->
				<!-- <input
					type="text"
					bind:value={filterValue}
					placeholder="Filter array"
					aria-label="Filter array items"
				/> -->
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
		</summary>

		<div class="accordion-content node-data ml-10">
			{#if isArray}
				<div class="is-array entry">
					{#each filteredData as entry, index}
						<div class="array-index">[{index}]:</div>
						<!-- <div class="array-data" class:is-last={index === filteredData.length - 1}> -->
						<div class="value">
							<svelte:self
								data={entry}
								depth={depth + 1}
								isLast={index === filteredData.length - 1}
							/>
						</div>
						<!-- </div> -->
					{/each}
				</div>
			{:else if isObject}
				<div class="is-object entry">
					{#each Object.entries(filteredData) as [key, value], index}
						<div class="key">"{key}":</div>
						<!-- <div
							class="object-value"
							class:is-last={index === Object.keys(filteredData).length - 1}
						> -->
						<div class="value">
							<svelte:self
								data={value}
								depth={depth + 1}
								isLast={index === Object.keys(filteredData).length - 1}
							/>
						</div>
						<!-- </div> -->
					{/each}
				</div>
			{/if}
		</div>

		{#if accordionIsOpen}
			{#if isArray}
				<div class="closing-bracket">
					]{#if !isLast},{/if}
				</div>
			{:else}
				<div class="closing-bracket">
					}{#if !isLast},{/if}
				</div>
			{/if}
		{/if}
	</details>
{:else}
	<!-- <div class="json-value"> -->
	{JSON.stringify(data)}{#if !isLast},{:else}&nbsp;{/if}
	<!-- </div> -->
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

	.entry {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: 0.5rem;
	}

	.array-index {
		@apply text-gray-400;
	}
	.key {
		color: #881391;
		justify-self: flex-end;
	}

	.value {
		overflow-x: hidden;
		/* width: 100%; */
	}
	/* .value:not(:has(> details)) {
		justify-self: flex-end;
	} */

	.json-value {
		color: #1a1aa6;
		text-align: right;
		width: max-content;
	}

	input {
		margin-left: 8px;
		font-size: 0.9em;
	}
</style>

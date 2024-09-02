<script lang="ts">
	import WrapTextIcon from '~icons/uim/wrap-text';
	import ClearFilterIcon from '~icons/fluent-mdl2/clear-filter';
	import JSONViewer from './json-node.svelte';

	const { data, name = '' } = $props<{ data: unknown[]; name?: string }>();

	let wrapValue = $state(false);
	let sortColumn = $state('');
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let hoveringColumn = $state('');

	// Ensure data is an array of objects and has at least one item
	const isValidData = $derived(
		Array.isArray(data) &&
			data.length > 0 &&
			data.every((item) => typeof item === 'object' && item !== null)
	);

	// Extract all unique keys from all objects
	const headers = $derived<string[]>(
		isValidData ? [...new Set(data.flatMap(Object.keys) as string[])] : []
	);

	function setHoveringColumn(key: string) {
		hoveringColumn = key;
	}

	function isObject(value: unknown): boolean {
		return typeof value === 'object' && value !== null;
	}

	function getCellValue(item: Record<string, unknown>, key: string): string {
		if (!(key in item)) return '';
		const value = item[key];
		return typeof value === 'object' && value !== null
			? JSON.stringify(value, null, 2)
			: String(value);
	}

	function sortData(dataToSort: unknown[], column: string, direction: 'asc' | 'desc'): unknown[] {
		const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

		return [...dataToSort].sort((a: any, b: any) => {
			const valueA = JSON.stringify(a[column]);
			const valueB = JSON.stringify(b[column]);

			if (valueA === valueB) return 0;
			if (valueA == null || valueA == undefined) return direction === 'asc' ? 1 : -1;
			if (valueB == null || valueB == undefined) return direction === 'asc' ? -1 : 1;

			// Convert to string for comparison
			const stringA = String(valueA);
			const stringB = String(valueB);

			// Use natural sort comparison
			const comparison = collator.compare(stringA, stringB);
			return direction === 'asc' ? comparison : -comparison;
		});
	}

	function handleSort(column: string) {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = 'asc';
		}
	}

	const sortedData = $derived(sortColumn ? sortData(data, sortColumn, sortDirection) : data);
</script>

{#if isValidData}
	<div class="table-options mb-1 flex items-center justify-end gap-2">
		{#if sortColumn}
			<button
				title="Clear sort"
				onclick={() => (sortColumn = '')}
				class="button variant-outline border px-1"
			>
				<ClearFilterIcon />
			</button>
		{/if}
		<label title="Wrap values"
			><input type="checkbox" bind:checked={wrapValue} class="hidden" />
			<div class:bg-gray-300={wrapValue} class="button variant-outline border px-1">
				<WrapTextIcon />
			</div></label
		>
	</div>
	<div class="max-h-[90dvh] overflow-auto bg-white">
		<table class="border-collapse cursor-default">
			<thead>
				<tr class="sticky">
					{#each headers as key, index}
						<th
							title={`Click to sort by ${key}`}
							onclick={() => handleSort(key)}
							onmouseover={() => setHoveringColumn(key)}
							onfocus={() => setHoveringColumn(key)}
							onmouseout={() => setHoveringColumn('')}
							onblur={() => setHoveringColumn('')}
							data-key={key}
							data-sort-direction={sortColumn === key ? sortDirection : null}
							class:sorted={sortColumn === key}
							class:col-has-hover={hoveringColumn === key}
							class:sticky={index === 0}
							class="border border-gray-300 bg-white px-1 py-0"
						>
							<div class="flex items-center justify-between gap-x-2">
								<div>{key}</div>
								<div class="sort-indicator"></div>
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each sortedData as entry, rowIndex}
					<tr>
						{#each headers as key, colIndex}
							<td
								onmouseover={() => setHoveringColumn(key)}
								onfocus={() => setHoveringColumn(key)}
								onmouseout={() => setHoveringColumn('')}
								onblur={() => setHoveringColumn('')}
								data-key={key}
								data-value={getCellValue(entry, key)}
								class:col-has-hover={hoveringColumn === key}
								class:sticky={colIndex === 0}
								class:whitespace-nowrap={!wrapValue}
								class="border border-gray-300 px-1 py-0"
							>
								{#if isObject(entry[key])}
									<JSONViewer
										data={entry[key]}
										name={`${name || ''}${entry.id ? `[id: '${entry.id}']` : `[${rowIndex}]`}.${key}`}
									/>
								{:else}
									{getCellValue(entry, key)}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p class="text-red-500">Invalid data format. Expected an array of objects.</p>
{/if}

<style lang="postcss">
	[data-value='']::before {
		content: '—';
	}

	:is(th, td):not([data-value='']):hover {
		@apply bg-gray-300;
	}

	.sticky {
		@apply bg-white;
		tr& {
			@apply top-0 z-[1] shadow-md;
		}

		&:is(td, th) {
			@apply left-0;
			&::before {
				content: '';
				@apply absolute bottom-0 left-[-1px] top-0 border-r-2;
			}
			&::after {
				content: '';
				@apply absolute bottom-0 right-[-2px] top-0 border-l-2;
			}
		}
	}

	tr:hover > td {
		@apply bg-gray-100;
	}
	.col-has-hover {
		@apply bg-gray-100;
		th& {
			@apply outline outline-2 -outline-offset-2;
		}
	}

	.sort-indicator {
		&::after {
			content: '\00a0'; /* Non-breaking space as a placeholder */
		}

		[data-sort-direction='asc'] &::after {
			content: '↑';
		}
		[data-sort-direction='desc'] &::after {
			content: '↓';
		}
	}

	th {
		cursor: pointer;
	}
</style>

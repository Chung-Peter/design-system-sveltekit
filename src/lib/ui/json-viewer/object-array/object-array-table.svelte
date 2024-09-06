<script lang="ts">
	import WrapTextIcon from '~icons/uim/wrap-text'

	import JsonNode from '../json-node.svelte'
	import type { JsonNodeProps, ObjectArray } from '../json-viewer.models'

	type ObjectArrayTableProps = JsonNodeProps & {
		data: ObjectArray
		headers: string[]
		sortColumn?: string
		sortDirection?: 'asc' | 'desc'
		columnFilters?: Record<string, string>
		onFilterChange: (column: string, filterValue: string) => void
		onSortKeyChange: (key: string) => void
	}

	const {
		data,
		headers,
		name = '',
		depth = 0,
		sortColumn = '',
		sortDirection = 'asc',
		columnFilters = {},
		onFilterChange,
		onSortKeyChange,
	}: ObjectArrayTableProps = $props()

	let wrapValue = $state(false)
	let hoveringColumn = $state('')

	function setHoveringColumn(column: string) {
		hoveringColumn = column
	}

	function isObject(value: unknown): boolean {
		return typeof value === 'object' && value !== null
	}

	function getCellValue(item: Record<string, unknown>, key: string): string {
		if (!(key in item)) return ''
		const value = item[key]
		return typeof value === 'object' && value !== null
			? JSON.stringify(value, null, 2)
			: String(value)
	}
</script>

<div class="my-1 flex items-center justify-end gap-2">
	<button
		title="Toggle wrap"
		onclick={() => (wrapValue = !wrapValue)}
		aria-pressed={wrapValue}
		class="button flex items-center border p-1"
		class:bg-gray-200={wrapValue}
	>
		<WrapTextIcon />
		<span class="sr-only">Wrap values</span>
	</button>
</div>
<div class="overflow-auto bg-white">
	<table class="cursor-default" style="--zIndex: {20 - 2 * depth};">
		<thead>
			<tr>
				{#each headers as key, colIndex}
					<th
						scope="col"
						class:left-0={colIndex === 0}
						class:col-has-hover={hoveringColumn === key}
						class="sticky top-0 border border-gray-300 bg-white px-1 py-0"
					>
						<div class="flex flex-col gap-1">
							<div class="flex items-center justify-between gap-x-2">
								<div class="key-name flex-1 text-center">{key}</div>
								<button
									onclick={() => onSortKeyChange(key)}
									title={`Sort by ${key}`}
									class="sort-indicator"
									data-sort-direction={sortColumn === key ? sortDirection : null}
								>
									{sortColumn === key ? (sortDirection === 'asc' ? '↑' : '↓') : '⇅'}
								</button>
							</div>
							<input
								type="text"
								placeholder="Filter..."
								value={columnFilters[key] || ''}
								oninput={(e) => onFilterChange(key, e.currentTarget.value)}
								class="text-sm"
							/>
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as entry, rowIndex}
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
							class:whitespace-nowrap={!wrapValue}
							class="border border-gray-300 px-1 py-0 align-top {colIndex === 0
								? 'sticky left-0 '
								: ''}"
						>
							{#if isObject(entry[key])}
								<JsonNode
									data={entry[key]}
									name={`${name || ''}${entry.id ? `[id: '${entry.id}']` : `[${rowIndex}]`}.${key}`}
									depth={depth + 1}
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

<style lang="postcss">
	[data-value='']::before {
		content: '—';
	}

	:is(th, td):not([data-value='']):hover {
		@apply bg-gray-300;
	}

	.sticky {
		@apply bg-white;

		/* Sticky cells should have z-index */
		&:is(th, .left-0) {
			z-index: var(--zIndex);
		}

		/* Sticky first column header cell should have a higher z-index */
		th.left-0& {
			z-index: calc(var(--zIndex) + 1);
		}

		/* Border on sticky left column */
		/* &.left-0 {
			&::before {
				content: '';
				@apply absolute bottom-0 left-[-1px] top-0 border-r-2;
			}
			&::after {
				content: '';
				@apply absolute bottom-0 right-[-2px] top-0 border-l-2;
			}
		} */
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
		cursor: pointer;
		user-select: none;
	}

	input[type='text'] {
		border: 1px solid #ccc;
		border-radius: 2px;
		padding: 2px 4px;
	}
</style>

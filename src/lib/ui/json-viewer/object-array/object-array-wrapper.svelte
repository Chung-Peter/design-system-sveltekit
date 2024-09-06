<script lang="ts">
	import ClearFilterIcon from '~icons/fluent-mdl2/clear-filter'
	import ClearSortIcon from '~icons/mdi/sort-variant-off'
	import JsonIcon from '~icons/tabler/json'
	import TableIcon from '~icons/octicon/table-24'

	import ObjectArrayTable from './object-array-table.svelte'
	import JsonNode from '../json-node.svelte'
	import { ObjectArray, type FilterSortOptions, type JsonNodeProps } from '../json-viewer.models'
	import { filterAndSortData } from './object-array.utils'

	const { data, name = '', depth = 0, initialOpenDepth = 999 }: JsonNodeProps = $props()

	const { success: isObjectArray, data: parsedData } = ObjectArray.safeParse(data)

	let viewAsTable = $state(true)
	let filterSortOptions = $state<FilterSortOptions>({
		columnFilters: {},
		sortColumn: '',
		sortDirection: 'asc',
	})

	const headers = isObjectArray ? [...new Set(parsedData.flatMap(Object.keys) as string[])] : []

	const processedData = $derived(
		isObjectArray ? filterAndSortData(parsedData, filterSortOptions) : [],
	)

	function clearFilters() {
		filterSortOptions.columnFilters = {}
	}
	function onFilterChange(column: string, filterValue: string) {
		filterSortOptions.columnFilters[column] = filterValue
		if (!filterValue) {
			delete filterSortOptions.columnFilters[column]
		}
	}

	function onSortKeyChange(key: string) {
		if (filterSortOptions.sortColumn === key) {
			filterSortOptions.sortDirection = filterSortOptions.sortDirection === 'asc' ? 'desc' : 'asc'
		} else {
			filterSortOptions.sortColumn = key
			filterSortOptions.sortDirection = 'asc'
		}
		filterSortOptions = { ...filterSortOptions }
	}
</script>

{#if isObjectArray}
	<div class="mt-2 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<button
				onclick={() => (viewAsTable = !viewAsTable)}
				title={viewAsTable ? 'Click to view as JSON' : 'Click to view as table'}
				class="toggle-object-array-view button self-start border px-1 py-0"
			>
				{#if viewAsTable}
					<JsonIcon />
				{:else}
					<TableIcon />
				{/if}
			</button>
		</div>
		<div class="flex items-center gap-2">
			<!-- {#if filterSortOptions.sortColumn} -->
			<button
				title="Clear sort"
				onclick={() => onSortKeyChange('')}
				disabled={!filterSortOptions.sortColumn}
				class="button variant-outline border px-1"
			>
				<ClearSortIcon />
			</button>
			<!-- {/if} -->
			<!-- {#if Object.keys(filterSortOptions.columnFilters).length > 0} -->
			<button
				title="Clear filters"
				onclick={clearFilters}
				disabled={Object.keys(filterSortOptions.columnFilters).length === 0}
				class="button variant-outline border px-1"
			>
				<ClearFilterIcon />
			</button>
			<!-- {/if} -->
		</div>
	</div>

	{#if viewAsTable}
		<ObjectArrayTable
			data={processedData}
			{headers}
			{name}
			{depth}
			sortColumn={filterSortOptions.sortColumn}
			sortDirection={filterSortOptions.sortDirection}
			columnFilters={filterSortOptions.columnFilters}
			{onFilterChange}
			{onSortKeyChange}
		/>
	{:else}
		<div class="is-array entry">
			{#each processedData as entry, index}
				<div class="array-index select-none">[{index}]:</div>
				<div class="json-value">
					<JsonNode
						data={entry}
						name={`${name}[${index}]`}
						depth={depth + 1}
						{initialOpenDepth}
						isLast={index === processedData.length - 1}
					/>
					<!-- <svelte:self
					data={entry}
					name={`${name}[${index}]`}
					depth={depth + 1}
					{initialOpenDepth}
					isLast={index === data.length - 1}
				/> -->
				</div>
			{/each}
		</div>
	{/if}
{:else}
	<div class="font-bold text-red-500">Error: Was expecting an object array</div>
{/if}

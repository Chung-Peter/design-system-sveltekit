<script lang="ts">
	import WrapTextIcon from '~icons/uim/wrap-text';

	import JSONViewer from './json-node.svelte';

	const { data } = $props();

	let wrapValue = $state(false);

	// Ensure data is an array of objects and has at least one item
	const isValidData =
		Array.isArray(data) &&
		data.length > 0 &&
		data.every((item) => typeof item === 'object' && item !== null);

	// Extract all unique keys from all objects
	const headers = isValidData ? [...new Set(data.flatMap(Object.keys))] : [];

	let hoveringColumn = $state<string>('');

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
</script>

{#if isValidData}
	<div class="table-options mb-1 flex items-center justify-end gap-2">
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
							onmouseover={() => setHoveringColumn(key)}
							onfocus={() => setHoveringColumn(key)}
							onmouseout={() => setHoveringColumn('')}
							onblur={() => setHoveringColumn('')}
							data-key={key}
							class:sticky={index === 0}
							class:col-has-hover={hoveringColumn === key}
							class=" border border-gray-300 bg-white px-1 py-0 text-left">{key}</th
						>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as entry}
					<tr>
						{#each headers as key, index}
							<td
								onmouseover={() => setHoveringColumn(key)}
								onfocus={() => setHoveringColumn(key)}
								onmouseout={() => setHoveringColumn('')}
								onblur={() => setHoveringColumn('')}
								data-key={key}
								data-value={getCellValue(entry, key)}
								class:col-has-hover={hoveringColumn === key}
								class:sticky={index === 0}
								class:whitespace-nowrap={!wrapValue}
								class="border border-gray-300 px-1 py-0"
							>
								{#if isObject(entry[key])}
									<JSONViewer data={entry[key]} />
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
</style>

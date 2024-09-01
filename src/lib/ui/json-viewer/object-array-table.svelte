<script lang="ts">
	const { data } = $props<{ data: Record<string, unknown>[] }>();

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

	function getCellValue(item: Record<string, unknown>, key: string): string {
		if (!(key in item)) return '';
		const value = item[key];
		return typeof value === 'object' && value !== null
			? JSON.stringify(value, null, 2)
			: String(value);
	}
</script>

{#if isValidData}
	<table class="border-collapse cursor-default">
		<thead>
			<tr>
				{#each headers as key}
					<th
						onmouseover={() => setHoveringColumn(key)}
						onfocus={() => setHoveringColumn(key)}
						onmouseout={() => setHoveringColumn('')}
						onblur={() => setHoveringColumn('')}
						data-key={key}
						class:col-has-hover={hoveringColumn === key}
						class="border border-gray-300 px-1 py-0 text-left">{key}</th
					>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as entry}
				<tr>
					{#each headers as key}
						<td
							onmouseover={() => setHoveringColumn(key)}
							onfocus={() => setHoveringColumn(key)}
							onmouseout={() => setHoveringColumn('')}
							onblur={() => setHoveringColumn('')}
							data-key={key}
							data-value={getCellValue(entry, key)}
							class:col-has-hover={hoveringColumn === key}
							class="border border-gray-300 px-1 py-0">{getCellValue(entry, key)}</td
						>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p class="text-red-500">Invalid data format. Expected an array of objects.</p>
{/if}

<style lang="postcss">
	:is(th, td):hover {
		@apply bg-gray-300;
	}

	tr:hover {
		@apply bg-gray-100;
	}
	.col-has-hover {
		@apply bg-gray-100;
		th& {
			@apply outline outline-2;
		}
	}
</style>

<script lang="ts">
	import JSONNode from './json-node.svelte';

	const { data, initialOpenDepth = 999 } = $props<{ data: unknown; initialOpenDepth?: number }>();

	const isValid = $derived(isValidJSON(data));
	const parsedData = $derived(isValid ? JSON.parse(JSON.stringify(data)) : undefined);

	function isValidJSON(data: unknown): boolean {
		try {
			JSON.parse(JSON.stringify(data));
			return true;
		} catch {
			return false;
		}
	}
</script>

{#if isValid}
	<div class="json-viewer" role="tree" aria-label="JSON Viewer">
		<JSONNode data={parsedData} {initialOpenDepth} />
	</div>
{:else}
	<div class="json-viewer-error" role="alert">Invalid JSON data</div>
{/if}

<style>
	.json-viewer {
		font-family: monospace;
	}

	.json-viewer-error {
		color: red;
		font-weight: bold;
	}
</style>

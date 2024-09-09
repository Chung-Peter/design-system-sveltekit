<script lang="ts">
	import { Json, type JsonNodeProps } from './json-viewer.models'
	import JsonNode from './json-node.svelte'

	const { data, initialOpenDepth = 999 }: Pick<JsonNodeProps, 'data' | 'initialOpenDepth'> =
		$props()

	const { success: isValid, data: parsedData } = $derived(Json.safeParse(data))
</script>

{#if isValid}
	<div class="json-viewer" role="tree" aria-label="JSON Viewer">
		<JsonNode data={parsedData} {initialOpenDepth} />
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

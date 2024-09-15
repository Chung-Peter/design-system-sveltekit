<script lang="ts">
	import { type JsonNodeProps } from './json-viewer.models'
	import JsonNode from './json-node.svelte'
	import { isValidJson } from './json-viewer.utils'

	const { data, ...restProps }: JsonNodeProps = $props()
</script>

{#if isValidJson(data)}
	<div class="json-viewer" role="tree" aria-label="JSON Viewer">
		<JsonNode {data} {...restProps} />
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

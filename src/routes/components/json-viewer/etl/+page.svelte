<script lang="ts">
	import { onMount } from 'svelte'
	import JsonViewer from '$lib/ui/json-viewer/json-viewer.svelte'
	import plansJson from '../plans.json'

	let inputString = $state(JSON.stringify(plansJson, null, 2))
	// let inputString = $state('{}')
	let input = $derived.by(() => {
		try {
			return { data: JSON.parse(inputString), error: '' }
		} catch (e) {
			return { data: {}, error: 'data must be valid JSON' }
		}
	})

	let jsCode = $state(`// Transform your data here
// Input data is available as 'data'
// Example: 
 const benefitId = '13b'
 return data.map((planData) => {
  const benefit = planData.planBenefits.find((benefit) => benefit.id === benefitId)
  return { modelFactoryId: planData.modelFactoryId, productId: planData.productId, ...benefit }
 })
`)

	const output = $derived.by(() => {
		if (input.error) {
			return { data: {}, error: input.error }
		}
		try {
			const transformFunction = new Function('data', jsCode)
			const result = transformFunction(input.data)

			return { data: result || {}, error: '' }
		} catch (e) {
			return { data: {}, error: e instanceof Error ? e.message : 'An unknown error occurred' }
		}
	})
</script>

<div class="etl-playground">
	<div class="input-box">
		<label for="data-input">Input Data (JSON)</label>
		<textarea
			id="data-input"
			bind:value={inputString}
			rows="10"
			placeholder="Enter your JSON data here"
		></textarea>
	</div>
	<div class="flex flex-col">
		<h3>data:</h3>
		{#if input.error}
			<div class="error" role="alert">{input.error}</div>
		{:else}
			<JsonViewer data={input.data} initialOpenDepth={0} />
		{/if}
	</div>
	<div class="input-box">
		<label for="js-input">JavaScript Transformation</label>
		<textarea
			id="js-input"
			bind:value={jsCode}
			rows="10"
			placeholder="Enter your transformation code here"
			spellcheck="false"
			translate="no"
		></textarea>
	</div>

	<div class="output-section">
		<h3>Output:</h3>
		{#if output.error}
			<div class="error" role="alert">{output.error}</div>
		{:else if output.data}
			<pre>{JSON.stringify(output.data)}</pre>
			<JsonViewer data={output.data} />
		{/if}
	</div>
</div>

<style lang="postcss">
	.etl-playground {
		@apply flex flex-col gap-4;
	}
	.input-box {
		@apply flex flex-col;
	}
	textarea {
		@apply border p-2 font-mono text-sm;
	}
	.error {
		@apply font-bold text-red-500;
	}
</style>

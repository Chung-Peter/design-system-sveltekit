<script lang="ts">
	import { onMount } from 'svelte'
	import JsonViewer from '$lib/ui/json-viewer/json-viewer.svelte'
	import plansJson from '../plans.json'

	let inputData = $state(JSON.stringify(plansJson, null, 2))
	let jsCode = $state(`// Transform your data here
// Input data is available as 'data'
// Example: 
// const benefitId = '1a'
// return data.map((planData) => {
//   const benefit = planData.planBenefits.find((benefit) => benefit.id === benefitId)
//   return { modelFactoryId: planData.modelFactoryId, ...benefit }
// })
`)
	let outputData = $state({})
	let error = $state('')

	function transformData() {
		try {
			const data = JSON.parse(inputData)
			const transformFunction = new Function('data', jsCode)
			const result = transformFunction(data)
			outputData = result
			error = ''
		} catch (e) {
			error = e instanceof Error ? e.message : 'An unknown error occurred'
			outputData = {}
		}
	}

	onMount(() => {
		transformData()
	})
</script>

<div class="etl-playground">
	<div class="input-box">
		<label for="data-input">Input Data (JSON)</label>
		<textarea
			id="data-input"
			bind:value={inputData}
			oninput={transformData}
			rows="10"
			placeholder="Enter your JSON data here"
		></textarea>
	</div>
	<div class="flex flex-col">
		<h3>data:</h3>
		<JsonViewer data={JSON.parse(inputData)} initialOpenDepth={0} />
	</div>
	<div class="input-box">
		<label for="js-input">JavaScript Transformation</label>
		<textarea
			id="js-input"
			bind:value={jsCode}
			oninput={transformData}
			rows="10"
			placeholder="Enter your transformation code here"
			spellcheck="false"
			translate="no"
		></textarea>
	</div>

	<div class="output-section">
		<h3>Output:</h3>
		{#if error}
			<div class="error" role="alert">{error}</div>
		{:else}
			<JsonViewer data={outputData} />
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

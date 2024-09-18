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

function naturalSortById(objArr) {
	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
	return objArr.sort((a, b) => collator.compare(a.id, b.id))
}

// get all unique benefitIds across all plans
const benefitIds = Array.from(
	new Set(
		data.flatMap((planData) =>
			planData.planBenefits.flatMap((b) =>
				JSON.stringify({ id: b.id, benefitName: b.benefitName }),
			),
		),
	),
).map((stringified) => JSON.parse(stringified))
const sortedBenefitIds = naturalSortById(benefitIds)

function getObjectById(objArr, id) {
	return objArr.find((obj) => obj.id === id)
}

// compare benefitId across all plans
const benefitId = '13b'
const comparePlans = data.map((planData) => {
	const benefit = getObjectById(planData.planBenefits, benefitId)

	const result = {
		modelFactoryId: planData.modelFactoryId,
		productId: planData.productId,
		...benefit,
	}
	return result
})

return {
	comparePlans,
	benefitIds: sortedBenefitIds,
}
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
			<JsonViewer
				data={input.data}
				initialOpenDepth={0}
				openAfterDepth={1}
				defaultObjectArrayView="json"
			/>
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
			<div class="error border border-red-500 p-2" role="alert">{output.error}</div>
		{:else if output.data}
			<div class="border border-green-300 p-2">
				<JsonViewer data={output.data} />
			</div>
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

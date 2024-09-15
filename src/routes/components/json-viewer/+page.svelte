<script lang="ts">
	import JSONViewer from '$lib/ui/json-viewer/json-viewer.svelte'
	import plansBenefits from './plans.json'
	import testData from './test-data.json'

	const benefitId = '1a'
	const transformedData = plansBenefits.map((planData) => {
		const benefit = planData.planBenefits.find((benefit) => benefit.id === benefitId)
		return { modelFactoryId: planData.modelFactoryId, ...benefit }
	})
</script>

<div class="flex flex-col gap-4">
	<div class=" border p-2">
		<h2>plansBenefits[0]</h2>
		<JSONViewer data={plansBenefits[0]} initialOpenDepth={5} />
	</div>

	<div class="border p-2">
		<h2>plansBenefits</h2>
		<JSONViewer data={plansBenefits} initialOpenDepth={1} />
	</div>

	<div class="border p-2">
		<h2>transformedData</h2>
		<JSONViewer data={transformedData} />
	</div>

	<div class="border p-2">
		<h2>testData</h2>
		<JSONViewer data={testData} />
	</div>

	<div class="border p-2">
		<h2>Empty Array</h2>
		<JSONViewer data={[]} />
	</div>

	<div class="border p-2">
		<h2>Bad Data</h2>
		<JSONViewer data={{ a: undefined }} />
	</div>
</div>

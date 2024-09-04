<script lang="ts">
	import JSONViewer from '$lib/ui/json-viewer/json-viewer.svelte';
	import plansBenefits from './plans.json';
	import testData from './test-data.json';

	const benefitId = '1a';
	const data = plansBenefits.map((planData) => {
		const benefit = planData.planBenefits.find((benefit) => benefit.id === benefitId);
		return { modelFactoryId: planData.modelFactoryId, ...benefit };
	});
</script>

<!-- <JSONViewer {data} initialOpenDepth={3} /> -->

<JSONViewer data={testData} />

<JSONViewer data={plansBenefits} initialOpenDepth={1} />

<!-- Example with bad data -->
<!-- <JSONViewer data={{ a: undefined }} /> -->

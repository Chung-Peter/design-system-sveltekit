import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Accordion',
		description: 'Show/hide content',
	}
}) satisfies PageLoad

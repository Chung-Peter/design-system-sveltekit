import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Button',
		description: 'Make things clicky',
	}
}) satisfies PageLoad

import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Introduction',
		description: 'Introduction to the Design System',
	}
}) satisfies PageLoad

import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'ETL Playground',
		description: 'A playground for ETL (Extract, Transform, Load) operations.',
	}
}) satisfies PageLoad

import type { PageLoad } from './$types'

export const ssr = false

export const load = (async () => {
	return {
		title: 'REPL',
		description: 'Play around with the CSS design system',
	}
}) satisfies PageLoad

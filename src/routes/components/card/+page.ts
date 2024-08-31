import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		title: 'Card',
		description: 'A container for things.'
	};
}) satisfies PageLoad;

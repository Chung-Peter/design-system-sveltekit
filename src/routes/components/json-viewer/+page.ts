import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		title: 'JSON Viewer',
		description: 'A JSON viewer component. Object arrays can be viewed as tables.'
	};
}) satisfies PageLoad;

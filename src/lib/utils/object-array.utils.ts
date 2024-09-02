export function naturalSortObjectArray<T extends Record<string, unknown>>(
	dataToSort: T[],
	sortByKey: keyof T,
	sortDirection: 'asc' | 'desc'
): T[] {
	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

	return [...dataToSort].sort((a, b) => {
		const valueA = a[sortByKey];
		const valueB = b[sortByKey];

		if (valueA === valueB) return 0;
		if (valueA == null) return sortDirection === 'asc' ? 1 : -1;
		if (valueB == null) return sortDirection === 'asc' ? -1 : 1;

		// Convert to string for comparison
		const stringA = String(valueA);
		const stringB = String(valueB);

		// Use natural sort comparison
		const comparison = collator.compare(stringA, stringB);
		return sortDirection === 'asc' ? comparison : -comparison;
	});
}

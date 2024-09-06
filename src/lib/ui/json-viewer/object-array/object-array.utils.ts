import type { ObjectArray, FilterSortOptions } from '../json-viewer.models';

export function naturalSortObjectArray(
	dataToSort: ObjectArray,
	sortByKey: string,
	sortDirection: 'asc' | 'desc'
): ObjectArray {
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

export function filterAndSortData(data: ObjectArray, options: FilterSortOptions): ObjectArray {
	let result = filterData(data, options.columnFilters);
	result = sortData(result, options.sortColumn, options.sortDirection);
	return result;
}

function filterData(data: ObjectArray, columnFilters: Record<string, string>): ObjectArray {
	return data.filter((item) =>
		Object.entries(columnFilters).every(([key, filterValue]) => {
			if (!filterValue) return true;
			const cellValue = item[key];
			return (
				cellValue !== undefined &&
				String(cellValue).toLowerCase().includes(filterValue.toLowerCase())
			);
		})
	);
}

function sortData(
	data: ObjectArray,
	sortColumn: string,
	sortDirection: 'asc' | 'desc'
): ObjectArray {
	if (!sortColumn) return data;
	return naturalSortObjectArray(data, sortColumn, sortDirection);
}

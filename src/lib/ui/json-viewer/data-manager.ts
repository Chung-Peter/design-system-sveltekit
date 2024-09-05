import type { ObjectArray, FilterSortOptions } from './models';
import { naturalSortObjectArray } from './utils';

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

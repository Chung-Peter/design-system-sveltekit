

export const OBJECT_ARRAY_VIEW_OPTIONS = ['table', 'json'] as const
export type ObjectArrayView = (typeof OBJECT_ARRAY_VIEW_OPTIONS)[number]

export interface JsonNodeProps {
	data: unknown
	name?: string
	depth?: number
	isLast?: boolean
	initialOpenDepth?: number
	openAfterDepth?: number
	defaultObjectArrayView?: ObjectArrayView
}

export interface FilterSortOptions {
	columnFilters: Record<string, string>
	sortColumn: string
	sortDirection: 'asc' | 'desc'
}

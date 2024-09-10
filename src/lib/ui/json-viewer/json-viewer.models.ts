import { z } from 'zod'

const Primitive = z.union([z.string(), z.number(), z.boolean(), z.null()])
type Primitive = z.infer<typeof Primitive>

export type Json = Primitive | { [key: string]: Json } | Json[]
export const Json: z.ZodType<Json> = z.lazy(() =>
	z.union([Primitive, z.array(Json), z.record(Json)]),
)

export const JsonArray = z.array(Json)
export type JsonArray = z.infer<typeof JsonArray>

export const JsonObject = z.record(Json)
export type JsonObject = z.infer<typeof JsonObject>

export const ObjectArray = z.array(JsonObject)
export type ObjectArray = z.infer<typeof ObjectArray>
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

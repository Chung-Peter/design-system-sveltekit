import { z } from 'zod';

const Primitive = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Primitive = z.infer<typeof Primitive>;

export type Json = Primitive | { [key: string]: Json } | Json[];
export const Json: z.ZodType<Json> = z.lazy(() =>
	z.union([Primitive, z.array(Json), z.record(Json)])
);

export const ObjectArray = z.array(z.record(z.unknown()));
// .min(1, { message: 'Array must have at least one object' })
// .nonempty({ message: 'Array cannot contain null or undefined values' });
export type ObjectArray = z.infer<typeof ObjectArray>;

export interface JsonNodeProps {
	data: unknown;
	name?: string;
	depth?: number;
	isLast?: boolean;
	initialOpenDepth?: number;
}

export interface FilterSortOptions {
	columnFilters: Record<string, string>;
	sortColumn: string;
	sortDirection: 'asc' | 'desc';
}

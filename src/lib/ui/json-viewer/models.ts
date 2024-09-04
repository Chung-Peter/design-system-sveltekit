import { z } from 'zod';

const Primitive = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Primitive = z.infer<typeof Primitive>;

export type Json = Primitive | { [key: string]: Json } | Json[];
export const Json: z.ZodType<Json> = z.lazy(() =>
	z.union([Primitive, z.array(Json), z.record(Json)])
);

export interface JsonNodeProps {
	data: unknown;
	name?: string;
	depth?: number;
	isLast?: boolean;
	initialOpenDepth?: number;
}

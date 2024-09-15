export const isValidPrimitive = (data: unknown): boolean =>
	data === null || ['string', 'number', 'boolean'].includes(typeof data)

export const isObject = (data: unknown): data is Record<string, unknown> =>
	typeof data === 'object' && data !== null && data !== undefined && !Array.isArray(data)

export const isArray = (data: unknown): data is unknown[] => Array.isArray(data)

export const isObjectArray = (data: unknown): data is Record<string, unknown>[] =>
	Array.isArray(data) && data.length > 0 && data.every(isObject)

export const isValidJson = (data: unknown): boolean => {
	if (data === undefined) return false

	try {
		JSON.parse(JSON.stringify(data))
		return true
	} catch {
		return false
	}
}

import type { RawOption } from '../option/props'

export type SelectRawOption = RawOption & Record<string, any>

export type SelectValue = any[] | string | number | boolean | Record<string, any> | any

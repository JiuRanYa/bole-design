import { RawOption } from '../option/props'

export type SelectRawOption = RawOption & Record<string, string>

export type SelectValue = any[] | string | number | boolean | Record<string, any> | any

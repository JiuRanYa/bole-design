import { CSSProperties } from 'vue'

export interface LocalConfig {
  locale: string
}
export type ClassType = string | Record<string, any> | Array<string | Record<string, any>>
export type StyleType = string | CSSProperties | Array<string | CSSProperties>

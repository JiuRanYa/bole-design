import type { ComputedRef, InjectionKey } from 'vue'

export interface RootContext {
  hasSidebar: ComputedRef<boolean>
}
export const rootKey: InjectionKey<RootContext> = Symbol('BlDocsRoot')

export const BL_PROJECT_STORAGE = 'bl-userPreferredPro'

import { ComputedRef, InjectionKey } from 'vue'

export interface RootContext {
  hasSidebar: ComputedRef<boolean>
}
export const supportProjects = ['panda-ui', 'panda', 'chat']
export const rootKey: InjectionKey<RootContext> = Symbol('BlDocsRoot')

export const BL_PROJECT_STORAGE = 'bl-userPreferredPro'

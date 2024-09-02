import { computed, getCurrentScope, inject, markRaw, provide, unref } from 'vue'

import {
  ArrowRightLeft,
  Binary,
  Calendar,
  CheckCheck,
  ChevronsRight,
  Circle,
  CircleCheckBig,
  Clock,
  Filter,
  Hash,
  ListChecks,
  ListCollapse,
  Regex,
  Type,
} from 'lucide-vue-next'

import type { App, ComputedRef } from 'vue'
import { ensureArray } from '../utils'
import type { MaybeRef, StyleType } from '../types'
import type { ClassType } from './local'

export const PROVIDED_ICONS = '__bl-provided-icons'

export type IconValue = Record<string, any> | (() => any)

export interface IconOptions extends Record<string, any> {
  class?: ClassType
  style?: StyleType
  scale?: number | string
  title?: string
  label?: string
  flip?: 'horizontal' | 'vertical' | 'both'
  effect?: string
  size?: string
  color?: string
  rotate?: number | string
}

export type IconArrayValue = [IconValue, IconOptions?]
export type IconConfig = IconValue | IconArrayValue

export interface IconsOptions {
  chevronsRight?: IconConfig
  arrowRightLeft?: IconConfig
  clock?: IconConfig
  calendar?: IconConfig
  filter?: IconConfig
  text?: IconConfig
  hash?: IconConfig
  listCollapse?: IconConfig
  listChecks?: IconConfig
  regex?: IconConfig
  circleCheckBig?: IconConfig
  binary?: IconConfig
  checkCheck?: IconConfig
  circle: IconConfig
}

export type IconName = keyof IconsOptions
export type IconsConfig = {
  [K in keyof IconsOptions]-?: IconConfig
}
export type NormalizedIconsConfig = Record<IconName, IconOptions & { icon: IconValue }>

const iconMap: IconsConfig = {
  chevronsRight: ChevronsRight,
  arrowRightLeft: ArrowRightLeft,
  clock: Clock,
  calendar: Calendar,
  filter: Filter,
  text: Type,
  hash: Hash,
  listCollapse: ListCollapse,
  listChecks: ListChecks,
  regex: Regex,
  circleCheckBig: CircleCheckBig,
  binary: Binary,
  checkCheck: CheckCheck,
  circle: Circle,
}

export const iconNames = Object.freeze(Object.keys(iconMap) as IconName[])

export const globalIcons = computed(() => {
  const icons = {} as NormalizedIconsConfig

  for (const name of iconNames) {
    const [icon, options = {}] = ensureArray(iconMap[name]) as [Record<string, any>, IconOptions?]

    icons[name] = { ...options, icon }
  }

  return icons
})

/**
 * Provide a icons config for under components.
 *
 * @param icons icons config
 * @param app the app of Vue, will use app.provide if specify
 */
export function configIcons(icons: MaybeRef<IconsOptions>, app?: App) {
  const upstreamIcons
    = app || !getCurrentScope()
      ? globalIcons
      : inject<ComputedRef<IconsConfig> | null>(PROVIDED_ICONS, null)
  const normalizedIcons = computed(() => {
    const normalizedIcons = {} as IconsConfig
    const unrefIcons = unref(icons)

    for (const name of iconNames) {
      const config = unrefIcons[name]

      if (!config) {
        normalizedIcons[name] = upstreamIcons?.value[name] || globalIcons.value[name]
      }
      else {
        const [icon, options = {}] = ensureArray(config) as IconArrayValue
        const normalizedIcon = typeof icon === 'function' ? icon : markRaw(icon)

        normalizedIcons[name] = { ...options, icon: normalizedIcon }
      }
    }

    return normalizedIcons
  })

  if (app)
    app.provide(PROVIDED_ICONS, normalizedIcons)
  else
    provide(PROVIDED_ICONS, normalizedIcons)
}

export function useIcons() {
  return inject<ComputedRef<NormalizedIconsConfig>>(PROVIDED_ICONS, globalIcons)
}

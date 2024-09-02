import type { Placement } from '../types'

export const placementWhiteList = Object.freeze([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as Placement[])

export const triggerWhiteList = Object.freeze(['click', 'hover'])

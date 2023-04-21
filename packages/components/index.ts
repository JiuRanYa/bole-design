import { Avatar } from './avatar'
import { Swiper } from './swiper'

import { buildInstall } from './create'

const components = [Avatar, Swiper]

export { buildInstall }
export const install = buildInstall(components)

export * from './avatar'
export * from './swiper'

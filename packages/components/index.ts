import { Swiper } from './swiper'

import { buildInstall } from './create'

const components = [Swiper]

export { buildInstall }
export const install = buildInstall(components)

export * from './swiper'

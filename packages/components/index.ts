import { Avatar } from './avatar'
import { Button } from './button'
import { Swiper } from './swiper'

import { buildInstall } from './create'

const components = [Avatar, Button, Swiper]

export { buildInstall }
export const install = buildInstall(components)

export * from './avatar'
export * from './button'
export * from './swiper'

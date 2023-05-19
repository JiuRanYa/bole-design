import { Button } from './button'
import { Col } from './col'
import { Menu } from './menu'
import { Popover } from './popover'
import { Portal } from './portal'
import { Row } from './row'
import { Tooltip } from './tooltip'

import { buildInstall } from './create'

const components = [Button, Col, Menu, Popover, Portal, Row, Tooltip]

export const install = buildInstall(components)

export * from './button'
export * from './col'
export * from './menu'
export * from './popover'
export * from './portal'
export * from './row'
export * from './tooltip'

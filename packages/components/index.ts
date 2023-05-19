import { Button } from './button'
import { Col } from './col'
import { Menu } from './menu'
import { Row } from './row'
import { Tooltip } from './tooltip'

import { buildInstall } from './create'

const components = [Button, Col, Menu, Row, Tooltip]

export const install = buildInstall(components)

export * from './button'
export * from './col'
export * from './menu'
export * from './row'
export * from './tooltip'

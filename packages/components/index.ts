import { Button } from './button'
import { Col } from './col'
import { CollapseTransition } from './collapse-transition'
import { Icon } from './icon'
import { Menu } from './menu'
import { Popper } from './popper'
import { Portal } from './portal'
import { Row } from './row'
import { Switch } from './switch'
import { Tooltip } from './tooltip'

import { buildInstall } from './create'

const components = [
  Button,
  Col,
  CollapseTransition,
  Icon,
  Menu,
  Popper,
  Portal,
  Row,
  Switch,
  Tooltip
]

export const install = buildInstall(components)

export * from './button'
export * from './col'
export * from './collapse-transition'
export * from './icon'
export * from './menu'
export * from './popper'
export * from './portal'
export * from './row'
export * from './switch'
export * from './tooltip'

import { Button } from './button'
import { ButtonGroup } from './button-group'
import { Col } from './col'
import { CollapseTransition } from './collapse-transition'
import { DatePicker } from './date-picker'
import { Icon } from './icon'
import { Input } from './input'
import { Menu } from './menu'
import { Popper } from './popper'
import { Portal } from './portal'
import { Row } from './row'
import { Switch } from './switch'
import { Tooltip } from './tooltip'

import { buildInstall } from './create'

const components = [
  Button,
  ButtonGroup,
  Col,
  CollapseTransition,
  DatePicker,
  Icon,
  Input,
  Menu,
  Popper,
  Portal,
  Row,
  Switch,
  Tooltip
]

export const install = buildInstall(components)

export * from './button'
export * from './button-group'
export * from './col'
export * from './collapse-transition'
export * from './date-picker'
export * from './icon'
export * from './input'
export * from './menu'
export * from './popper'
export * from './portal'
export * from './row'
export * from './switch'
export * from './tooltip'

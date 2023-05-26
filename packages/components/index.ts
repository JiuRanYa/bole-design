import { Button } from './button'
import { Col } from './col'
import { Menu } from './menu'
import { Popper } from './popper'
import { Portal } from './portal'
import { Row } from './row'
import { Switch } from './switch'
import { Tooltip } from './tooltip'

import { buildInstall } from './create'

const components = [Button, Col, Menu, Popper, Portal, Row, Switch, Tooltip]

export const install = buildInstall(components)

export * from './button'
export * from './col'
export * from './menu'
export * from './popper'
export * from './portal'
export * from './row'
export * from './switch'
export * from './tooltip'

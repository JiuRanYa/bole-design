import { Avatar } from './avatar'
import { Badge } from './badge'
import { Button } from './button'
import { ButtonGroup } from './button-group'
import { Checkbox } from './checkbox'
import { Col } from './col'
import { CollapseTransition } from './collapse-transition'
import { DatePicker } from './date-picker'
import { Icon } from './icon'
import { Input } from './input'
import { Menu } from './menu'
import { Message } from './message'
import { Modal } from './modal'
import { Option } from './option'
import { Popper } from './popper'
import { Portal } from './portal'
import { Row } from './row'
import { Select } from './select'
import { Switch } from './switch'
import { Tabs } from './tabs'
import { TabsList } from './tabs-list'
import { TabsPane } from './tabs-pane'
import { TabsTrigger } from './tabs-trigger'
import { Tooltip } from './tooltip'

import { buildInstall } from './create'

const components = [
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Col,
  CollapseTransition,
  DatePicker,
  Icon,
  Input,
  Menu,
  Message,
  Modal,
  Option,
  Popper,
  Portal,
  Row,
  Select,
  Switch,
  Tabs,
  TabsList,
  TabsPane,
  TabsTrigger,
  Tooltip
]

export const install = buildInstall(components)

export * from './avatar'
export * from './badge'
export * from './button'
export * from './button-group'
export * from './checkbox'
export * from './col'
export * from './collapse-transition'
export * from './date-picker'
export * from './icon'
export * from './input'
export * from './menu'
export * from './message'
export * from './modal'
export * from './option'
export * from './popper'
export * from './portal'
export * from './row'
export * from './select'
export * from './switch'
export * from './tabs'
export * from './tabs-list'
export * from './tabs-pane'
export * from './tabs-trigger'
export * from './tooltip'

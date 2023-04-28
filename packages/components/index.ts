import { Avatar } from './avatar'
import { Button } from './button'
import { Col } from './col'
import { Row } from './row'

import { buildInstall } from './create'

const components = [Avatar, Button, Col, Row]

export { buildInstall }
export const install = buildInstall(components)

export * from './avatar'
export * from './button'
export * from './col'
export * from './row'

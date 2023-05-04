import { Button } from './button'
import { Col } from './col'
import { Row } from './row'

import { buildInstall } from './create'

const components = [Button, Col, Row]

export const install = buildInstall(components)

export * from './button'
export * from './col'
export * from './row'

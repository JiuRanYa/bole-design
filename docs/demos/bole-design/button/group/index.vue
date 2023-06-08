<template>
  <Row :gap="[0, 18]">
    <Col>
      <ButtonGroup>
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </ButtonGroup>
    </Col>

    <Col>
      <ButtonGroup :circle="true">
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </ButtonGroup>
    </Col>
  </Row>
</template>

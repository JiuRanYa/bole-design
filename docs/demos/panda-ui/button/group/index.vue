<script setup lang="ts">
import { FaceGrinBeamR, FaceSurpriseR, MoonR, SunR } from '@panda-ui/icons'
</script>

<template>
  <Row :gap="[0, 18]">
    <Col>
      <ButtonGroup circle>
        <Button :icon="SunR" />
        <Button :icon="MoonR" />
        <Button :icon="FaceGrinBeamR" />
        <Button :icon="FaceSurpriseR" />
      </ButtonGroup>
    </Col>

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

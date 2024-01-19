<template>
  <Row :gap="[0, 18]">
    <Col>
      <ButtonGroup circle>
        <Button :icon="SunR"></Button>
        <Button :icon="MoonR"></Button>
        <Button :icon="FaceGrinBeamR"></Button>
        <Button :icon="FaceSurpriseR"></Button>
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

<script setup lang="ts">
import { FaceGrinBeamR, FaceSurpriseR, SunR, MoonR } from '@panda-ui/icons'
</script>

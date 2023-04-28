<template>
  <Row :gap="[16, 24]">
    <Col :span="12">
      <div class="content">col-12</div>
    </Col>
    <Col :span="12">
      <div class="content">col-12</div>
    </Col>
    <Col :span="12">
      <div class="content">col-12</div>
    </Col>
    <Col :span="12">
      <div class="content">col-12</div>
    </Col>
  </Row>
  <Row :gap="[8, 16]" style="margin-top: 24px">
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
  </Row>
  <Row style="margin-top: 24px">
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
    <Col :span="4">
      <div class="content">col-4</div>
    </Col>
  </Row>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 48px;
  color: #fff;
  background-color: var(--bl-color-primary-base);
  border-radius: var(--bl-radius-base);
}
</style>

<template>
  <Tooltip content="tooltip内容">
    <Button> 相同主题 </Button>
  </Tooltip>
  <Tooltip content="tooltip内容" :reverse="true" style="margin-left: 24px">
    <Button>相反主题 </Button>
  </Tooltip>
</template>

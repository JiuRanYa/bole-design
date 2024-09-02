<template>
  <Dropdown>
    <Button type="primary">
      下拉菜单
    </Button>

    <template #drop>
      <DropdownList>
        <DropdownItem> 选项一 </DropdownItem>
        <DropdownItem> 选项二 </DropdownItem>
        <DropdownItem> 选项三 </DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>

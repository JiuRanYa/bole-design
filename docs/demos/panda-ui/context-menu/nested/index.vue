<template>
  <ContextMenu>
    <template #trigger>
      <div class="context-menu-trigger">click here</div>
    </template>
    <template #content>
      <Dropdown>
        <DropdownList>
          <DropdownItem>选项一</DropdownItem>
          <DropdownItem>选项二</DropdownItem>
          <Dropdown trigger="hover">
            <DropdownItem>
              选项三
              <Icon
                :scale="0.8"
                style="position: relative; inset-inline-start: 6px; margin-right: 6px"
              >
                <AngleRight></AngleRight>
              </Icon>
            </DropdownItem>
            <template #drop>
              <DropdownList>
                <DropdownItem>子选项一</DropdownItem>
                <DropdownItem disabled> 子选项二 </DropdownItem>
                <DropdownItem>子选项三</DropdownItem>
              </DropdownList>
            </template>
          </Dropdown>
          <DropdownItem>选项四</DropdownItem>
        </DropdownList>
      </Dropdown>
    </template>
  </ContextMenu>
</template>

<style lang="scss" scoped>
.context-menu-trigger {
  border: 1px dashed var(--bl-border-color-base);
  width: 300px;
  height: 200px;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Avatar: typeof import('bole-design')['Avatar']
    Badge: typeof import('bole-design')['Badge']
    Button: typeof import('bole-design')['Button']
    ButtonGroup: typeof import('bole-design')['ButtonGroup']
    Checkbox: typeof import('bole-design')['Checkbox']
    Col: typeof import('bole-design')['Col']
    CollapseTransition: typeof import('bole-design')['CollapseTransition']
    DatePicker: typeof import('bole-design')['DatePicker']
    Icon: typeof import('bole-design')['Icon']
    Input: typeof import('bole-design')['Input']
    Menu: typeof import('bole-design')['Menu']
    Message: typeof import('bole-design')['Message']
    Modal: typeof import('bole-design')['Modal']
    Option: typeof import('bole-design')['Option']
    Popper: typeof import('bole-design')['Popper']
    Portal: typeof import('bole-design')['Portal']
    Row: typeof import('bole-design')['Row']
    Select: typeof import('bole-design')['Select']
    Switch: typeof import('bole-design')['Switch']
    Tabs: typeof import('bole-design')['Tabs']
    TabsList: typeof import('bole-design')['TabsList']
    TabsPane: typeof import('bole-design')['TabsPane']
    TabsTrigger: typeof import('bole-design')['TabsTrigger']
    Tooltip: typeof import('bole-design')['Tooltip']
  }

  interface ComponentCustomProperties {}
}

export {}

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Button: typeof import('bole-design')['Button']
    ButtonGroup: typeof import('bole-design')['ButtonGroup']
    Col: typeof import('bole-design')['Col']
    CollapseTransition: typeof import('bole-design')['CollapseTransition']
    DatePicker: typeof import('bole-design')['DatePicker']
    Icon: typeof import('bole-design')['Icon']
    Menu: typeof import('bole-design')['Menu']
    Popper: typeof import('bole-design')['Popper']
    Portal: typeof import('bole-design')['Portal']
    Row: typeof import('bole-design')['Row']
    Switch: typeof import('bole-design')['Switch']
    Tooltip: typeof import('bole-design')['Tooltip']
  }

  interface ComponentCustomProperties {}
}

export {}

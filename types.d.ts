// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Button: typeof import('bole-design')['Button']
    Col: typeof import('bole-design')['Col']
    Row: typeof import('bole-design')['Row']
  }

  interface ComponentCustomProperties {}
}

export {}

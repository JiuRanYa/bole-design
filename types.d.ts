// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Avatar: typeof import('bole-design')['Avatar']
    Button: typeof import('bole-design')['Button']
    Swiper: typeof import('bole-design')['Swiper']
  }

  interface ComponentCustomProperties {}
}

export {}

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Avatar: typeof import('bole-design')['Avatar']
    Swiper: typeof import('bole-design')['Swiper']
  }

  interface ComponentCustomProperties {}
}

export {}

declare module 'vue' {
  export interface GlobalComponents {
    Avatar: typeof import('bole-ui')['Avatar']
    Swiper: typeof import('bole-ui')['Swiper']
  }

  interface ComponentCustomProperties {}
}

export {}

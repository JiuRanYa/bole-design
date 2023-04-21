declare module 'vue' {
  export interface GlobalComponents {
    Swiper: typeof import('bole-ui')['Swiper']
  }

  interface ComponentCustomProperties {}
}

export {}

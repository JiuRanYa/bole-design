declare module "vue" {
  export interface GlobalComponents {
    Avatar: typeof import("bole")["Avatar"];
    Swiper: typeof import("bole")["Swiper"];
  }

  interface ComponentCustomProperties {}
}

export {};

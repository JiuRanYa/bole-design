import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig(() => {
  return {
    title: "Bole-UI",
    description: "Bole's tool set based on vue3",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "Guide", link: "/" },
        { text: "Components", link: "/components/" },
      ],

      sidebar: [
        {
          text: "Examples",
          items: [],
        },
      ],

      socialLinks: [
        { icon: "github", link: "https://github.com/vuejs/vitepress" },
      ],
    },
  };
});

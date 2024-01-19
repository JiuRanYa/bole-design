// .vitepress/config.ts
import { defineConfig } from "file:///Users/jiuran/projects/bole-design/web/node_modules/.pnpm/vitepress@1.0.0-rc.4_@algolia+client-search@4.19.1_@types+node@18.15.12_sass@1.62.0_search-insights@2.8.3/node_modules/vitepress/dist/node/index.js";

// .vitepress/configs/head.ts
import fs from "fs";
import path from "path";
import { vpRoot } from "file:///Users/jiuran/projects/bole-design/web/internal/dist/index.cjs";
var head = [
  ["script", {}, fs.readFileSync(path.resolve(vpRoot, "./project.js"), "utf-8")]
];
var head_default = head;

// .vitepress/configs/myMarkdown.ts
import fs2 from "fs";
import path2 from "path";
import MarkdownIt from "file:///Users/jiuran/projects/bole-design/web/node_modules/.pnpm/markdown-it@13.0.1/node_modules/markdown-it/index.js";
import mdContainer from "file:///Users/jiuran/projects/bole-design/web/node_modules/.pnpm/markdown-it-container@3.0.0/node_modules/markdown-it-container/index.js";
import { docRoot } from "file:///Users/jiuran/projects/bole-design/web/internal/dist/index.cjs";

// .vitepress/utils/highlight.ts
import { getHighlighter } from "file:///Users/jiuran/projects/bole-design/web/node_modules/.pnpm/shiki@0.14.2/node_modules/shiki/dist/index.js";
var highlighter = await getHighlighter({
  themes: ["material-theme-palenight"],
  langs: ["javascript", "vue"]
});
var highlight = (str) => {
  str = highlighter.codeToHtml(str, { lang: "vue" });
  return str;
};

// .vitepress/configs/myMarkdown.ts
var localMd = MarkdownIt();
var demoRex = /^demo\s*(.*)$/;
var markdownPlugin = (md) => {
  md.use(mdContainer, "demo", {
    validate: function(params) {
      return !!params.trim().match(demoRex);
    },
    render(tokens, idx, t, env) {
      var _a;
      const m = tokens[idx].info.trim().match(demoRex);
      const sourceFileToken = tokens[idx + 2];
      const project = "panda-ui";
      if (!project) {
        throw new Error(`Mark sure to put your md in projects path`);
      }
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : "";
        const sourceFilePath = ((_a = sourceFileToken == null ? void 0 : sourceFileToken.children) == null ? void 0 : _a[0].content) ?? "";
        let code = "";
        if ((sourceFileToken == null ? void 0 : sourceFileToken.type) === "inline") {
          code = fs2.readFileSync(
            path2.resolve(docRoot, `demos/${project}`, `${sourceFilePath}`, "index.vue"),
            "utf-8"
          );
        }
        code = highlight(code);
        return `<Demo 
					:demos="demos"
					desc="${encodeURIComponent(localMd.render(description))}"
					path="${sourceFilePath}"
					source="${encodeURIComponent(code)}"
				>`;
      } else {
        return "</Demo>";
      }
    }
  });
};

// .vitepress/config.ts
var config = defineConfig({
  title: "Panda UI",
  lang: "zh-CN",
  description: "\u9AD8\u5EA6\u53EF\u5B9A\u5236\u5316\uFF0C\u5168\u91CF Typescript \u652F\u6301\uFF0C\u9762\u5411\u5F00\u53D1\u8005\u7684\u5DE5\u5177\u96C6",
  head: head_default,
  lastUpdated: true,
  themeConfig: {},
  markdown: {
    headers: {
      level: [1, 2, 3]
    },
    config: (md) => markdownPlugin(md)
  }
});
var config_default = config;
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiLCAiLnZpdGVwcmVzcy9jb25maWdzL2hlYWQudHMiLCAiLnZpdGVwcmVzcy9jb25maWdzL215TWFya2Rvd24udHMiLCAiLnZpdGVwcmVzcy91dGlscy9oaWdobGlnaHQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaml1cmFuL3Byb2plY3RzL2JvbGUtZGVzaWduL3dlYi9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qaXVyYW4vcHJvamVjdHMvYm9sZS1kZXNpZ24vd2ViL2RvY3MvLnZpdGVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ppdXJhbi9wcm9qZWN0cy9ib2xlLWRlc2lnbi93ZWIvZG9jcy8udml0ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcbmltcG9ydCB7IG5hdiB9IGZyb20gJy4vY29uZmlncydcbmltcG9ydCBoZWFkIGZyb20gJy4vY29uZmlncy9oZWFkJ1xuaW1wb3J0IHNpZGViYXJzIGZyb20gJy4vY29uZmlncy9zaWRlYmFyJ1xuaW1wb3J0IHsgbWFya2Rvd25QbHVnaW4gfSBmcm9tICcuL2NvbmZpZ3MvbXlNYXJrZG93bidcblxuLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9zaXRlLWNvbmZpZ1xuY29uc3QgY29uZmlnID0gZGVmaW5lQ29uZmlnKHtcbiAgdGl0bGU6ICdQYW5kYSBVSScsXG4gIGxhbmc6ICd6aC1DTicsXG4gIGRlc2NyaXB0aW9uOiAnXHU5QUQ4XHU1RUE2XHU1M0VGXHU1QjlBXHU1MjM2XHU1MzE2XHVGRjBDXHU1MTY4XHU5MUNGIFR5cGVzY3JpcHQgXHU2NTJGXHU2MzAxXHVGRjBDXHU5NzYyXHU1NDExXHU1RjAwXHU1M0QxXHU4MDA1XHU3Njg0XHU1REU1XHU1MTc3XHU5NkM2JyxcbiAgaGVhZCxcbiAgbGFzdFVwZGF0ZWQ6IHRydWUsXG4gIHRoZW1lQ29uZmlnOiB7fSxcbiAgbWFya2Rvd246IHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBsZXZlbDogWzEsIDIsIDNdXG4gICAgfSxcbiAgICBjb25maWc6IG1kID0+IG1hcmtkb3duUGx1Z2luKG1kKVxuICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWdcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2ppdXJhbi9wcm9qZWN0cy9ib2xlLWRlc2lnbi93ZWIvZG9jcy8udml0ZXByZXNzL2NvbmZpZ3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qaXVyYW4vcHJvamVjdHMvYm9sZS1kZXNpZ24vd2ViL2RvY3MvLnZpdGVwcmVzcy9jb25maWdzL2hlYWQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ppdXJhbi9wcm9qZWN0cy9ib2xlLWRlc2lnbi93ZWIvZG9jcy8udml0ZXByZXNzL2NvbmZpZ3MvaGVhZC50c1wiO2ltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgdHlwZSB7IEhlYWRDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXG5pbXBvcnQgeyB2cFJvb3QgfSBmcm9tICdAcGFuZGEtdWkvaW50ZXJuYWwnXG5cbmNvbnN0IGhlYWQ6IEhlYWRDb25maWdbXSA9IFtcbiAgWydzY3JpcHQnLCB7fSwgZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZSh2cFJvb3QsICcuL3Byb2plY3QuanMnKSwgJ3V0Zi04JyldXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2ppdXJhbi9wcm9qZWN0cy9ib2xlLWRlc2lnbi93ZWIvZG9jcy8udml0ZXByZXNzL2NvbmZpZ3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qaXVyYW4vcHJvamVjdHMvYm9sZS1kZXNpZ24vd2ViL2RvY3MvLnZpdGVwcmVzcy9jb25maWdzL215TWFya2Rvd24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ppdXJhbi9wcm9qZWN0cy9ib2xlLWRlc2lnbi93ZWIvZG9jcy8udml0ZXByZXNzL2NvbmZpZ3MvbXlNYXJrZG93bi50c1wiO2ltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCdcbmltcG9ydCBtZENvbnRhaW5lciBmcm9tICdtYXJrZG93bi1pdC1jb250YWluZXInXG5pbXBvcnQgdHlwZSBUb2tlbiBmcm9tICdtYXJrZG93bi1pdC9saWIvdG9rZW4nXG5pbXBvcnQgeyBkb2NSb290IH0gZnJvbSAnQHBhbmRhLXVpL2ludGVybmFsJ1xuaW1wb3J0IHsgaGlnaGxpZ2h0IH0gZnJvbSAnLi4vdXRpbHMvaGlnaGxpZ2h0J1xuXG5jb25zdCBsb2NhbE1kID0gTWFya2Rvd25JdCgpXG5cbmNvbnN0IGRlbW9SZXggPSAvXmRlbW9cXHMqKC4qKSQvXG5cbmV4cG9ydCBjb25zdCBtYXJrZG93blBsdWdpbiA9IChtZDogTWFya2Rvd25JdCkgPT4ge1xuICBtZC51c2UobWRDb250YWluZXIsICdkZW1vJywge1xuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAocGFyYW1zOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiAhIXBhcmFtcy50cmltKCkubWF0Y2goZGVtb1JleClcbiAgICB9LFxuXG4gICAgcmVuZGVyKHRva2VuczogVG9rZW5bXSwgaWR4OiBudW1iZXIsIHQ6IGFueSwgZW52OiBhbnkpIHtcbiAgICAgIGNvbnN0IG0gPSB0b2tlbnNbaWR4XS5pbmZvLnRyaW0oKS5tYXRjaChkZW1vUmV4KVxuICAgICAgY29uc3Qgc291cmNlRmlsZVRva2VuID0gdG9rZW5zW2lkeCArIDJdXG4gICAgICAvLyBjb25zdCBtZFBhdGggPSBlbnYucGF0aFxuICAgICAgLy8gY29uc3QgcHJvamVjdCA9IG1kUGF0aC5zcGxpdCgncHJvamVjdHMnKVsyXS5zcGxpdCgnLycpWzFdXG4gICAgICBjb25zdCBwcm9qZWN0ID0gJ3BhbmRhLXVpJ1xuXG4gICAgICBpZiAoIXByb2plY3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNYXJrIHN1cmUgdG8gcHV0IHlvdXIgbWQgaW4gcHJvamVjdHMgcGF0aGApXG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbnNbaWR4XS5uZXN0aW5nID09PSAxKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbSAmJiBtLmxlbmd0aCA+IDEgPyBtWzFdIDogJydcbiAgICAgICAgY29uc3Qgc291cmNlRmlsZVBhdGggPSBzb3VyY2VGaWxlVG9rZW4/LmNoaWxkcmVuPy5bMF0uY29udGVudCA/PyAnJ1xuXG4gICAgICAgIGxldCBjb2RlID0gJydcblxuICAgICAgICBpZiAoc291cmNlRmlsZVRva2VuPy50eXBlID09PSAnaW5saW5lJykge1xuICAgICAgICAgIGNvZGUgPSBmcy5yZWFkRmlsZVN5bmMoXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoZG9jUm9vdCwgYGRlbW9zLyR7cHJvamVjdH1gLCBgJHtzb3VyY2VGaWxlUGF0aH1gLCAnaW5kZXgudnVlJyksXG4gICAgICAgICAgICAndXRmLTgnXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgY29kZSA9IGhpZ2hsaWdodChjb2RlKVxuXG4gICAgICAgIHJldHVybiBgPERlbW8gXG5cdFx0XHRcdFx0OmRlbW9zPVwiZGVtb3NcIlxuXHRcdFx0XHRcdGRlc2M9XCIke2VuY29kZVVSSUNvbXBvbmVudChsb2NhbE1kLnJlbmRlcihkZXNjcmlwdGlvbikpfVwiXG5cdFx0XHRcdFx0cGF0aD1cIiR7c291cmNlRmlsZVBhdGh9XCJcblx0XHRcdFx0XHRzb3VyY2U9XCIke2VuY29kZVVSSUNvbXBvbmVudChjb2RlKX1cIlxuXHRcdFx0XHQ+YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICc8L0RlbW8+J1xuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2ppdXJhbi9wcm9qZWN0cy9ib2xlLWRlc2lnbi93ZWIvZG9jcy8udml0ZXByZXNzL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaml1cmFuL3Byb2plY3RzL2JvbGUtZGVzaWduL3dlYi9kb2NzLy52aXRlcHJlc3MvdXRpbHMvaGlnaGxpZ2h0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qaXVyYW4vcHJvamVjdHMvYm9sZS1kZXNpZ24vd2ViL2RvY3MvLnZpdGVwcmVzcy91dGlscy9oaWdobGlnaHQudHNcIjtpbXBvcnQgeyBnZXRIaWdobGlnaHRlciB9IGZyb20gJ3NoaWtpJ1xuXG5jb25zdCBoaWdobGlnaHRlciA9IGF3YWl0IGdldEhpZ2hsaWdodGVyKHtcbiAgdGhlbWVzOiBbJ21hdGVyaWFsLXRoZW1lLXBhbGVuaWdodCddLFxuICBsYW5nczogWydqYXZhc2NyaXB0JywgJ3Z1ZSddXG59KVxuXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKHN0cjogc3RyaW5nKSA9PiB7XG4gIHN0ciA9IGhpZ2hsaWdodGVyLmNvZGVUb0h0bWwoc3RyLCB7IGxhbmc6ICd2dWUnIH0pXG4gIHJldHVybiBzdHJcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFUsU0FBUyxvQkFBb0I7OztBQ0FULE9BQU8sUUFBUTtBQUM3VyxPQUFPLFVBQVU7QUFFakIsU0FBUyxjQUFjO0FBRXZCLElBQU0sT0FBcUI7QUFBQSxFQUN6QixDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsYUFBYSxLQUFLLFFBQVEsUUFBUSxjQUFjLEdBQUcsT0FBTyxDQUFDO0FBQy9FO0FBRUEsSUFBTyxlQUFROzs7QUNUMlYsT0FBT0EsU0FBUTtBQUN6WCxPQUFPQyxXQUFVO0FBQ2pCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8saUJBQWlCO0FBRXhCLFNBQVMsZUFBZTs7O0FDTDBVLFNBQVMsc0JBQXNCO0FBRWpZLElBQU0sY0FBYyxNQUFNLGVBQWU7QUFBQSxFQUN2QyxRQUFRLENBQUMsMEJBQTBCO0FBQUEsRUFDbkMsT0FBTyxDQUFDLGNBQWMsS0FBSztBQUM3QixDQUFDO0FBRU0sSUFBTSxZQUFZLENBQUMsUUFBZ0I7QUFDeEMsUUFBTSxZQUFZLFdBQVcsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELFNBQU87QUFDVDs7O0FERkEsSUFBTSxVQUFVLFdBQVc7QUFFM0IsSUFBTSxVQUFVO0FBRVQsSUFBTSxpQkFBaUIsQ0FBQyxPQUFtQjtBQUNoRCxLQUFHLElBQUksYUFBYSxRQUFRO0FBQUEsSUFDMUIsVUFBVSxTQUFVLFFBQWdCO0FBQ2xDLGFBQU8sQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLE1BQU0sT0FBTztBQUFBLElBQ3RDO0FBQUEsSUFFQSxPQUFPLFFBQWlCLEtBQWEsR0FBUSxLQUFVO0FBbEIzRDtBQW1CTSxZQUFNLElBQUksT0FBTyxHQUFHLEVBQUUsS0FBSyxLQUFLLEVBQUUsTUFBTSxPQUFPO0FBQy9DLFlBQU0sa0JBQWtCLE9BQU8sTUFBTSxDQUFDO0FBR3RDLFlBQU0sVUFBVTtBQUVoQixVQUFJLENBQUMsU0FBUztBQUNaLGNBQU0sSUFBSSxNQUFNLDJDQUEyQztBQUFBLE1BQzdEO0FBRUEsVUFBSSxPQUFPLEdBQUcsRUFBRSxZQUFZLEdBQUc7QUFDN0IsY0FBTSxjQUFjLEtBQUssRUFBRSxTQUFTLElBQUksRUFBRSxDQUFDLElBQUk7QUFDL0MsY0FBTSxtQkFBaUIsd0RBQWlCLGFBQWpCLG1CQUE0QixHQUFHLFlBQVc7QUFFakUsWUFBSSxPQUFPO0FBRVgsYUFBSSxtREFBaUIsVUFBUyxVQUFVO0FBQ3RDLGlCQUFPQyxJQUFHO0FBQUEsWUFDUkMsTUFBSyxRQUFRLFNBQVMsU0FBUyxPQUFPLElBQUksR0FBRyxjQUFjLElBQUksV0FBVztBQUFBLFlBQzFFO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxlQUFPLFVBQVUsSUFBSTtBQUVyQixlQUFPO0FBQUE7QUFBQSxhQUVGLG1CQUFtQixRQUFRLE9BQU8sV0FBVyxDQUFDLENBQUM7QUFBQSxhQUMvQyxjQUFjO0FBQUEsZUFDWixtQkFBbUIsSUFBSSxDQUFDO0FBQUE7QUFBQSxNQUVqQyxPQUFPO0FBQ0wsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7OztBRmhEQSxJQUFNLFNBQVMsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxFQUNQLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxFQUNiO0FBQUEsRUFDQSxhQUFhO0FBQUEsRUFDYixhQUFhLENBQUM7QUFBQSxFQUNkLFVBQVU7QUFBQSxJQUNSLFNBQVM7QUFBQSxNQUNQLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQ2pCO0FBQUEsSUFDQSxRQUFRLFFBQU0sZUFBZSxFQUFFO0FBQUEsRUFDakM7QUFDRixDQUFDO0FBRUQsSUFBTyxpQkFBUTsiLAogICJuYW1lcyI6IFsiZnMiLCAicGF0aCIsICJmcyIsICJwYXRoIl0KfQo=

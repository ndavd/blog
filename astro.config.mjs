// @ts-check
import { defineConfig } from "astro/config";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";
import { unified } from "@astrojs/markdown-remark";

export default defineConfig({
  site: "https://blog.ndavd.com",
  integrations: [],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathjax],
    }),
  },
});

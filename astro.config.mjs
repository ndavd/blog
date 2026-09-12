// @ts-check

import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";

export default defineConfig({
  site: "https://blog.ndavd.com",
  integrations: [],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathjax, rehypeGithubAlerts],
    }),
  },
});

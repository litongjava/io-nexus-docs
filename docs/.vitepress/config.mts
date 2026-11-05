import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineConfig } from "vitepress";
import { generateLlms, pathOfSource } from "./llms.js";

const siteUrl = "https://io.nexus";
const siteName = "io.nexus";
const siteDescription = "io-nexus 的开源项目：Java 高性能 Web 框架、数据库工具、大模型客户端与 AI 浏览器服务";
const srcRoot = resolve(import.meta.dirname, "..");
const excerptOf = (source: string) => {
  try {
    return readFileSync(join(srcRoot, source), "utf8")
      .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
      .replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, " ")
      .replace(/^\s*#\s+.*$/m, " ")
      .replace(/!?(\[[^\]]*\])\([^)]*\)/g, "$1").replace(/<[^>]+>/g, " ")
      .replace(/\[\[toc\]\]/g, " ").replace(/[#>*_\[\]`|]/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  } catch { return ""; }
};

export default defineConfig({
  lang: "zh-CN",
  title: siteName,
  description: siteDescription,
  cleanUrls: true,
  lastUpdated: false,
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["meta", { name: "keywords", content: "io.nexus,io-nexus,开源项目,tio-boot,java-db,java-openai,Java Web 框架,AI 工具" }],
    ["meta", { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" }],
    ["meta", { property: "og:site_name", content: siteName }],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["link", { rel: "alternate", href: "/llms.txt", type: "text/plain", title: "LLMs.txt" }],
  ],
  sitemap: { hostname: "https://io.nexus" },
  transformPageData(pageData) {
    const url = siteUrl + encodeURI(pathOfSource(pageData.relativePath));
    const isHome = pageData.frontmatter.layout === "home";
    const title = isHome || !pageData.title ? siteName : `${pageData.title} | ${siteName}`;
    const description = pageData.frontmatter.description || (isHome ? "" : excerptOf(pageData.relativePath)) || siteDescription;
    pageData.description = description;
    (pageData.frontmatter.head ??= []).push(
      ["link", { rel: "canonical", href: url }],
      ["meta", { property: "og:type", content: isHome ? "website" : "article" }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { property: "og:image", content: `${siteUrl}/logo.png` }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
      ["script", { type: "application/ld+json" }, JSON.stringify({
        "@context": "https://schema.org",
        "@type": isHome ? "WebSite" : "TechArticle",
        [isHome ? "name" : "headline"]: title,
        description,
        url,
        inLanguage: "zh-CN",
      }).replaceAll("<", "\\u003c")],
    );
  },
  async buildEnd(siteConfig) {
    const sources = siteConfig.pages.map((p) => p.replaceAll("\\", "/"));
    await generateLlms({ srcDir: siteConfig.srcDir, outDir: siteConfig.outDir, sources, hostname: siteUrl, siteName, siteDescription });
  },
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "开源项目", link: "/projects" },
      { text: "Tio Boot 文档", link: "https://tio-boot.com/" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/litongjava" }],
    outline: { label: "本页目录" },
    docFooter: { prev: false, next: false },
    footer: { message: "MIT License", copyright: "Copyright © IO Nexus" },
  },
});

import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "io.nexus",
  description: "io-nexus 的开源项目：Java 高性能 Web 框架、数据库工具、大模型客户端与 AI 浏览器服务",
  cleanUrls: true,
  lastUpdated: false,
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  sitemap: { hostname: "https://io.nexus" },
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

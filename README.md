# io-nexus-docs

[io.nexus](https://io.nexus/) 的站点源码，介绍 io-nexus 的开源项目并提供项目和文档链接。

## 本地开发

```bash
pnpm install
pnpm docs:dev
```

## 构建

```bash
pnpm docs:build
```

构建产物位于 `docs/.vitepress/dist`。

## 部署

推送到 `main` 分支后，Cloudflare Pages 会自动构建并发布。

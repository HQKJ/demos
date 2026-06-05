# DTC Prototype Demos

用于沉淀 DTC 需求原型的 GitHub Pages 项目。根路径是原型目录，不同路由对应不同 demo。

## 本地运行

```bash
npm install
npm run dev
```

## 路由

- `/`：原型目录
- `/return-exchange`：退换货原型

## 新增原型

1. 在 `src/demos` 下新增原型组件。
2. 在 `src/demoRegistry.tsx` 里注册标题、描述、路径和组件。
3. 运行 `npm run build` 确认可以正常构建。

## GitHub Pages

推送到 `main` 分支后，`.github/workflows/pages.yml` 会自动构建并发布到 GitHub Pages。仓库 Pages Source 请选择 `GitHub Actions`。

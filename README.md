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

## 代码结构

- `src/app`：外层应用壳、目录页、路由配置
- `src/demos/<demo-name>`：每个原型自己的页面、数据、状态和组件
- `src/shared`：跨 demo 复用的组件或工具
- `src/styles`：全局样式入口和主题样式

## 新增原型

1. 在 `src/demos/<demo-name>` 下新增原型模块。
2. 模块默认导出 demo 组件，例如 `src/demos/<demo-name>/index.tsx`。
3. 在 `src/app/routes/demoRegistry.tsx` 中注册标题、描述、路由和懒加载入口。
4. 运行 `npm run build` 确认可正常构建。

## GitHub Pages

推送到 `main` 分支后，`.github/workflows/pages.yml` 会自动构建并发布到 GitHub Pages。仓库 Pages Source 请选择 `GitHub Actions`。

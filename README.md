# fun-page-404 — 毛の博客创意 404 页

面向 **[毛の博客](https://blog.huchao.vip/)**（My-Firefly-Blog）的全屏动效 404 错误页。页面以橙色渐变背景、巨型背景「404」、居中狐狸循环视频与侧滑菜单为核心视觉。

本仓库为 **独立 Vite + React 原型**，便于预览与迭代；后续可集成进 Astro 博客替换 `src/pages/404.astro`。

---

## 项目介绍

- 全屏橙色渐变背景（`#FF8233` → `#FDAC55`）
- 背景层巨型「404」随视口高度自适应拉伸
- 居中 **3D 狐狸循环视频**（`mix-blend-darken` 与橙色背景融合）
- 顶部导航 + 移动端侧滑菜单
- 底部双 CTA：返回首页 / 浏览博客
- 站点信息集中在 `src/site-config.ts`，集成时改一处即可

---

## 居中狐狸角色说明

### 是图片还是代码？

**都不是本地资源，也不是 CSS/SVG 画出来的。**

狐狸是一个 **预渲染好的 3D 循环视频（`.mp4`）**，通过 `<video>` 标签播放，再用 CSS 混合模式与橙色背景融合。

| 项目 | 说明 |
|------|------|
| 素材类型 | 外部 MP4 视频（3D 角色动画） |
| 配置位置 | `src/site-config.ts` → `heroVideoSrc` |
| 渲染位置 | `src/App.tsx` → `<video autoPlay loop muted playsInline>` |
| 融合方式 | `mix-blend-darken` + 橙色渐变背景 + 白色背景椭圆 |

### 配置入口

```ts
// src/site-config.ts
heroVideoSrc:
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4",
```

### 页面渲染代码

```tsx
// src/App.tsx（节选）
<video
  autoPlay
  loop
  muted
  playsInline
  className="pointer-events-none h-full w-full object-contain mix-blend-darken"
  src={heroVideoSrc}
/>
```

### 为什么用 `mix-blend-darken`？

视频本身带暖色/浅色背景。在 **橙色页面渐变** 上使用 `mix-blend-darken`，可以让视频背景与页面背景自然融合，只保留狐狸角色主体。

> 该视频非透明底，与博客蓝色主题难以完全兼容；当前保留原橙色整页方案以保证狐狸显示效果。

### 如何替换狐狸素材

**方式 1：换远程视频 URL**

```ts
heroVideoSrc: "https://你的域名/fox.mp4",
```

**方式 2：使用本地视频**

1. 将 MP4 放入 `public/`，例如 `public/fox.mp4`
2. 配置改为：

```ts
heroVideoSrc: "/fox.mp4",
```

**方式 3：改用静态图片（无动画）**

在 `App.tsx` 把 `<video>` 换成 `<img src="..." alt="404 角色" />`，并视情况调整 `mix-blend-*` 或去掉混合模式。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 |
| 构建 | Vite 8 |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 3 |
| 图标 | lucide-react |
| 字体 | Inter（Google Fonts） |

---

## 快速开始

```bash
cd fun-page-404
npm install
npm run dev      # http://localhost:5173
npm run build    # 输出 dist/
npm run preview
```

---

## 项目结构

```
fun-page-404/
├── index.html
├── package.json
├── README.md
├── public/               # 可放本地 fox.mp4 等资源
└── src/
    ├── main.tsx
    ├── App.tsx           # 404 页面主组件（含 <video> 渲染）
    ├── site-config.ts    # ★ 站点名、颜色、导航、Logo、狐狸视频 URL
    └── index.css         # Tailwind + 全局样式
```

---

## 站点配置（`site-config.ts`）

| 字段 | 当前值 | 说明 |
|------|--------|------|
| `title` | 毛 | 导航 Logo 主标题 |
| `subtitle` | 毛の博客 | 副标题 |
| `logo.src` | 头像 URL | 与博客 `siteConfig.navbar.logo` 对齐 |
| `colors.gradientTop/Bottom` | `#FF8233` → `#FDAC55` | 页面背景渐变 |
| `colors.accent` | `#F16524` | 按钮 / 菜单强调色 |
| `heroVideoSrc` | CloudFront MP4 URL | **居中狐狸视频地址** |
| `navLinks` | 主页 / 博客 / 归档 / 分类 / 关于 | 与博客路由对齐 |

---

## 中文文案

| 位置 | 文案 |
|------|------|
| 页面标题 | 404 - 页面未找到 \| 毛の博客 |
| 主提示 | 这一页好像飘到星海之外了… |
| 副提示 | 链接可能已失效，或页面从未存在过。不如先回首页看看？ |
| 主 CTA | 返回首页 |
| 次 CTA | 浏览博客 |

---

## 集成到 My-Firefly-Blog

博客当前 404 页：`My-Firefly-Blog/src/pages/404.astro`（卡片式，嵌在 MainGridLayout 内）。

### 方案 A：React 岛（推荐）

1. 将 `App.tsx` / `site-config.ts` 迁入博客，例如 `src/components/pages/Fun404Page.tsx`
2. 新建或替换 `404.astro`：

```astro
---
import Fun404Page from "@/components/pages/Fun404Page";
---
<Fun404Page client:load />
```

3. 404 页**不要**包 `MainGridLayout`，保持全屏
4. 导航链接已指向 `/blog/`、`/archive/` 等，与博客路由一致
5. 狐狸视频可继续用远程 URL，或下载后放入博客 `public/` 目录

### 方案 B：静态构建嵌入

1. 在本仓库 `npm run build`
2. 将 `dist/` 资源复制到博客 `public/404-app/`
3. 在 `404.astro` 用 iframe 或内联挂载（维护成本较高，一般不推荐）

### 集成检查清单

- [ ] `site-config.ts` 与 `siteConfig.ts` 标题 / Logo / URL 同步
- [ ] 导航 href 与 `navBarConfig.ts` / `link-presets.ts` 一致
- [ ] `heroVideoSrc` 在生产环境可访问（或改为本地 `/fox.mp4`）
- [ ] 生产环境头像 URL 使用 HTTPS（当前为 `http://img.huchao.vip/...`）

---

## 改造教程

### 换配色

编辑 `src/site-config.ts` 的 `colors` 对象。注意：若改背景色，狐狸视频的 `mix-blend-darken` 融合效果可能需要一并调整。

### 换 Logo / 品牌名

修改 `site-config.ts` 的 `title`、`subtitle`、`logo`。

### 换导航

修改 `navLinks` 数组，href 与博客实际路由保持一致。

### 换狐狸视频

只改 `heroVideoSrc` 即可，无需动 `App.tsx`（除非要改布局或混合模式）。

---

## 部署

独立部署：构建 `dist/` 后上传任意静态托管。

作为博客 404：按上方「方案 A」集成后，由 Astro 构建流程统一输出。

---

## 许可

示例项目，可自由用于个人博客二次开发。

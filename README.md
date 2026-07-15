# TinyTrails 404 页面

面向儿童教育品牌 **TinyTrails** 的创意 404 错误页。页面以橙色渐变背景、巨型「404」文字、居中透明视频与侧滑菜单为核心视觉，适合作为独立静态页或嵌入主站的自定义 404 路由。

## 项目介绍

本仓库是一个单页 React 应用，复刻 TinyTrails 风格的 404 体验：

- 全屏橙色渐变背景，营造温暖、活泼的品牌氛围
- 背景层巨型「404」随视口高度自适应拉伸
- 居中循环播放的透明背景视频（`mix-blend-darken` 与背景融合）
- 桌面端顶部导航 + 移动端侧滑菜单
- 底部主提示与「返回首页」CTA

所有面向用户的文案已本地化为简体中文，品牌名 **TinyTrails** 保持英文不变。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 |
| 构建 | Vite 8 |
| 语言 | TypeScript 6 |
| 样式 | Tailwind CSS 3 |
| 图标 | lucide-react |
| 字体 | Inter（Google Fonts） |

## 快速开始

### 环境要求

- Node.js 18+
- npm（或 pnpm / yarn）

### 安装与运行

```bash
# 进入项目目录
cd fun-page-404

# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

### 其他命令

```bash
npm run lint   # 使用 oxlint 检查代码
```

## 项目结构

```
fun-page-404/
├── index.html          # HTML 入口，含页面 title 与字体引用
├── package.json        # 依赖与脚本
├── vite.config.ts      # Vite 配置
├── tailwind.config.js  # Tailwind 内容扫描与字体扩展
├── postcss.config.js   # PostCSS（Tailwind + Autoprefixer）
├── public/
│   └── favicon.svg     # 站点图标
└── src/
    ├── main.tsx        # React 挂载入口
    ├── App.tsx         # 404 页面主组件（文案、布局、交互）
    └── index.css       # Tailwind 指令与全局样式
```

构建产物输出至 `dist/` 目录。

## 页面结构说明

页面由 `App.tsx` 中的多个绝对/相对定位层叠组成，自下而上大致为：

```
┌─────────────────────────────────────────┐
│  导航栏（Logo + 桌面链接 / 菜单按钮）      │  z-20
├─────────────────────────────────────────┤
│                                         │
│     背景「404」文字 + 白色椭圆遮罩         │  绝对定位，pointer-events-none
│                                         │
│     居中透明视频（autoPlay / loop）        │  绝对定位，mix-blend-darken
│                                         │
├─────────────────────────────────────────┤
│  底部：主提示「哎呀，页面走丢了！」         │  z-30
│        CTA「返回首页」                    │
└─────────────────────────────────────────┘

移动端菜单（z-50）：右侧滑入面板 + 半透明遮罩
```

### 响应式行为

- **md 及以上**：顶部横向展示全部导航链接，隐藏「菜单」按钮文字区域仍保留图标按钮逻辑（按钮在 md 以下显示）
- **md 以下**：导航链接收进侧滑菜单，点击遮罩或关闭按钮可收起
- **404 背景字**：通过 `resize` 监听动态计算 `scaleY`，使巨型数字随视口高度拉伸

## 中文文案对照

| 位置 | 英文（原版） | 中文（当前） |
|------|-------------|-------------|
| 页面 title | 404 - Page Not Found | 404 - 页面未找到 |
| 导航 | About Us | 关于我们 |
| 导航 | Programs | 课程活动 |
| 导航 | Reviews | 用户评价 |
| 导航 | FAQ | 常见问题 |
| 导航 | Contacts | 联系我们 |
| 菜单按钮 | Menu | 菜单 |
| aria-label（打开） | Open menu | 打开菜单 |
| aria-label（关闭） | Close menu | 关闭菜单 |
| 主提示 | Oops, something went wrong! | 哎呀，页面走丢了！ |
| CTA | Back to Home | 返回首页 |
| 品牌名 | TinyTrails | TinyTrails（不变） |

导航链接锚点：

| 中文标签 | href |
|---------|------|
| 关于我们 | `#about` |
| 课程活动 | `#programs` |
| 用户评价 | `#reviews` |
| 常见问题 | `#faq` |
| 联系我们 | `#contacts` |

## 改造教程

### 改颜色

主色分布在 `src/App.tsx` 的内联样式与 Tailwind 类名中：

| 用途 | 当前值 | 修改位置 |
|------|--------|---------|
| 页面背景渐变 | `#FF8233` → `#FDAC55` | 根容器 `style.background` |
| 主按钮 / 导航强调色 | `#F16524` | 菜单按钮、底部 CTA、`text-[#F16524]` |
| 侧滑菜单渐变 | `#FF6B1A` → `#FF9642` | 移动端面板 `style.background` |
| 404 文字 / 椭圆 | `#FFFFFF` | 背景层 span 与 div |

建议一次性替换上述色值，或在 `tailwind.config.js` 的 `theme.extend.colors` 中定义品牌色后改用 Tailwind 类，便于统一管理。

### 改品牌名

1. 修改 `Logo` 组件内的 `<span>TinyTrails</span>` 文本
2. 如需替换 Logo 图形，调整 `Logo` 中四个圆点的布局，或改为 `<img>` / SVG
3. 同步更新 `index.html` 的 `<title>` 与 `README.md` 中的品牌描述

### 改视频

在 `src/App.tsx` 顶部修改常量：

```tsx
const VIDEO_SRC = "https://your-cdn.com/your-video.mp4";
```

建议：

- 使用带透明通道的 WebM / MP4，或深色主体 + `mix-blend-darken` 可与橙色背景自然融合
- 视频体积控制在 1–3 MB 以内，避免 404 页加载过慢
- 也可将文件放入 `public/videos/hero.mp4`，改为 `src="/videos/hero.mp4"`

`<video>` 已设置 `autoPlay`、`loop`、`muted`、`playsInline`，满足移动端自动播放策略。

### 改链接

**导航链接**：编辑 `NAV_LINKS` 数组：

```tsx
const NAV_LINKS = [
  { label: "关于我们", href: "#about" },
  // 可改为绝对路径，如 href: "https://example.com/about"
] as const;
```

**返回首页**：搜索 `href="/"`，改为你的主站地址，例如：

```tsx
<a href="https://tinytrails.com/">返回首页</a>
```

若部署在子路径（如 `/404/`），建议使用环境变量或在 `vite.config.ts` 中设置 `base`，并将首页链接写为相对路径或完整 URL。

## 核心实现速览

### 404 背景自适应拉伸

```tsx
const updateScaleY = useCallback(() => {
  const el = text404Ref.current;
  if (!el) return;
  const height = el.offsetHeight;
  if (height <= 0) return;
  setScaleY(window.innerHeight / height);
}, []);
```

监听 `window.resize`，将 `scaleY` 应用于 404 文字与白色椭圆的 `transform`，实现全屏高度填充效果。

### 渐变遮罩

背景 404 层使用 CSS `mask-image` 线性渐变，使下方文字在接近底部时自然淡出，避免与底部 CTA 争抢视觉焦点。

### 移动端菜单

- `menuOpen` 状态控制侧滑面板 `translate-x` 与链接项 stagger 动画（`transitionDelay`）
- 菜单打开时通过 `document.body.style.overflow = "hidden"` 禁止背景滚动
- 遮罩点击、关闭按钮、链接点击均可关闭菜单

### 视频混合模式

```tsx
className="... mix-blend-darken"
```

使视频暗部与橙色背景融合，亮部/透明区域保留背景色，形成「角色浮在 404 页面上」的效果。

## 部署建议

### 静态托管（推荐）

本项目为纯前端 SPA，构建后 `dist/` 可直接部署至：

- **Vercel / Netlify / Cloudflare Pages**：连接 Git 仓库，构建命令 `npm run build`，输出目录 `dist`
- **Nginx / OSS / GitHub Pages**：上传 `dist` 内容，并配置 404 回退

### 作为站点 404 页

| 平台 | 配置方式 |
|------|---------|
| Nginx | `error_page 404 /404/index.html;` 并将构建产物置于对应路径 |
| Vercel | 在项目根目录添加 `vercel.json`，将 `routes` 中 404 指向该页面 |
| Cloudflare Pages | `_redirects` 文件：`/* /index.html 200`（SPA）；404 页可单独部署为 `/404` |
| GitHub Pages | 使用 `404.html`（可将 `dist/index.html` 重命名或复制为 `404.html`） |

### 注意事项

1. **视频 CDN**：确保 `VIDEO_SRC` 域名允许跨域访问，且 HTTPS 可用
2. **首页链接**：生产环境请将 `href="/"` 改为主站真实地址
3. **锚点链接**：当前 `#about` 等锚点指向本页片段；若主站有对应区块，可改为 `https://主站/#about`
4. **base 路径**：若不在域名根目录部署，在 `vite.config.ts` 设置 `base: '/your-subpath/'`

---

如有问题或定制需求，可在本仓库提 Issue 或 Fork 后按上述教程自行改造。

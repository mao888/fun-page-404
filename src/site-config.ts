/** 站点配置 — 集成到 My-Firefly-Blog 时只需改这一处 */
export const siteConfig = {
	title: "毛",
	subtitle: "毛の博客",
	siteUrl: "https://blog.huchao.vip/",
	logo: {
		src: "http://img.huchao.vip/file/avatar/1781196966048_靓.png",
		alt: "毛",
	},
	colors: {
		gradientTop: "#FF8233",
		gradientBottom: "#FDAC55",
		accent: "#F16524",
		menuGradientStart: "#FF6B1A",
		menuGradientEnd: "#FF9642",
	},
	heroVideoSrc:
		"https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4",
	navLinks: [
		{ label: "主页", href: "/" },
		{ label: "博客", href: "/blog/" },
		{ label: "归档", href: "/archive/" },
		{ label: "分类", href: "/categories/" },
		{ label: "关于", href: "/about/" },
	] as const,
} as const;

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import { siteConfig } from "./site-config";

const { colors, navLinks, logo, title, subtitle, heroVideoSrc } = siteConfig;

function Logo() {
	return (
		<a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
			<img
				src={logo.src}
				alt={logo.alt}
				className="h-8 w-8 rounded-full border border-white/30 object-cover sm:h-9 sm:w-9"
			/>
			<div className="flex flex-col leading-tight">
				<span className="text-base font-bold text-white sm:text-lg">{title}</span>
				<span className="hidden text-xs text-white/60 sm:block">{subtitle}</span>
			</div>
		</a>
	);
}

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scaleY, setScaleY] = useState(1);
	const text404Ref = useRef<HTMLSpanElement>(null);

	const updateScaleY = useCallback(() => {
		const el = text404Ref.current;
		if (!el) return;
		const height = el.offsetHeight;
		if (height <= 0) return;
		setScaleY(window.innerHeight / height);
	}, []);

	useEffect(() => {
		updateScaleY();
		window.addEventListener("resize", updateScaleY);
		return () => window.removeEventListener("resize", updateScaleY);
	}, [updateScaleY]);

	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [menuOpen]);

	return (
		<div
			className="flex h-screen w-full flex-col overflow-hidden"
			style={{
				background: `linear-gradient(to bottom, ${colors.gradientTop}, ${colors.gradientBottom})`,
			}}
		>
			{/* 背景「404」层 */}
			<div
				className="pointer-events-none absolute inset-0 flex items-center justify-center"
				style={{
					opacity: 0.8,
					WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
					maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
				}}
			>
				<div className="relative flex items-center justify-center">
					<span
						ref={text404Ref}
						className="whitespace-nowrap font-black leading-none tracking-tighter text-[#FFFFFF]"
						style={{
							fontSize: "clamp(200px, 48vw, 800px)",
							transform: `scale(1.15, ${scaleY * 1.4})`,
						}}
					>
						404
					</span>
					<div
						className="absolute h-[22vh] w-[clamp(120px,20vw,400px)] rounded-full bg-[#FFFFFF] sm:h-[26vh] md:h-[50vh]"
						style={{
							transform: `scaleY(${scaleY})`,
							transformOrigin: "center",
						}}
					/>
				</div>
			</div>

			{/* 导航栏 */}
			<nav className="relative z-20 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-12">
				<Logo />

				<div className="hidden gap-1 md:flex">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#F16524] transition-colors hover:opacity-90"
						>
							{link.label}
						</a>
					))}
				</div>

				<button
					type="button"
					onClick={() => setMenuOpen(true)}
					className="flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors hover:opacity-90 sm:px-5 sm:py-2.5"
					style={{ backgroundColor: colors.accent }}
					aria-label="打开菜单"
				>
					<Menu className="h-4 w-4" />
					<span className="hidden text-sm font-medium sm:inline">菜单</span>
				</button>
			</nav>

			{/* 移动端菜单遮罩 */}
			<div
				className={`fixed inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
					menuOpen ? "visible" : "pointer-events-none invisible"
				}`}
				aria-hidden={!menuOpen}
			>
				<div
					className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
						menuOpen ? "opacity-100" : "opacity-0"
					}`}
					onClick={() => setMenuOpen(false)}
				/>

				<div
					className={`absolute right-0 top-0 h-full w-full sm:w-[380px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
						menuOpen ? "translate-x-0" : "translate-x-full"
					}`}
					style={{
						background: `linear-gradient(135deg, ${colors.menuGradientStart} 0%, ${colors.menuGradientEnd} 100%)`,
					}}
				>
					<div className="flex items-center justify-between p-6">
						<Logo />
						<button
							type="button"
							onClick={() => setMenuOpen(false)}
							className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
							aria-label="关闭菜单"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					<nav className="flex flex-col gap-2 px-4 pt-4">
						{navLinks.map((link, i) => (
							<a
								key={link.href}
								href={link.href}
								onClick={() => setMenuOpen(false)}
								className={`rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 ${
									menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
								}`}
								style={{
									transitionDelay: menuOpen ? `${150 + i * 60}ms` : "0ms",
								}}
							>
								{link.label}
							</a>
						))}
					</nav>

					<div className="absolute bottom-0 left-0 right-0 p-6">
						<a
							href="/"
							className={`flex w-full items-center justify-center gap-2 rounded-full bg-white/95 py-4 text-base font-semibold transition-all duration-300 hover:scale-[1.02] ${
								menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
							}`}
							style={{
								color: colors.accent,
								transitionDelay: menuOpen ? "450ms" : "0ms",
							}}
						>
							<ArrowLeft className="h-5 w-5" />
							返回首页
						</a>
					</div>
				</div>
			</div>

			{/* 居中狐狸视频（原实现） */}
			<div
				className="pointer-events-none absolute inset-0 flex items-center justify-center"
				style={{ marginTop: "calc(-6vh - 40px)" }}
			>
				<div className="h-[85vh] w-[120vw] sm:h-[70vh] sm:w-[70vw] md:h-[78vh] md:w-[62vw]">
					<video
						autoPlay
						loop
						muted
						playsInline
						className="pointer-events-none h-full w-full object-contain mix-blend-darken"
						src={heroVideoSrc}
					/>
				</div>
			</div>

			{/* 底部内容区 */}
			<div className="relative z-30 mt-auto flex flex-col items-center px-4 pb-8 text-center sm:pb-16">
				<h1 className="mb-2 text-lg font-medium text-white sm:mb-3 sm:text-xl md:text-2xl">
					这一页好像飘到星海之外了…
				</h1>
				<p className="mb-4 max-w-md text-sm text-white/70 sm:mb-5 sm:text-base">
					链接可能已失效，或页面从未存在过。不如先回首页看看？
				</p>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<a
						href="/"
						className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg sm:px-8 sm:py-4 sm:text-base"
						style={{ backgroundColor: colors.accent }}
					>
						<ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
						返回首页
					</a>
					<a
						href="/blog/"
						className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:px-8 sm:py-4 sm:text-base"
					>
						浏览博客
					</a>
				</div>
			</div>
		</div>
	);
}

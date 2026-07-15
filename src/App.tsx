import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";

const NAV_LINKS = [
	{ label: "关于我们", href: "#about" },
	{ label: "课程活动", href: "#programs" },
	{ label: "用户评价", href: "#reviews" },
	{ label: "常见问题", href: "#faq" },
	{ label: "联系我们", href: "#contacts" },
] as const;

const VIDEO_SRC =
	"https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4";

function Logo() {
	return (
		<div className="flex items-center">
			<div className="grid grid-cols-2 gap-0.5">
				<div className="h-2.5 w-2.5 rounded-full bg-white sm:h-3 sm:w-3" />
				<div className="h-2.5 w-2.5 rounded-full bg-white sm:h-3 sm:w-3" />
				<div className="h-2.5 w-2.5 rounded-full bg-white sm:h-3 sm:w-3" />
				<div className="h-2.5 w-2.5 rounded-full bg-white sm:h-3 sm:w-3" />
			</div>
			<span className="ml-1 text-lg font-bold text-white sm:text-xl">TinyTrails</span>
		</div>
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
				background: "linear-gradient(to bottom, #FF8233, #FDAC55)",
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
						className="absolute rounded-full bg-[#FFFFFF] h-[22vh] w-[clamp(120px,20vw,400px)] sm:h-[26vh] md:h-[50vh]"
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
					{NAV_LINKS.map((link) => (
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
					style={{ backgroundColor: "#F16524" }}
					aria-label="打开菜单"
				>
					<Menu className="h-4 w-4" />
					<span className="hidden text-sm font-medium sm:inline">菜单</span>
				</button>
			</nav>

			{/* 移动端菜单遮罩 */}
			<div
				className={`fixed inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
					menuOpen ? "visible" : "invisible pointer-events-none"
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
						background: "linear-gradient(135deg, #FF6B1A 0%, #FF9642 100%)",
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
						{NAV_LINKS.map((link, i) => (
							<a
								key={link.href}
								href={link.href}
								onClick={() => setMenuOpen(false)}
								className={`rounded-2xl bg-white/10 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/20 ${
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
							className={`flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-base font-semibold text-[#F16524] transition-all duration-300 hover:scale-[1.02] ${
								menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
							}`}
							style={{
								transitionDelay: menuOpen ? "450ms" : "0ms",
							}}
						>
							<ArrowLeft className="h-5 w-5" />
							返回首页
						</a>
					</div>
				</div>
			</div>

			{/* 居中视频 */}
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
						src={VIDEO_SRC}
					/>
				</div>
			</div>

			{/* 底部内容区 */}
			<div className="relative z-30 mt-auto flex flex-col items-center px-4 pb-8 text-center sm:pb-16">
				<h1 className="mb-3 text-lg font-medium text-white sm:mb-4 sm:text-xl md:text-2xl">
					哎呀，页面走丢了！
				</h1>
				<a
					href="/"
					className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg sm:px-8 sm:py-4 sm:text-base"
					style={{ backgroundColor: "#F16524" }}
				>
					<ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
					返回首页
				</a>
			</div>
		</div>
	);
}

import React from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { Head, Link, useForm } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import { Menu, X, Send, Mail, ArrowUpRight } from 'lucide-react';
import FloatingContactButton from '@/Components/FloatingContactButton';

const LineIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
);

// ページ完全リロードでリセット、SPA内遷移では維持される
let hasPlayedAnimation = false;

const Seo = ({ title, description }) => {
    const siteName = "株式会社EverStreak";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDesc = "株式会社EverStreak（エバーストリーク）は、東京・渋谷を拠点に関東全域でイベント企画・運営、司会・MC、Web制作を手がけるクリエイティブチーム。人と人とのつながりから、新しい価値を創造します。";
    const desc = description || defaultDesc;

    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "株式会社EverStreak",
        "alternateName": ["エバーストリーク", "EverStreak"],
        "url": "https://everstreak.co.jp",
        "description": defaultDesc,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "広尾1-2-1 ヒカリビル4階",
            "addressLocality": "渋谷区",
            "addressRegion": "東京都",
            "postalCode": "150-0012",
            "addressCountry": "JP"
        },
        "areaServed": "関東地方",
        "sameAs": ["https://line.me/ti/p/@394hzlmj"]
    };

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={desc} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={desc} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:image" content="https://everstreak.co.jp/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content="https://everstreak.co.jp/og-image.png" />

            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+JP:wght@300;400;500&family=Noto+Serif+JP:wght@200;500&display=swap"
                rel="stylesheet"
            />

            <script type="application/ld+json">
                {JSON.stringify(organizationJsonLd)}
            </script>
        </Head>
    );
};

const OpeningAnimation = ({ onStartExit }) => (
    <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfdfe]"
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "circOut" } }}
    >
        <div className="relative w-full h-px flex items-center justify-center text-center px-4">
            <motion.div
                initial={{ width: 0, left: "-100%", opacity: 1 }}
                animate={{ width: ["0%", "100%", "0%"], left: ["-100%", "0%", "100%"] }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], times: [0, 0.5, 1] }}
                onAnimationComplete={onStartExit}
                className="absolute h-[2px] bg-[#ff6b00] shadow-[0_0_20px_#c46a3a]"
            />

            <motion.h1
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: [0, 1, 1], scale: 1 }}
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
                className="text-[13vw] md:text-[7rem] font-medium text-slate-900 tracking-tighter"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
                EverStreak
            </motion.h1>
        </div>
    </motion.div>
);

export default function Welcome(props) {

    const { news = [] } = props;

    const categoryNames = {
        notice: 'お知らせ',
        update: '更新情報',
        event: 'イベント',
    };

    const [isOpening, setIsOpening] = useState(!hasPlayedAnimation);
    const [isWritingStarted, setIsWritingStarted] = useState(hasPlayedAnimation);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsSuccess(true);
            },
        });
    };

    const containerRef = useRef(null);
    const worksRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: containerRef });

    const { scrollYProgress: worksScroll } = useScroll({
        target: worksRef,
        offset: ["start end", "end start"]
    });

    const worksImgScale = useTransform(worksScroll, [0, 1], [1.15, 1]);
    const worksTextY = useTransform(worksScroll, [0, 1], [40, -40]);

    const introOpacity = useMotionValue(hasPlayedAnimation ? 1 : 0);
    const contentOpacity = useMotionValue(hasPlayedAnimation ? 1 : 0);
    const scrollEffectProgress = useMotionValue(hasPlayedAnimation ? 0.15 : 0);

    const smoothProgress = useSpring(scrollEffectProgress, {
        stiffness: 15,
        damping: 30
    });

    const headerBg = useTransform(
        scrollYProgress,
        [0, 0.05],
        ["rgba(253, 253, 254, 0)", "rgba(253, 253, 254, 0.95)"]
    );

    const bgColor = useTransform(
        smoothProgress,
        [0, 0.75],
        ['#ffd8bc', '#fdfdfe']
    );

    const bgLogoOpacity = useTransform(
        smoothProgress,
        [0, 0.8],
        [0.25, 0]
    );

    const bgLogoScale = useTransform(
        smoothProgress,
        [0, 1],
        [1, 1.05]
    );

    const startIntroSequence = () => {
        hasPlayedAnimation = true;
        setIsOpening(false);

        setTimeout(() => {
            setIsWritingStarted(true);
            animate(introOpacity, 1, { duration: 0.8 });
        }, 800);

        setTimeout(() => {
            animate(contentOpacity, 1, { duration: 1.2, ease: "easeOut" });
            animate(scrollEffectProgress, 0.15, { duration: 1.0, ease: "easeOut" });
        }, 2800);
    };

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (contentOpacity.get() > 0.1) {
                scrollEffectProgress.set(Math.max(0.15, v));
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    const works = [
        {
            id: 1,
            anchor: "event",
            title: "Event Planning & Operation",
            category: "イベント企画・運営",
            img: "/images/event.jpg"
        },
        {
            id: 2,
            anchor: "mc",
            title: "Professional MC Service",
            category: "司会・MC",
            img: "/images/mc.jpg"
        },
        {
            id: 3,
            anchor: "web",
            title: "Web Design & Maintenance",
            category: "WEB制作・運営・保守",
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
        },
    ];

    return (
        <div
            ref={containerRef}
            className="relative min-h-[550vh] overflow-x-hidden bg-[#fdfdfe] selection:bg-orange-100 text-slate-900 font-sans tracking-tight leading-relaxed antialiased"
            style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
        >

            <Seo
                title="ひとつの出会いが、景色を変えていく"
                description="株式会社EverStreak（エバーストリーク）は、東京・渋谷を拠点に関東全域でイベント企画・運営、司会・MC、Web制作を手がけるクリエイティブチーム。人と人とのつながりから、新しい価値を創造します。"
            />

            <motion.header
                style={{ backgroundColor: headerBg, backdropFilter: "blur(12px)" }}
                className="fixed top-0 w-full z-[80] px-6 py-6 md:px-10 flex justify-between items-center border-b border-slate-900/5"
            >
                <div
                    className="text-xl md:text-2xl font-medium tracking-tighter"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                    EverStreak
                </div>

                <nav
                    className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.2em] font-medium text-slate-400"
                    style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
                >
                    <a href="#philosophy" className="hover:text-[#ff6b00] transition-colors">Core Values</a>
                    <Link href="/about" className="hover:text-[#ff6b00] transition-colors">About</Link>
                    <a href="#news" className="hover:text-[#ff6b00] transition-colors">News</a>
                    <a href="#services" className="hover:text-[#ff6b00] transition-colors">Services</a>
                    <a href="#contact" className="hover:text-[#ff6b00] transition-colors">Contact</a>
                </nav>

                <button
                    className="p-2 md:hidden text-slate-900"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </motion.header>

            <AnimatePresence>
                {isOpening && (
                    <OpeningAnimation
                        onStartExit={startIntroSequence}
                        key="opening"
                    />
                )}
            </AnimatePresence>

            <motion.div
                style={{ backgroundColor: bgColor }}
                className="fixed inset-0 z-0 pointer-events-none"
            >
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                    }}
                />

                <motion.div
                    style={{ opacity: bgLogoOpacity, scale: bgLogoScale }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="relative text-center w-full px-6">
                        <motion.h2
                            className="text-[15vw] sm:text-[12vw] md:text-[7rem] lg:text-[8.5rem] text-white select-none tracking-[-0.04em]"
                            style={{
                                opacity: introOpacity,
                                fontFamily: "'Noto Serif JP', serif",
                                clipPath: isWritingStarted ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                                transition: 'clip-path 2.5s cubic-bezier(0.19, 1, 0.22, 1)'
                            }}
                        >
                            One connection
                            <br />
                            <span>changes everything.</span>
                        </motion.h2>
                    </div>
                </motion.div>
            </motion.div>

            <main
                className={`relative z-20 transition-opacity duration-1000 ${isOpening ? 'opacity-0' : 'opacity-1'}`}
            >

                <section className="h-screen flex flex-col items-center justify-center px-6">
                    <motion.div
                        style={{ opacity: contentOpacity }}
                        className="text-center"
                    >
                        <h1
                            className="text-[13vw] md:text-[7rem] lg:text-[8.5rem] font-medium text-slate-900 leading-[0.9] tracking-tighter"
                            style={{ fontFamily: "'Noto Serif JP', serif" }}
                        >
                            EverStreak
                        </h1>

                        <div className="w-12 h-px bg-slate-900/20 mx-auto mt-12 mb-8" />

                        <p className="text-xs md:text-lg tracking-[0.35em] text-slate-500 uppercase font-medium ml-[0.35em]">
                            One connection changes everything.
                        </p>
                    </motion.div>
                </section>

                <section
                    id="philosophy"
                    className="scroll-mt-40 pt-25 md:pt-24 pb-40 md:pb-[40vh] px-6 md:px-[15vw] flex flex-col justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        <span
                            className="text-[#ff6b00] text-[23px] tracking-[0.2em] font-bold uppercase mb-8 block"
                            style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
                        >
                            Core Values
                        </span>

                        <h2
                            className="text-2xl md:text-5xl lg:text-4xl font-extralight leading-[1.5] text-slate-900 mb-12 group cursor-default"
                            style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 500 }}
                        >
                            誰と出会うかで、
                            <br />
                            未来は変わっていく。
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 text-slate-900 leading-relaxed text-base md:text-[20px] font-light">
                            <p>
                                EverStreakは、人と人がありのままに響き合える体験をつくります。
                                ふとした出会いが「この人と一緒にやりたい」という確かな縁に変わる。
                                そうして集まったエネルギーが、少しずつ、でも確実に社会を動かしていく。
                            </p>
                            <p>
                                挑戦したい人のワクワクと、表現したい人のひらめき。
                                すべてが「つながり」という力で引き寄せられたとき、
                                まだ誰も見ていない新しい価値が生まれます。
                            </p>
                        </div>
                    </motion.div>
                </section>

                <section
                    id="news"
                    className="pb-80 md:pb-[60vh] py-32 px-6 md:px-[10vw] bg-slate-50/40"
                >
                    <div className="mx-auto">
                        <div className="flex justify-between items-baseline mb-12 border-b border-slate-900/10 pb-5">
                            <h2
                                className="text-3xl md:text-4xl font-medium tracking-tighter text-slate-900"
                                style={{ fontFamily: "'Noto Serif JP', serif" }}
                            >
                                News
                            </h2>
                        </div>

                        <div className="divide-y divide-slate-900/5">
                            {news.length > 0 ? (
                                news.slice(0, 5).map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/news/${item.id}`}
                                        className="group flex flex-col md:flex-row md:items-center py-6 md:py-8 gap-3 md:gap-12 cursor-pointer relative"
                                    >
                                        <div className="flex items-center gap-6 md:min-w-[150px] md:shrink-0">
                                            <span className="text-[15px] font-light text-slate-600 font-mono tracking-tighter whitespace-nowrap shrink-0">
                                                {item.published_at
                                                    ? item.published_at.substring(0, 10).replace(/-/g, '.')
                                                    : '----.--.--'}
                                            </span>
                                            <span className="text-[13px] px-2 py-0.5 border border-slate-400 text-slate-500 tracking-widest font-bold whitespace-nowrap shrink-0 group-hover:border-[#c46a3a] group-hover:text-[#ff6b00] transition-colors">
                                                {categoryNames[item.category?.toLowerCase()] || item.category || 'INFO'}
                                            </span>
                                        </div>

                                        <h3 className="min-w-0 md:flex-1 text-[18px] md:text-[20px] text-slate-800 group-hover:text-slate-900 group-hover:translate-x-1 transition-all duration-500">
                                            {item.title}
                                        </h3>

                                        <ArrowUpRight className="hidden md:block ml-auto w-4 h-4 shrink-0 text-slate-200 group-hover:text-[#ff6b00] transition-colors" />
                                    </Link>
                                ))
                            ) : (
                                <div className="py-20 text-center">
                                    <p
                                        className="text-[20px] text-slate-600 tracking-widest mb-2"
                                        style={{ fontFamily: "'Noto Serif JP', serif" }}
                                    >
                                        Coming soon...
                                    </p>
                                    <p className="text-[12px] text-slate-400 uppercase tracking-[0.3em]">
                                        現在、新しいお知らせを準備中です。
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section
                    id="services"
                    className="pb-20 md:pb-[20vh] py-32 px-6 md:px-[10vw]"
                >
                    <div className="mb-16 flex justify-between items-end border-b border-slate-900/10 pb-5">
                        <h2
                            className="text-3xl md:text-4xl font-medium tracking-tighter text-slate-900"
                            style={{ fontFamily: "'Noto Serif JP', serif" }}
                        >
                            What We Create
                        </h2>
                        <div
                            className="hidden md:block text-[8px] tracking-[0.3em] text-slate-400 font-bold uppercase mb-1"
                            style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
                        >
                            Expertise
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 max-w-sm md:max-w-none mx-auto">
                        {works.map((work) => (
                            <Link
                                key={work.id}
                                href={`/services#${work.anchor}`}
                                className="group cursor-pointer"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                >
                                    <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative shadow-lg">
                                        <img
                                            src={work.img}
                                            className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                                            alt={work.title}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-[#ff6b00]/10 transition-colors duration-500" />
                                    </div>

                                    <span
                                        className="text-[16px] tracking-[0.1em] font-bold text-[#ff6b00] block mb-2"
                                        style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
                                    >
                                        {work.category}
                                    </span>

                                    <h3
                                        className="text-lg md:text-xl font-medium text-slate-700 group-hover:text-slate-900 transition-colors leading-snug"
                                        style={{ fontFamily: "'Noto Serif JP', serif" }}
                                    >
                                        {work.title}
                                    </h3>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section
                    ref={worksRef}
                    className="relative h-[70vh] md:h-[90vh] overflow-hidden bg-slate-900 mt-24"
                >
                    <motion.div
                        style={{ scale: worksImgScale }}
                        className="absolute inset-0"
                    >
                        <img
                            src="/images/arena.png"
                            className="w-full h-full object-cover opacity-40 grayscale"
                            alt="Beyond"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900" />
                    </motion.div>

                    <motion.div
                        style={{ y: worksTextY }}
                        className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10"
                    >
                        <h2
                            className="text-white text-[9vw] md:text-[5vw] font-medium leading-none tracking-tighter"
                            style={{ fontFamily: "'Noto Serif JP', serif" }}
                        >
                            Create New Relations.
                        </h2>
                    </motion.div>
                </section>

                <section
                    id="contact"
                    className="py-32 px-6 md:px-[10vw]"
                >
                    <div className="max-w-5xl mx-auto bg-white rounded-[40px] p-10 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] border border-slate-50 relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">

                            <div>
                                <span
                                    className="text-[#ff6b00] text-[15px] tracking-[0.5em] font-bold uppercase block mb-10"
                                    style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
                                >
                                    Contact
                                </span>

                                <h2
                                    className="text-2xl md:text-3xl leading-[1.4] text-slate-900 mb-12"
                                    style={{ fontWeight: 200, fontFamily: "'Noto Serif JP', serif", letterSpacing: "-0.02em" }}
                                >
                                    小さな出会いから、
                                    <br />
                                    大きな価値は生まれる。
                                </h2>

                                <div className="space-y-8">
                                    <a
                                        href="mailto:info@everstreak.co.jp"
                                        className="flex items-center gap-6 group"
                                    >
                                        <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#ff6b00]/5 group-hover:border-[#c46a3a]/20 transition-all duration-500">
                                            <Mail
                                                className="w-4 h-4 text-slate-400 group-hover:text-[#ff6b00]"
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <p className="text-base text-slate-500 group-hover:text-slate-900 transition-colors tracking-tight font-light">
                                            info@everstreak.co.jp
                                        </p>
                                    </a>

                                    <a
                                        href="https://line.me/ti/p/@394hzlmj"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-6 group"
                                    >
                                        <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#ff6b00]/5 group-hover:border-[#c46a3a]/20 transition-all duration-500">
                                            <LineIcon className="w-4 h-4 text-slate-400 group-hover:text-[#ff6b00]" />
                                        </div>
                                        <p className="text-base text-slate-500 group-hover:text-slate-900 transition-colors tracking-tight font-light">
                                            LINE公式アカウント
                                        </p>
                                    </a>
                                </div>
                            </div>

                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center gap-8 py-10">
                                    <div className="w-16 h-16 rounded-full bg-[#ff6b00]/10 flex items-center justify-center">
                                        <Send className="w-6 h-6 text-[#ff6b00]" />
                                    </div>
                                    <div className="text-center">
                                        <p
                                            className="text-xl text-slate-800 font-light mb-3"
                                            style={{ fontFamily: "'Noto Serif JP', serif" }}
                                        >
                                            送信しました
                                        </p>
                                        <p className="text-sm text-slate-400 leading-[2]">
                                            お問い合わせありがとうございます。
                                            <br />
                                            担当者より折り返しご連絡いたします。
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="text-[9px] tracking-[0.3em] uppercase text-slate-400 hover:text-slate-900 transition-colors border-b border-slate-200 pb-0.5"
                                    >
                                        新しいメッセージを送る
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-10"
                                >
                                    <div className="group space-y-3 border-b border-slate-100 pb-4 focus-within:border-[#c46a3a]/30 transition-colors">
                                        <label
                                            htmlFor="contact-name"
                                            className="text-[9px] uppercase tracking-[0.3em] text-slate-300 font-bold"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            id="contact-name"
                                            className="w-full bg-transparent border-none p-0 text-[16px] font-light text-slate-800 placeholder:text-slate-200 focus:ring-0 outline-none"
                                            placeholder="お名前"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="group space-y-3 border-b border-slate-100 pb-4 focus-within:border-[#c46a3a]/30 transition-colors">
                                        <label
                                            htmlFor="contact-email"
                                            className="text-[9px] uppercase tracking-[0.3em] text-slate-300 font-bold"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            className="w-full bg-transparent border-none p-0 text-[16px] font-light text-slate-800 placeholder:text-slate-200 focus:ring-0 outline-none"
                                            placeholder="email@example.com"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div className="group space-y-3 border-b border-slate-100 pb-4 focus-within:border-[#c46a3a]/30 transition-colors">
                                        <label
                                            htmlFor="contact-message"
                                            className="text-[9px] uppercase tracking-[0.3em] text-slate-300 font-bold"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            rows="3"
                                            className="w-full bg-transparent border-none p-0 text-[16px] font-light text-slate-800 placeholder:text-slate-200 focus:ring-0 resize-none outline-none"
                                            placeholder="ご用件をお聞かせください"
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-[10px] mt-1">{errors.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`group relative w-full overflow-hidden bg-slate-900 text-white rounded-xl py-6 text-[10px] tracking-[0.35em] uppercase font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${processing ? 'opacity-50' : 'hover:bg-slate-800'}`}
                                    >
                                        <span className="relative z-10">
                                            {processing ? 'Sending...' : 'Send Message'}
                                        </span>
                                        <Send className="w-3 h-3 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            )}

                        </div>
                    </div>
                </section>

                <footer className="py-16 px-6 md:px-[10vw] bg-slate-50/50">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
                        <div>
                            <div
                                className="text-2xl text-slate-300 mb-3"
                                style={{ fontFamily: "'Noto Serif JP', serif" }}
                            >
                                EverStreak
                            </div>
                            <p className="text-[8px] tracking-[0.4em] text-slate-400 font-medium uppercase ml-[0.4em]">
                                © 2026 EverStreak Inc.
                            </p>
                        </div>

                        <nav
                            className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-[9px] uppercase tracking-[0.2em] font-medium text-slate-400"
                            style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
                        >
                            <a href="#philosophy" className="hover:text-[#ff6b00] transition-colors">Core Values</a>
                            <Link href="/about" className="hover:text-[#ff6b00] transition-colors">About</Link>
                            <a href="#news" className="hover:text-[#ff6b00] transition-colors">News</a>
                            <Link href="/services" className="hover:text-[#ff6b00] transition-colors">Services</Link>
                            <a href="#contact" className="hover:text-[#ff6b00] transition-colors">Contact</a>
                        </nav>
                    </div>
                </footer>

            </main>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex flex-col"
                    >
                        <div className="flex justify-end p-6 md:p-10">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-slate-900"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <nav
                            className="flex flex-col items-center justify-center flex-1 gap-8"
                            style={{ fontFamily: "'Noto Serif JP', serif" }}
                        >
                            <a href="#philosophy" onClick={() => setIsMenuOpen(false)} className="text-3xl text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">Core Values</a>
                            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-3xl text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">About</Link>
                            <a href="#news" onClick={() => setIsMenuOpen(false)} className="text-3xl text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">News</a>
                            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-3xl text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">Services</a>
                            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-3xl text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">Contact</a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <FloatingContactButton />

        </div>
    );
}

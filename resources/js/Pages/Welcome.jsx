import React from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { Head, Link, useForm } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Send, Instagram, Mail, ArrowUpRight } from 'lucide-react';

// --- Opening Animation ---
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
                className="absolute h-[2px] bg-[#ff6b00] shadow-[0_0_20px_#ff6b00]"
            />
            <motion.h1
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: [0, 1, 1], scale: 1 }}
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
                className="text-[13vw] md:text-[7rem] font-serif font-extralight text-slate-900 ml-[0.5em] tracking-tighter"
            >
                EverStreak
            </motion.h1>
        </div>
    </motion.div>
);

export default function Welcome(props) {
    
    const { news = [] } = props;

    const categoryNames = {
        'notice': 'お知らせ',
        'update': '更新情報',
        'event':  'イベント',
    };
    
    const [isOpening, setIsOpening] = useState(true);
    const [isWritingStarted, setIsWritingStarted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
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
                alert('メッセージを送信しました。ありがとうございます！');
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
    const introOpacity = useMotionValue(0); 
    const contentOpacity = useMotionValue(0); 
    const scrollEffectProgress = useMotionValue(0);
    const smoothProgress = useSpring(scrollEffectProgress, { stiffness: 15, damping: 30 });

    const headerBg = useTransform(scrollYProgress, [0, 0.05], ["rgba(253, 253, 254, 0)", "rgba(253, 253, 254, 0.95)"]);
    const bgColor = useTransform(smoothProgress, [0, 0.75], ['#ffd8bc', '#fdfdfe']);
    const bgLogoOpacity = useTransform(smoothProgress, [0, 0.8], [0.25, 0]);
    const bgLogoScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);

    const startIntroSequence = () => {
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
        { id: 1, anchor: "event", title: "Event Planning & Operation", category: "イベント企画・運営", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200" },
        { id: 2, anchor: "mc", title: "Professional MC Service", category: "司会・MC", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200" },
        { id: 3, anchor: "web", title: "Web Design & Maintenance", category: "WEB制作・運営・保守", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200" },
    ];

    return (
        <div ref={containerRef} className="relative min-h-[550vh] overflow-x-hidden bg-[#fdfdfe] selection:bg-orange-100 text-slate-900 font-sans tracking-tight">
            <Head>
                <title>EverStreak | 繋がりが、価値を定義する</title>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
            </Head>

            <motion.header 
                style={{ backgroundColor: headerBg, backdropFilter: "blur(12px)" }}
                className="fixed top-0 w-full z-[80] px-6 py-6 md:px-10 flex justify-between items-center border-b border-slate-900/5"
            >
                <div className="text-xl md:text-2xl font-serif italic tracking-tighter">EverStreak</div>
                <nav className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.4em] font-bold text-slate-400">
                    <a href="#philosophy" className="hover:text-[#ff6b00] transition-colors">Core Values</a>
                    <Link href="/about" className="hover:text-[#ff6b00] transition-colors">About</Link>
                    <a href="#news" className="hover:text-[#ff6b00] transition-colors">News</a>
                    <a href="#services" className="hover:text-[#ff6b00] transition-colors">Services</a>
                    <a href="#contact" className="hover:text-[#ff6b00] transition-colors">Contact</a>
                </nav>
                <button className="p-2 md:hidden text-slate-900" onClick={() => setIsMenuOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
            </motion.header>

            <AnimatePresence>
                {isOpening && <OpeningAnimation onStartExit={startIntroSequence} key="opening" />}
            </AnimatePresence>

            <motion.div style={{ backgroundColor: bgColor }} className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                <motion.div style={{ opacity: bgLogoOpacity, scale: bgLogoScale }} className="absolute inset-0 flex items-center justify-center">
                    <div className="relative text-center w-full px-6">
                        <motion.h2
                            className="text-[11vw] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-white select-none font-['Playfair_Display'] italic whitespace-nowrap tracking-tight"
                            style={{
                                opacity: introOpacity,
                                clipPath: isWritingStarted ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                                transition: 'clip-path 2.5s cubic-bezier(0.19, 1, 0.22, 1)'
                            }}
                        >
                            Connection<br />
                            <span className="inline-block translate-x-[0.05em]">Defines Value</span>
                        </motion.h2>
                    </div>
                </motion.div>
            </motion.div>

            <main className={`relative z-20 transition-opacity duration-1000 ${isOpening ? 'opacity-0' : 'opacity-1'}`}>
                <section className="h-screen flex flex-col items-center justify-center px-6">
                    <motion.div style={{ opacity: contentOpacity }} className="text-center">
                        <h1 className="text-[13vw] md:text-[7rem] lg:text-[8.5rem] font-serif font-extralight text-slate-900 leading-[0.9]">EverStreak</h1>
                        <div className="w-12 h-px bg-slate-900/20 mx-auto mt-12 mb-8" />
                        <p className="text-xs md:text-lg tracking-[0.5em] md:tracking-[0.8em] text-slate-500 uppercase font-medium italic ml-[0.8em]">繋がりが、価値を定義する</p>
                    </motion.div>
                </section>

                <section id="philosophy" className="scroll-mt-40 pt-25 md:pt-24 pb-40 md:pb-[40vh] px-6 md:px-[15vw] flex flex-col justify-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                        <span className="text-[#ff6b00] text-[23px] tracking-[0.2em] font-bold uppercase mb-8 block">Core Values</span>
                        <h2 className="text-2xl md:text-5xl lg:text-4xl font-serif font-extralight leading-[1.8] text-slate-900 mb-12 group cursor-default">
                            一人ひとりの衝動をシェアして、<br />
                            <span className="italic text-[#ff6b00] underline underline-offset-[12px] md:underline-offset-[16px] decoration-1 transition-all group-hover:text-orange-600">
                                共鳴しあう、最高のチームへ。
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 text-slate-500 leading-relaxed text-base md:text-[18px] font-light font-sans">
                            <p>偶然の出会いを、必然の「化学反応」へ。EverStreakは、人と人がダイレクトに響き合う体験をクリエイトします。バラバラだったエネルギーが一つにまとまり、大きな流れとなって社会を動かしていく。そのプロセスこそが、私たちの真髄です。</p>
                            <p>挑戦者のマインドと、表現者のインスピレーション。すべてのピースが「つながり」という引力で引き寄せられたとき、見たことのない新しい価値が定義されます。</p>
                        </div>
                    </motion.div>
                </section>

                {/* News Section */}
                <section id="news" className="pb-80 md:pb-[60vh] py-32 px-6 md:px-[10vw] bg-slate-50/40">
                    <div className="mx-auto">
                        <div className="flex justify-between items-baseline mb-12 border-b border-slate-900/10 pb-5">
                            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter text-slate-900">News</h2>
                            {/* <span className="text-[8px] tracking-[0.4em] text-slate-400 font-bold uppercase"></span> */}
                        </div>
                        <div className="divide-y divide-slate-900/5">
                            {news.length > 0 ? (
                                news.map((item) => (
                                    <Link 
                                        key={item.id} 
                                        href={`/news/${item.id}`}
                                        className="group flex flex-col md:flex-row md:items-center py-6 md:py-8 gap-3 md:gap-12 cursor-pointer relative"
                                    >
                                        <div className="flex items-center gap-6 min-w-[150px]">
                                            <span className="text-[15px] font-light text-slate-400 font-mono tracking-tighter">
                                                {item.published_at ? item.published_at.substring(0, 10).replace(/-/g, '.') : '----.--.--'}
                                            </span>
                                            <span className="text-[15px] px-2 py-0.5 border border-slate-200 text-slate-400 tracking-widest font-bold group-hover:border-[#ff6b00] group-hover:text-[#ff6b00] transition-colors">
                                                {categoryNames[item.category?.toLowerCase()] || item.category || 'INFO'}
                                            </span>
                                        </div>
                                        <h3 className="text-[20px] md:text-[22px] font-light text-slate-600 group-hover:text-slate-900 group-hover:translate-x-1 transition-all duration-500">
                                            {item.title}
                                        </h3>
                                        <ArrowUpRight className="hidden md:block ml-auto w-4 h-4 text-slate-200 group-hover:text-[#ff6b00] transition-colors" />
                                    </Link>
                                ))
                            ) : (
                                <div className="py-20 text-center">
                                    <p className="text-[20px] text-slate-600 font-serif italic tracking-widest mb-2">Coming soon...</p>
                                    <p className="text-[14px] text-slate-400 uppercase tracking-[0.3em]">現在、新しいお知らせを準備中です。</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section id="services" className="pb-20 md:pb-[20vh] py-32 px-6 md:px-[10vw]">
                    <div className="mb-16 flex justify-between items-end border-b border-slate-900/10 pb-5">
                        <h2 className="text-3xl md:text-4xl font-serif italic tracking-tighter text-slate-900">Our Services</h2>
                        <div className="hidden md:block text-[8px] tracking-[0.3em] text-slate-400 font-bold uppercase mb-1">Expertise</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        {works.map((work) => (
                            <Link key={work.id} href={`/services#${work.anchor}`} className="group cursor-pointer">
                                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}>
                                    <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative shadow-lg">
                                        <img src={work.img} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" alt={work.title} />
                                        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-[#ff6b00]/10 transition-colors duration-500" />
                                    </div>
                                    <span className="text-[18px] tracking-[0.1em] font-bold text-[#ff6b00] block mb-2">{work.category}</span>
                                    <h3 className="text-[20px] text-lg md:text-xl font-serif font-extralight text-slate-700 group-hover:text-slate-900 transition-colors leading-snug">{work.title}</h3>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section ref={worksRef} className="relative h-[70vh] md:h-[90vh] overflow-hidden bg-slate-900 mt-24">
                    <motion.div style={{ scale: worksImgScale }} className="absolute inset-0">
                        <img src="https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?q=80&w=2500" className="w-full h-full object-cover opacity-40 grayscale" alt="Beyond" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900" />
                    </motion.div>
                    <motion.div style={{ y: worksTextY }} className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
                        <h2 className="text-white text-[9vw] md:text-[5vw] font-serif italic leading-none tracking-tighter">Beyond the Boundary.</h2>
                    </motion.div>
                </section>

                <section id="contact" className="py-32 px-6 md:px-[10vw]">
                    <div className="max-w-5xl mx-auto bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative z-10">
                            <div>
                                <span className="text-[#ff6b00] text-[15px] tracking-[0.4em] font-bold uppercase block mb-8">Contact</span>
                                <h2 className="text-3xl md:text-5xl font-serif font-extralight text-slate-900 leading-[1.2] mb-10">新たな物語を、<br /><span className="text-[#ff6b00] italic underline underline-offset-8">共に。</span></h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-5 group cursor-pointer">
                                        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#ff6b00] transition-all duration-500">
                                            <Mail className="w-4 h-4 text-slate-300 group-hover:text-white" />
                                        </div>
                                        <p className="text-base md:text-lg font-serif italic text-slate-500">hello@everstreak.com</p>
                                    </div>
                                    <div className="flex items-center gap-5 group cursor-pointer">
                                        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#ff6b00] transition-all duration-500">
                                            <Instagram className="w-4 h-4 text-slate-300 group-hover:text-white" />
                                        </div>
                                        <p className="text-base md:text-lg font-serif italic text-slate-500">@everstreak_official</p>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-8">
                                <div className="space-y-2 border-b border-slate-100 pb-3 focus-within:border-[#ff6b00] transition-colors">
                                    <label className="text-[8px] uppercase tracking-[0.3em] text-slate-300 font-bold">Full Name</label>
                                    <input 
                                        className="w-full bg-transparent border-none p-0 text-lg md:text-xl font-serif focus:ring-0 outline-none" 
                                        placeholder="お名前" 
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-2 border-b border-slate-100 pb-3 focus-within:border-[#ff6b00] transition-colors">
                                    <label className="text-[8px] uppercase tracking-[0.3em] text-slate-300 font-bold">Email Address</label>
                                    <input 
                                        className="w-full bg-transparent border-none p-0 text-lg md:text-xl font-serif focus:ring-0 outline-none" 
                                        placeholder="email@example.com" 
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                                </div>
                                <div className="space-y-2 border-b border-slate-100 pb-3 focus-within:border-[#ff6b00] transition-colors">
                                    <label className="text-[8px] uppercase tracking-[0.3em] text-slate-300 font-bold">Message</label>
                                    <textarea 
                                        rows="2" 
                                        className="w-full bg-transparent border-none p-0 text-lg md:text-xl font-serif focus:ring-0 resize-none outline-none" 
                                        placeholder="ご用件をお聞かせください" 
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                    />
                                    {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message}</p>}
                                </div>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full bg-slate-900 text-white rounded-full py-6 md:py-8 text-[9px] tracking-[0.4em] uppercase font-bold flex items-center justify-center gap-3 transition-all shadow-md active:scale-95 ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ff6b00]'}`}
                                >
                                    {processing ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
                
                <footer className="py-16 flex flex-col items-center gap-5 bg-slate-50/50">
                    <div className="text-2xl font-serif italic text-slate-200">EverStreak</div>
                    <p className="text-[8px] tracking-[0.8em] text-slate-400 font-medium uppercase ml-[0.8em]">© 2026 Connection defines value.</p>
                </footer>
            </main>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex flex-col">
                        <div className="flex justify-end p-6 md:p-10">
                            <button onClick={() => setIsMenuOpen(false)} className="text-slate-900"><X className="w-6 h-6" /></button>
                        </div>
                        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
                            <a href="#philosophy" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif italic text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">Core Values</a>
                            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif italic text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">About</Link>
                            <a href="#news" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif italic text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">News</a>
                            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif italic text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">Services</a>
                            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif italic text-slate-950 tracking-[0.1em] hover:text-[#ff6b00] transition-colors">Contact</a>
                            <div className="w-10 h-px bg-slate-200 mt-4" />
                            <div className="flex gap-8 mt-4">
                                <Instagram className="w-5 h-5 text-slate-400" /><Mail className="w-5 h-5 text-slate-400" />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
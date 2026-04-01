import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Mic2, Calendar, Code2 } from 'lucide-react';

export default function Services() {
    const serviceDetails = [
        {
            title: "Event Planning & Operation",
            jpTitle: "イベント企画・運営",
            icon: <Calendar className="w-6 h-6" />,
            description: "小規模なレセプションから大規模なカンファレンスまで、コンセプト立案、会場手配、当日の進行まで一貫してサポートします。「繋がり」が生まれる仕掛けをデザインし、一過性で終わらない体験を提供します。",
            features: ["コンセプト設計", "進行ディレクション", "スタッフキャスティング", "マニュアル作成"]
        },
        {
            title: "Professional MC Service",
            jpTitle: "司会・MC",
            icon: <Mic2 className="w-6 h-6" />,
            description: "「声」は空間の温度を変える力を持っています。イベントの趣旨を深く理解し、場の空気を読み、参加者の心に響く言葉を届けます。企業式典、ウェディング、トークショーなど、あらゆるシーンに対応します。",
            features: ["式典・パーティー司会", "バイリンガル対応（応相談）", "ナレーション", "台本作成サポート"]
        },
        {
            title: "Web Design & Maintenance",
            jpTitle: "WEB制作・運営・保守",
            icon: <Code2 className="w-6 h-6" />,
            description: "PHP/Laravelを中心としたモダンな技術選定により、拡張性が高く管理しやすいWebシステムを構築します。納品して終わりではなく、サーバー管理やSEO、日々のメンテナンスまで責任を持って伴走します。",
            features: ["Laravelによるシステム開発", "UI/UXデザイン", "継続的な保守運用", "SEO・マーケティング支援"]
        }
    ];

    return (
        <div className="min-h-screen bg-[#fdfdfe] text-slate-900 font-sans selection:bg-orange-100">
            <Head title="Services | EverStreak" />

            <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md bg-white/80 border-b border-slate-900/5">
                <Link href="/" className="text-xl font-serif italic tracking-tighter">EverStreak</Link>
                <Link href="/" className="group flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>
            </header>

            <main className="pt-32 pb-24 px-6 md:px-[10vw]">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mb-24"
                >
                    <span className="text-[#ff6b00] text-[11px] tracking-[0.4em] font-bold uppercase block mb-6">Our Expertise</span>
                    <h1 className="text-4xl md:text-6xl font-serif italic leading-tight mb-8">
                        領域を越え、<br />最高のチームで伴走する。
                    </h1>
                    <p className="text-slate-500 text-lg font-light leading-relaxed">
                        EverStreakは、オフラインの感動とオンラインの利便性を融合させます。各領域のプロフェッショナルが、お客様のプロジェクトを「化学反応」へと導きます。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-24">
                    {serviceDetails.map((service, index) => (
                        <motion.section 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="group"
                        >
                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                <div className="w-full md:w-1/2">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-orange-50 rounded-xl text-[#ff6b00]">
                                            {service.icon}
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-serif italic">{service.title}</h2>
                                    </div>
                                    <p className="text-[#ff6b00] font-bold text-sm mb-6 tracking-widest">{service.jpTitle}</p>
                                    <p className="text-slate-600 leading-[2] font-light mb-8 text-lg">
                                        {service.description}
                                    </p>
                                    <ul className="grid grid-cols-2 gap-4">
                                        {service.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wider">
                                                <CheckCircle2 className="w-3 h-3 text-[#ff6b00]" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full md:w-1/2 aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden shadow-xl">
                                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-50 flex items-center justify-center text-slate-300 italic font-serif">
                                        Visual representation of {service.title}
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>
            </main>

            <footer className="py-20 border-t border-slate-100 flex flex-col items-center gap-6">
                <Link href="/#contact" className="px-10 py-5 bg-slate-900 text-white text-[10px] tracking-[0.4em] uppercase font-bold rounded-full hover:bg-[#ff6b00] transition-all">
                    Start a Project
                </Link>
                <p className="text-[9px] tracking-[0.5em] text-slate-300 uppercase">© 2026 EverStreak Inc.</p>
            </footer>
        </div>
    );
}
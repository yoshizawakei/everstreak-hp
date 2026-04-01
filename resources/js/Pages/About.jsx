import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function About() {
    return (
        <div className="relative min-h-screen bg-[#fdfdfe] text-slate-900 font-sans selection:bg-orange-100">
            <Head title="About Us | EverStreak" />

            {/* 1. 固定ヘッダー */}
            <header className="fixed top-0 w-full z-[80] px-6 py-4 md:px-10 flex justify-between items-center border-b border-slate-900/5">
                {/* ロゴのサイズを text-2xl に、追跡をよりタイトに設定 */}
                <Link 
                    href="/" 
                    className="text-xl md:text-2xl font-serif italic tracking-tighter"
                >
                    EverStreak
                </Link>

                {/* 右側の戻るボタン */}
                <Link 
                    href="/" 
                    className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 
                    Back to Home
                </Link>
            </header>

            {/* 2. メインコンテンツを包むコンテナ */}
            <main 
                className="relative w-full px-6 md:px-[15vw] pb-24" 
                style={{ paddingTop: '160px' }} 
            >
                {/* Hero Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-32"
                >
                    <span className="text-[#ff6b00] text-[15px] tracking-[0.4em] font-bold uppercase block mb-6">About Our Company</span>
                    <h1 className="text-3xl md:text-5xl font-serif italic leading-tight mb-12">
                        つながりから、<br />新しい価値の軌跡を。
                    </h1>
                    <div className="w-full aspect-video rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" alt="Office" className="w-full h-full object-cover" />
                    </div>
                </motion.section>

                {/* Company Profile Table */}
                <section className="max-w-4xl">
                    <h2 className="text-2xl font-serif mb-12 border-b border-slate-100 pb-4">Corporate Profile</h2>
                    <dl className="divide-y divide-slate-100">
                        {[
                            { label: "会社名", value: "株式会社EverStreak" },
                            { label: "代表取締役", value: "大脇 拓仁" },
                            { label: "所在地", value: "〒150-0012 東京都渋谷区広尾1-2-1 ヒカリビル4階" },
                            { label: "設立", value: "2025年12月" },
                            { label: "事業内容", value: "イベント企画・運営、司会・MC、WEB制作・管理" }
                        ].map((item) => (
                            <div key={item.label} className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <dt className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{item.label}</dt>
                                <dd className="md:col-span-2 text-lg font-light text-slate-600">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            </main>

            <footer className="py-12 border-t border-slate-100 text-center">
                <p className="text-[9px] tracking-[0.5em] text-slate-300 uppercase">© 2026 EverStreak Inc.</p>
            </footer>
        </div>
    );
}
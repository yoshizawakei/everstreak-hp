import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle2,
    Mic2,
    Calendar,
    Code2
} from 'lucide-react';

const Seo = ({ title, description }) => {
    const siteName = "株式会社EverStreak";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDesc = "ひとつの出会いが、景色を変えていく。EverStreakは、イベント企画、司会、Web制作を通して、人と人とのつながりから新しい価値を創造します。";
    const desc = description || defaultDesc;

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
        </Head>
    );
};

export default function Services() {

    const serviceDetails = [
        {
            anchor: "event",
            title: "Event Planning & Operation",
            jpTitle: "イベント企画・運営",
            icon: <Calendar className="w-6 h-6" />,
            description:
                "人が集まるだけでは、イベントにはなりません。そこに会話が生まれ、感情が動き、次の挑戦につながる瞬間までを設計することが、私たちの役割です。",
            features: [
                "コンセプト設計",
                "進行ディレクション",
                "スタッフキャスティング",
                "マニュアル作成"
            ],
            img: "/images/event.jpg"
        },
        {
            anchor: "mc",
            title: "Professional MC Service",
            jpTitle: "司会・MC",
            icon: <Mic2 className="w-6 h-6" />,
            description:
                "空間の空気は、言葉ひとつで変わります。イベントの温度感や参加者の感情を読み取りながら、その場に最も自然なコミュニケーションを届けます。",
            features: [
                "各種イベント・式典・パーティー司会",
                "バイリンガル対応（応相談）",
                "ナレーション",
                "台本作成サポート"
            ],
            img: "/images/mc.jpg"
        },
        {
            anchor: "web",
            title: "Web Design & Maintenance",
            jpTitle: "WEB制作・運営・保守",
            icon: <Code2 className="w-6 h-6" />,
            description:
                "Webサイトは、作って終わりではありません。ブランドの世界観を正しく伝え、継続的に価値を積み重ねていける設計と運用を、一貫して支援します。",
            features: [
                "Laravelによるシステム開発",
                "UI/UXデザイン",
                "継続的な保守運用",
                "SEO・マーケティング支援"
            ],
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
        }
    ];

    return (

        <div
            className="min-h-screen bg-[#fdfdfe] text-slate-900 selection:bg-orange-100"
            style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
        >

            <Seo
                title="事業内容・サービス一覧"
                description="イベント企画・運営から司会者派遣、LaravelによるWebシステム開発まで。EverStreakは、人と人とのつながりから、新しい価値を創造します。"
            />

            <header className="fixed top-0 w-full z-50 px-6 py-5 md:px-10 flex justify-between items-center backdrop-blur-md bg-white/80 border-b border-slate-900/5">
                <Link
                    href="/"
                    className="text-xl md:text-2xl font-medium tracking-tighter"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                    EverStreak
                </Link>

                <Link
                    href="/"
                    className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-medium text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </header>

            <main className="pt-32 pb-24 px-6 md:px-[10vw]">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mb-24"
                >
                    <span className="text-[#ff6b00] text-[11px] tracking-[0.35em] font-semibold uppercase block mb-6">
                        What We Create
                    </span>

                    <h1
                        className="text-4xl md:text-6xl leading-[1.35] mb-10 text-slate-900"
                        style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 500, letterSpacing: "-0.03em" }}
                    >
                        小さな出会いから、
                        <br />
                        大きな価値は生まれる。
                    </h1>

                    <p className="text-slate-500 text-lg font-light leading-[2] max-w-3xl">
                        EverStreakは、イベント、コミュニケーション、
                        デジタルクリエイティブという異なる領域を横断しながら、
                        人と人が自然につながる体験を設計します。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-20 md:gap-28">
                    {serviceDetails.map((service, index) => (
                        <motion.section
                            key={index}
                            id={service.anchor}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="group scroll-mt-28"
                        >
                            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

                                <div className="w-full md:w-1/2">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-[#ff6b00]/5 rounded-xl text-[#ff6b00]">
                                            {service.icon}
                                        </div>
                                        <h2
                                            className="text-2xl md:text-3xl leading-tight text-slate-900"
                                            style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 500 }}
                                        >
                                            {service.title}
                                        </h2>
                                    </div>

                                    <p className="text-[#ff6b00] font-semibold text-[13px] mb-6 tracking-[0.15em]">
                                        {service.jpTitle}
                                    </p>

                                    <p className="text-slate-600 leading-[2.1] font-light mb-10 text-[17px] md:text-lg">
                                        {service.description}
                                    </p>

                                    <ul className="grid grid-cols-2 gap-y-4 gap-x-6">
                                        {service.features.map((f, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2 text-[12px] md:text-[13px] text-slate-400 font-medium tracking-[0.08em]"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff6b00] shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="w-full md:w-1/2">
                                    <div className="aspect-[16/10] md:aspect-[16/9] bg-slate-100 rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)]">
                                        <img
                                            src={service.img}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                            </div>
                        </motion.section>
                    ))}
                </div>

            </main>

            <footer className="py-16 px-6 md:px-[10vw] border-t border-slate-100 bg-slate-50/50">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

                    <div>
                        <Link
                            href="/#contact"
                            className="inline-block px-10 py-4 bg-slate-900 text-white text-[10px] tracking-[0.35em] uppercase font-semibold rounded-full hover:bg-[#ff6b00] transition-all mb-6"
                        >
                            Start a Project
                        </Link>
                        <div
                            className="text-2xl text-slate-300 mb-2"
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
                        <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-[#ff6b00] transition-colors">About</Link>
                        <a href="#event" className="hover:text-[#ff6b00] transition-colors">Event</a>
                        <a href="#mc" className="hover:text-[#ff6b00] transition-colors">MC</a>
                        <a href="#web" className="hover:text-[#ff6b00] transition-colors">Web</a>
                        <Link href="/#contact" className="hover:text-[#ff6b00] transition-colors">Contact</Link>
                    </nav>

                </div>
            </footer>

        </div>
    );
}

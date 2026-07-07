import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import FloatingContactButton from '@/Components/FloatingContactButton';

const Seo = ({ title, description }) => {
    const siteName = "株式会社EverStreak";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDesc = "株式会社EverStreak（エバーストリーク）の会社概要。東京・渋谷を拠点に、イベント企画・運営、司会・MC、Web制作を通じて関東全域で新しい価値を創造するクリエイティブチームです。";
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

export default function About() {

    const companyInfo = [
        { label: "会社名", value: "株式会社EverStreak（エバーストリーク）" },
        { label: "代表取締役", value: "大脇 拓仁" },
        { label: "所在地", value: "〒150-0012 東京都渋谷区広尾1-2-1 ヒカリビル4階" },
        { label: "設立", value: "2023年8月10日" },
        { label: "事業内容", value: "イベント企画・運営、司会・MC、WEB制作・管理" },
        { label: "対応エリア", value: "関東全域（東京・神奈川・埼玉・千葉 ほか）" }
    ];

    return (

        <div
            className="relative min-h-screen bg-[#fdfdfe] text-slate-900 selection:bg-orange-100"
            style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
        >

            <Seo title="会社概要" />

            <header className="fixed top-0 w-full z-[80] px-6 py-5 md:px-10 flex justify-between items-center border-b border-slate-900/5 bg-[#fdfdfe]/80 backdrop-blur-md">
                <Link
                    href="/"
                    className="text-xl md:text-2xl font-medium tracking-tighter"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                    EverStreak
                </Link>

                <nav
                    className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.2em] font-medium text-slate-400"
                    style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
                >
                    <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-[#ff6b00] transition-colors">About</Link>
                    <Link href="/services" className="hover:text-[#ff6b00] transition-colors">Services</Link>
                    <Link href="/#news" className="hover:text-[#ff6b00] transition-colors">News</Link>
                    <Link href="/#contact" className="hover:text-[#ff6b00] transition-colors">Contact</Link>
                </nav>

                <Link
                    href="/"
                    className="group flex md:hidden items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-medium text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </header>

            <main
                className="relative w-full px-6 md:px-[15vw] pb-24"
                style={{ paddingTop: '160px' }}
            >

                {/* Hero */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-24"
                >
                    <span
                        className="text-[#ff6b00] text-[20px] tracking-[0.18em] font-semibold uppercase mb-8 block"
                    >
                        About Our Company
                    </span>

                    <h1
                        className="text-3xl md:text-5xl leading-[1.5] text-slate-900 mb-14"
                        style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 500, letterSpacing: "-0.03em" }}
                    >
                        ひとつの出会いが、
                        <br />
                        景色を変えていく。
                    </h1>

                    <div className="w-full aspect-video rounded-[32px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] bg-slate-100">
                        <img
                            src="/images/about.jpg"
                            alt="株式会社EverStreak"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </motion.section>

                {/* Representative Message */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mb-24"
                >
                    <h2
                        className="text-2xl md:text-3xl mb-12 border-b border-slate-100 pb-5 text-slate-900"
                        style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 500 }}
                    >
                        Representative Message
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                        <div className="md:col-span-2 space-y-6 text-slate-600 font-light leading-[2.2] text-[17px]">
                            <p>
                                「この人と一緒に何かやりたい」—— そう思える出会いが、世界を少しずつ変えていくと信じています。
                            </p>
                            <p>
                                EverStreak（エバーストリーク）は、人が本音で語り合える場をつくり、そこから生まれるエネルギーを社会に向けて解き放つことを使命としています。イベント、言葉、デジタルという三つの接点を通じて、まだ誰も見たことのない価値を、ともに創り上げていきたいと思います。
                            </p>
                            <p
                                className="text-slate-400 text-sm tracking-[0.15em] pt-2"
                                style={{ fontFamily: "'Noto Serif JP', serif" }}
                            >
                                代表取締役　大脇 拓仁
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Corporate Profile */}
                <section className="max-w-4xl">
                    <h2
                        className="text-2xl md:text-3xl mb-12 border-b border-slate-100 pb-5 text-slate-900"
                        style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 500 }}
                    >
                        Corporate Profile
                    </h2>

                    <dl className="divide-y divide-slate-100">
                        {companyInfo.map((item) => (
                            <div
                                key={item.label}
                                className="py-7 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
                            >
                                <dt className="text-[10px] uppercase tracking-[0.25em] font-semibold text-slate-400">
                                    {item.label}
                                </dt>
                                <dd className="md:col-span-2 text-[17px] md:text-lg font-light text-slate-600 leading-[2] tracking-[0.01em]">
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

            </main>

            <FloatingContactButton />

            <footer className="py-16 px-6 md:px-[10vw] border-t border-slate-100 bg-slate-50/50">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
                    <div>
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
                        <Link href="/services" className="hover:text-[#ff6b00] transition-colors">Services</Link>
                        <Link href="/#news" className="hover:text-[#ff6b00] transition-colors">News</Link>
                        <Link href="/#contact" className="hover:text-[#ff6b00] transition-colors">Contact</Link>
                    </nav>
                </div>
            </footer>

        </div>

    );
}

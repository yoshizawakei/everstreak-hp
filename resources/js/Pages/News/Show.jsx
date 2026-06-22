import React from 'react';
import { motion } from 'framer-motion';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

// --- SEO ---
const Seo = ({ title, description, image }) => {
    const siteName = "株式会社EverStreak";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content={siteName} />
            {image && <meta property="og:image" content={image} />}

            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}

            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+JP:wght@300;400;500&family=Noto+Serif+JP:wght@200;500&display=swap"
                rel="stylesheet"
            />
        </Head>
    );
};

export default function Show({ news }) {
    const categoryNames = {
        'notice': 'お知らせ',
        'update': '更新情報',
        'event':  'イベント',
    };

    // SEO用のディスクリプション（HTMLタグを除去して先頭100文字を抽出）
    const seoDescription = news.content 
        ? news.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'
        : "EverStreakからの最新ニュースをお届けします。";

    return (
        <div className="min-h-screen bg-[#fdfdfe] text-slate-900 font-sans selection:bg-orange-100">
            {/* 記事固有の情報でSEOを最適化 */}
            <Seo 
                title={news.title} 
                description={seoDescription}
                image={news.image_path ? `/storage/${news.image_path}` : null}
            />

            <header className="fixed top-0 w-full z-50 px-6 py-6 md:px-10 flex justify-between items-center bg-[#fdfdfe]/80 backdrop-blur-md border-b border-slate-900/5">
                <Link href="/" className="text-xl md:text-2xl font-serif italic tracking-tighter hover:opacity-70 transition-opacity">
                    EverStreak
                </Link>
                <Link 
                    href="/#news" 
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-[#ff6b00] transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> Back to News
                </Link>
            </header>

            <main className="pt-32 pb-24 px-6 md:px-0">
                <article className="max-w-3xl mx-auto">
                    {/* Meta Info */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap items-center gap-4 mb-8"
                    >
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            {news.published_at ? news.published_at.substring(0, 10).replace(/-/g, '.') : '----.--.--'}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 border border-slate-200 text-[#ff6b00] tracking-widest font-bold uppercase">
                            <Tag className="w-3 h-3" />
                            {categoryNames[news.category?.toLowerCase()] || news.category || 'Information'}
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-4xl leading-[1.3] text-slate-950 mb-12"
                    >
                        {news.title}
                    </motion.h1>

                    {/* Featured Image */}
                    {news.image_path && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-16 aspect-video overflow-hidden rounded-3xl shadow-2xl shadow-slate-200 bg-slate-50"
                        >
                            <img 
                                src={`/storage/${news.image_path}`} 
                                alt={news.title} 
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Content (Rich Text対応) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="prose prose-slate prose-lg max-w-none 
                                   prose-headings:font-serif prose-headings:font-light prose-headings:text-slate-900
                                   prose-p:leading-[2.2] prose-p:text-slate-600 prose-p:font-light
                                   prose-a:text-[#ff6b00] prose-a:no-underline hover:prose-a:underline
                                   prose-strong:text-slate-900 prose-strong:font-bold
                                   prose-img:rounded-2xl prose-img:shadow-lg"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />

                    {/* Footer Button */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-24 pt-12 border-t border-slate-100 flex justify-center"
                    >
                        <Link 
                            href="/#news"
                            className="group flex flex-col items-center gap-4 text-slate-400 hover:text-[#ff6b00] transition-all duration-500"
                        >
                            <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Back to archive</span>
                            <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-white transition-all duration-500">
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                        </Link>
                    </motion.div>
                </article>
            </main>

            <footer className="py-12 flex flex-col items-center gap-4 bg-slate-50/30 border-t border-slate-50">
                <div className="text-xl font-serif italic text-slate-200">EverStreak</div>
                <p className="text-[8px] tracking-[0.8em] text-slate-400 font-medium uppercase ml-[0.8em]">
                    © 2026 EverStreak Inc.
                </p>
            </footer>
        </div>
    );
}
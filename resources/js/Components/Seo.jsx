import { Head } from '@inertiajs/react';

export default function Seo({ title, description }) {
    const siteName = "株式会社EverStreak";
    // タイトルが未設定なら「株式会社EverStreak」、設定済みなら「会社概要 | 株式会社EverStreak」のように表示
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    // デフォルトの説明文
    const defaultDesc = "繋がりが、価値を定義する。EverStreak の公式サイトです。";

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDesc} />
        </Head>
    );
}
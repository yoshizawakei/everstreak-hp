import { Head } from '@inertiajs/react';

export default function Seo({ title, description, type = 'website', image = null }) {
    const siteName = "株式会社EverStreak";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDesc = "繋がりが、価値を定義する。EverStreak の公式サイトです。";
    const desc = description || defaultDesc;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={desc} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={desc} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            {image && <meta property="og:image" content={image} />}

            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={desc} />
        </Head>
    );
}

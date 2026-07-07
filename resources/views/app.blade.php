<!DOCTYPE html>
<html lang="ja">
    <head>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QTGYTYQLZS"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', 'G-QTGYTYQLZS');
        </script>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            $seo = $page['props']['seo'] ?? [];
            $seoTitle = isset($seo['title']) ? $seo['title'] . ' | 株式会社EverStreak' : '株式会社EverStreak（エバーストリーク）';
            $seoDescription = $seo['description'] ?? '株式会社EverStreak（エバーストリーク）は、東京・渋谷を拠点に関東全域でイベント企画・運営、司会・MC、Web制作を手がけるクリエイティブチーム。';
            $seoType = $seo['type'] ?? 'website';
            $seoUrl = url()->current();
        @endphp

        <title inertia>{{ $seoTitle }}</title>
        <meta inertia name="description" content="{{ $seoDescription }}">

        <meta inertia property="og:title" content="{{ $seoTitle }}">
        <meta inertia property="og:description" content="{{ $seoDescription }}">
        <meta inertia property="og:type" content="{{ $seoType }}">
        <meta inertia property="og:site_name" content="株式会社EverStreak">
        <meta inertia property="og:url" content="{{ $seoUrl }}">

        <meta inertia name="twitter:card" content="summary">
        <meta inertia name="twitter:title" content="{{ $seoTitle }}">
        <meta inertia name="twitter:description" content="{{ $seoDescription }}">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

        <link rel="icon" href="/favicon.ico">

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

        <style>
            /* TailwindのクラスとGoogle Fontsを紐付け 
               tailwind.config.js で設定も可能ですが、ここで直接指定すると確実です
            */
            body {
                font-family: 'Inter', sans-serif;
            }
            .font-serif {
                font-family: 'Playfair Display', serif;
            }
        </style>
    </head>
    <body class="antialiased bg-[#fdfdfe] selection:bg-orange-100 selection:text-slate-900">
        @inertia
    </body>
</html>
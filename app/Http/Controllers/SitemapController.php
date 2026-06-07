<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        // 1. データベースから公開中（is_published = true）のお知らせを最新順に取得
        $newsList = News::where('is_published', true)
            ->orderBy('updated_at', 'desc')
            ->get();

        // 2. XMLの組み立て開始
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">';

        // --- 固定ページ（静的ページ）の追加 ---

        // トップページ
        $xml .= '<url>';
        $xml .= '<loc>' . url('/') . '/</loc>';
        $xml .= '</url>';

        // 会社概要 (About)
        $xml .= '<url>';
        $xml .= '<loc>' . url('/about') . '</loc>';
        $xml .= '</url>';

        // サービス (Services)
        $xml .= '<url>';
        $xml .= '<loc>' . url('/services') . '</loc>';
        $xml .= '</url>';

        // --- 動的ページ（お知らせ記事）の追加 ---
        foreach ($newsList as $news) {
            $xml .= '<url>';
            // NewsControllerの引数（News $news）に合わせて、IDを使ったURLを生成
            $xml .= '<loc>' . url('/news/' . $news->id) . '</loc>';
            // 記事の最終更新日をGoogle推奨のフォーマット（W3C形式）で出力
            $xml .= '<lastmod>' . $news->updated_at->toAtomString() . '</lastmod>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        // 3. XML形式としてブラウザや検索エンジンにレスポンスを返す
        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
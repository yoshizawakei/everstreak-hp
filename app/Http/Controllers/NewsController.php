<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function show(News $news)
    {
        // 公開フラグが立っていない場合は404（見つかりません）にする
        if (!$news->is_published) {
            abort(404);
        }

        $plainContent = trim(strip_tags((string) $news->content));
        $seoDescription = $plainContent !== ''
            ? mb_substr($plainContent, 0, 100) . '...'
            : 'EverStreak（エバーストリーク）からの最新ニュースをお届けします。';

        return Inertia::render('News/Show', [
            'news' => $news,
            'seo' => [
                'title' => $news->title,
                'description' => $seoDescription,
                'type' => 'article',
            ],
        ]);
    }
}
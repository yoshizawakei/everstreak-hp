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

        return Inertia::render('News/Show', [
            'news' => $news
        ]);
    }
}
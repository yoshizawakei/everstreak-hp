<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;
use Inertia\Inertia;

class AdminNewsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/News/Index', [
            'news' => News::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/News/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'category' => 'required',
            // 以下を追加
            'is_published' => 'nullable|boolean',
            'published_at' => 'nullable|date',
        ]);

        // デフォルト値を設定
        $validated['is_published'] = $request->boolean('is_published', true);
        $validated['published_at'] = $request->published_at ?: now();

        News::create($validated);

        return redirect()->route('admin.news.index')->with('message', '記事を公開しました。');
    }

    public function destroy(News $news)
    {
        $news->delete();
        return redirect()->back();
    }

    // 編集画面を表示
    public function edit(News $news)
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $news
        ]);
    }

    // 更新処理
    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string',
            // 以下を追加
            'is_published' => 'nullable|boolean',
            'published_at' => 'nullable|date',
        ]);

        // 値を反映
        $validated['is_published'] = $request->boolean('is_published');
        $validated['published_at'] = $request->published_at ?: $news->published_at;

        $news->update($validated);

        return redirect()->route('admin.news.index')->with('success', '記事を更新しました');
    }
}

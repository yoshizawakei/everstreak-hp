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
        ]);

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
        ]);

        $news->update($validated);

        return redirect()->route('admin.news.index')->with('success', '記事を更新しました');
    }
}

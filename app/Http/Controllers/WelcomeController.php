<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * トップページの表示（お知らせデータを渡す）
     */
    public function index()
    {
        // 修正ポイント：条件をシンプルにして、確実にデータが届くか確認する
        $news = News::where('is_published', true)
            // デバッグ期間中は一旦コメントアウトするか、日付のみで比較する
            // ->where('published_at', '<=', now()) 
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Welcome', [
            'news' => $news
        ]);
    }

    /**
     * お問い合わせの保存処理
     */
    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        Contact::create($validated);

        // 送信後はトップページへ戻る（Inertiaのフラッシュメッセージ対応）
        return redirect()->back()->with('success', 'Sent Successfully');
    }
}

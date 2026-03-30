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
        return Inertia::render('Welcome', [
            // 公開中かつ、公開日時が現在より前のものを最新5件取得
            'news' => News::where('is_published', true)
                ->where('published_at', '<=', now())
                ->latest('published_at')
                ->take(5)
                ->get()
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

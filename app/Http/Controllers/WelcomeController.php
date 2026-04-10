<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
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

        // 1. DBに保存
        $contact = Contact::create($validated);

        // 2. 管理者（最初のユーザー）を取得
        $admin = User::first();

        if ($admin) {
            // 3. 通知メールを送信
            Mail::raw(
                "EverStreak HPから新しいお問い合わせがありました。\n\n" .
                "お名前: {$contact->name} 様\n" .
                "メール: {$contact->email}\n\n" .
                "本文:\n{$contact->message}\n\n" .
                "▼管理画面で確認する\n" . route('admin.contacts.index'),
                function ($message) use ($admin) {
                    $message->to($admin->email)
                        ->subject('【通知】HPからお問い合わせが届きました');
                } .
                "このメールは送信専用です。"
            );
        }

        return redirect()->back()->with('success', 'Sent Successfully');
    }
}

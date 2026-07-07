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
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Welcome', [
            'news' => $news,
            'seo' => [
                'title' => 'ひとつの出会いが、景色を変えていく',
                'description' => '株式会社EverStreak（エバーストリーク）は、東京・渋谷を拠点に関東全域でイベント企画・運営、司会・MC、Web制作を手がけるクリエイティブチーム。人と人とのつながりから、新しい価値を創造します。',
            ],
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
        $contact = \DB::transaction(function () use ($validated) {
            return Contact::create($validated);
        });

        // 2. 全ユーザーを取得（User::all() に変更）
        $users = User::all();

        // 3. ループで全員に送信
        foreach ($users as $user) {
            Mail::raw(
                "EverStreak HPから新しいお問い合わせがありました。\n\n" .
                "お名前: {$contact->name} 様\n" .
                "メール: {$contact->email}\n\n" .
                "本文:\n{$contact->message}\n\n" .
                "▼管理画面で確認する\n" . route('admin.contacts.index'),
                function ($message) use ($user, $contact) {
                    $message->to($user->email)
                        ->from(config('mail.from.address'), config('mail.from.name')) // 送信元を明示
                        ->replyTo($contact->email, $contact->name) // そのまま返信できるように設定
                        ->subject('【EverStreak】新着お問い合わせ（' . $contact->name . '様）');
                }
            );
        }

        return redirect()->back()->with('success', 'Sent Successfully');
    }
}

<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminNewsController;
use App\Http\Controllers\Admin\AdminContactController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ★ここを修正：トップページを表示する際、WelcomeControllerを経由するようにしました
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

// お問い合わせの送信処理
Route::post('/contact', [WelcomeController::class, 'storeContact'])->name('contact.store');

// ダッシュボード（ログイン後）
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// プロフィール編集（ログイン必須）
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

// ★管理画面のルートグループ
Route::prefix('admin')->name('admin.')->middleware(['auth'])->group(function () {

    // --- お知らせ管理 (News) ---
    Route::get('/news', [AdminNewsController::class, 'index'])->name('news.index');
    Route::get('/news/create', [AdminNewsController::class, 'create'])->name('news.create');
    Route::post('/news', [AdminNewsController::class, 'store'])->name('news.store');
    Route::get('/news/{news}/edit', [AdminNewsController::class, 'edit'])->name('news.edit');
    Route::patch('/news/{news}', [AdminNewsController::class, 'update'])->name('news.update');
    Route::delete('/news/{news}', [AdminNewsController::class, 'destroy'])->name('news.destroy');

    // --- お問い合わせ管理 (Contacts) ---
    Route::get('/contacts', [AdminContactController::class, 'index'])->name('contacts.index');
    Route::patch('/contacts/{contact}/toggle', [AdminContactController::class, 'toggleReplied'])->name('contacts.toggle-replied');
    Route::delete('/contacts/{contact}', [AdminContactController::class, 'destroy'])->name('contacts.destroy');

});
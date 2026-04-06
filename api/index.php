<?php
// 1. Vercelの書き込み制限を回避
$storagePath = '/tmp/storage/framework';
foreach (['views', 'cache', 'sessions'] as $dir) {
    if (!is_dir("$storagePath/$dir")) {
        mkdir("$storagePath/$dir", 0755, true);
    }
}
putenv("VIEW_COMPILED_PATH=/tmp/storage/framework/views");
putenv("APP_CONFIG_CACHE=/tmp/config.php");

// 2. ★重要：Vercelの自動生成変数をプログラム側で強制的に無視・上書きする
putenv("DB_CONNECTION=pgsql");
$_ENV['DB_CONNECTION'] = 'pgsql';

// 3. Laravelの起動
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

// 4. マイグレーション判定
if (isset($_GET['run_migrate']) && $_GET['run_migrate'] === '1') {
    $kernel->handle($request = Illuminate\Http\Request::capture());
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        echo "<h1>Migration Done!</h1><pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
        exit;
    } catch (\Exception $e) {
        echo "<h1>Migration Error</h1><pre>" . $e->getMessage() . "</pre>";
        exit;
    }
}

// 5. 通常表示
$response = $kernel->handle(Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
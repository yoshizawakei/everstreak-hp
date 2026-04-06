<?php
// 1. Vercelの書き込み制限を完全に回避する
$storagePath = '/tmp/storage';
$dirs = [
    '/framework/views',
    '/framework/cache',
    '/framework/sessions',
    '/bootstrap/cache' // ← 今回のエラー箇所
];

foreach ($dirs as $dir) {
    if (!is_dir($storagePath . $dir)) {
        mkdir($storagePath . $dir, 0755, true);
    }
}

// Laravelに「キャッシュはこの一時フォルダを使え」と命じる
putenv("APP_CONFIG_CACHE={$storagePath}/bootstrap/cache/config.php");
putenv("APP_SERVICES_CACHE={$storagePath}/bootstrap/cache/services.php");
putenv("APP_PACKAGES_CACHE={$storagePath}/bootstrap/cache/packages.php");
putenv("VIEW_COMPILED_PATH={$storagePath}/framework/views");

// 2. 環境変数の設定
putenv("DB_CONNECTION=pgsql");
$_ENV['DB_CONNECTION'] = 'pgsql';

// 3. Laravelをロード
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// 4. マイグレーション実行
if (isset($_GET['run_migrate'])) {
    try {
        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $artisan->call('migrate', ['--force' => true]);
        echo "<h1>Migration Success!</h1><pre>" . $artisan->output() . "</pre>";
    } catch (\Exception $e) {
        echo "<h1>Migration Error</h1><pre>" . $e->getMessage() . "</pre>";
    }
    exit;
}

// 5. 通常起動
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
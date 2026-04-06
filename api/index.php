<?php
// 1. 書き込み制限回避（前回の設定を維持）
$storagePath = '/tmp/storage';
$dirs = ['/framework/views', '/framework/cache', '/framework/sessions', '/bootstrap/cache'];
foreach ($dirs as $dir) {
    if (!is_dir($storagePath . $dir)) {
        mkdir($storagePath . $dir, 0755, true);
    }
}
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

// 4. 【解決策】migrate:fresh でDBをリセットして再構築
if (isset($_GET['run_migrate'])) {
    try {
        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        // --force は本番環境（Vercel）で実行するために必須です
        $artisan->call('migrate:fresh', ['--force' => true]);
        echo "<h1>DB Reset & Migration Success!</h1><pre>" . $artisan->output() . "</pre>";
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
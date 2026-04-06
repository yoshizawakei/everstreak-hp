<?php
// 1. 書き込み制限回避（継続）
$storagePath = '/tmp/storage';
foreach (['/framework/views', '/framework/cache', '/framework/sessions', '/bootstrap/cache'] as $dir) {
    if (!is_dir($storagePath . $dir))
        mkdir($storagePath . $dir, 0755, true);
}
putenv("APP_CONFIG_CACHE={$storagePath}/bootstrap/cache/config.php");
putenv("VIEW_COMPILED_PATH={$storagePath}/framework/views");

// 2. 環境変数の固定
putenv("DB_CONNECTION=pgsql");
$_ENV['DB_CONNECTION'] = 'pgsql';

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// 3. 【強制突破】直接SQLで全テーブルを削除してマイグレーション
if (isset($_GET['run_migrate'])) {
    try {
        echo "<h1>Cleaning Database...</h1>";
        // 全テーブルを強制削除するSQL
        $sql = "DROP SCHEMA public CASCADE; CREATE SCHEMA public;";
        \Illuminate\Support\Facades\DB::statement($sql);
        echo "<p>Database cleaned!</p>";

        // 改めてマイグレーション実行
        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $artisan->call('migrate', ['--force' => true]);

        echo "<h1>Migration Success!</h1><pre>" . $artisan->output() . "</pre>";
    } catch (\Exception $e) {
        echo "<h1>Still Error...</h1><pre>" . $e->getMessage() . "</pre>";
    }
    exit;
}

// 通常起動
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
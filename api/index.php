<?php
// 1. 書き込み制限回避
$storagePath = '/tmp/storage';
foreach (['/framework/views', '/framework/cache', '/framework/sessions', '/bootstrap/cache'] as $dir) {
    if (!is_dir($storagePath . $dir))
        mkdir($storagePath . $dir, 0755, true);
}
putenv("APP_CONFIG_CACHE={$storagePath}/bootstrap/cache/config.php");
putenv("VIEW_COMPILED_PATH={$storagePath}/framework/views");

// 2. 環境変数の設定
putenv("DB_CONNECTION=pgsql");
$_ENV['DB_CONNECTION'] = 'pgsql';

// 3. 【最重要】マイグレーション実行
if (isset($_GET['run_migrate'])) {
    try {
        // A. PHP標準機能でDBを更地にする（Laravelの初期化不要）
        $dsn = "pgsql:host=" . env('DB_HOST') . ";port=5432;dbname=neondb";
        $pdo = new PDO($dsn, env('DB_USERNAME'), env('DB_PASSWORD'));
        $pdo->exec("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
        echo "<h1>1. Database Cleaned!</h1>";

        // B. ここで初めてLaravelを起動してマイグレーション
        require __DIR__ . '/../vendor/autoload.php';
        $app = require_once __DIR__ . '/../bootstrap/app.php';
        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $artisan->call('migrate', ['--force' => true]);

        echo "<h1>2. Migration Success!</h1><pre>" . $artisan->output() . "</pre>";
    } catch (\Exception $e) {
        echo "<h1>Error</h1><pre>" . $e->getMessage() . "</pre>";
    }
    exit;
}

// 4. 通常起動
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
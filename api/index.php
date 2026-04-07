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

// 3. 【一撃突破】マイグレーション実行
if (isset($_GET['run_migrate'])) {
    try {
        $host = 'ep-wispy-pine-anpdl125-pooler.c-6.us-east-1.aws.neon.tech';
        $user = 'neondb_owner';
        $pass = 'npg_7B9dNIqtGPHo';
        $dsn = "pgsql:host=$host;port=5432;dbname=neondb";

        // A. まず接続して完全に更地にする
        $pdo = new PDO($dsn, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->exec("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
        echo "<h1>1. Database Cleaned!</h1>";

        // B. 一度接続を明示的に切る（これ重要）
        $pdo = null;

        // C. 改めてLaravelを起動してマイグレーション
        require __DIR__ . '/../vendor/autoload.php';
        $app = require_once __DIR__ . '/../bootstrap/app.php';

        // マイグレーションを「トランザクションなし」で強行突破
        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $artisan->call('migrate', [
            '--force' => true,
            '--step' => true // 1つずつ実行することで、エラーの連鎖を防ぐ
        ]);

        echo "<h1>2. Migration Success!</h1><pre>" . $artisan->output() . "</pre>";

    } catch (\Exception $e) {
        echo "<h1>Error Detail</h1><pre>" . $e->getMessage() . "</pre>";
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
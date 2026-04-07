<?php
// 1. 書き込み制限回避用のディレクトリ作成
$storagePath = '/tmp/storage';
foreach (['/framework/views', '/framework/cache', '/framework/sessions', '/bootstrap/cache'] as $dir) {
    if (!is_dir($storagePath . $dir))
        mkdir($storagePath . $dir, 0755, true);
}

// 2. 環境変数の設定
putenv("DB_CONNECTION=pgsql");
$_ENV['DB_CONNECTION'] = 'pgsql';
putenv("VIEW_COMPILED_PATH={$storagePath}/framework/views");

// 3. 【一撃突破】マイグレーション実行
if (isset($_GET['run_migrate'])) {
    try {
        $host = 'ep-wispy-pine-anpdl125-pooler.c-6.us-east-1.aws.neon.tech';
        $user = 'neondb_owner';
        $pass = 'npg_7B9dNIqtGPHo';

        // A. DBの掃除（成功済みロジック）
        $dsn = "pgsql:host=$host;port=5432;dbname=neondb";
        $pdo = new PDO($dsn, $user, $pass);
        $pdo->exec("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
        $pdo = null;
        echo "<h1>1. Database Cleaned!</h1>";

        // B. Laravelの起動
        require __DIR__ . '/../vendor/autoload.php';
        $app = require_once __DIR__ . '/../bootstrap/app.php';

        // C. 【重要】Laravelのキャッシュパスをメモリ上で強制書き換え
        $app->useStoragePath($storagePath);
        $app->instance('path.config', $storagePath . '/bootstrap/cache/config.php'); // 設定キャッシュ先も変更

        // D. マイグレーション実行
        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $artisan->call('migrate', ['--force' => true, '--step' => true]);

        echo "<h1>2. Migration Success!</h1><pre>" . $artisan->output() . "</pre>";

    } catch (\Exception $e) {
        echo "<h1>Error Detail</h1><pre>" . $e->getMessage() . "</pre>";
    }
    exit;
}

// 通常起動（こちらにもパス修正が必要）
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->useStoragePath($storagePath);
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
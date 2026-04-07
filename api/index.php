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

// 3. 【強制リセット】マイグレーション実行
if (isset($_GET['run_migrate'])) {
    try {
        $host = 'ep-wispy-pine-anpdl125-pooler.c-6.us-east-1.aws.neon.tech';
        $user = 'neondb_owner';
        $pass = 'npg_7B9dNIqtGPHo';
        $dsn = "pgsql:host=$host;port=5432;dbname=neondb";

        // A. PHPの標準PDOで接続し、トランザクションの外でスキーマを破壊・再構築
        $pdo = new PDO($dsn, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // publicスキーマを完全に消して作り直すことで、古い制約をすべて消し去る
        $pdo->exec("DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO public;");
        $pdo = null; // 接続を確実に閉じる
        echo "<h1>1. Database Hard Reset Success!</h1>";

        // B. Laravelを起動してマイグレーションを実行
        require __DIR__ . '/../vendor/autoload.php';
        $app = require_once __DIR__ . '/../bootstrap/app.php';
        $app->useStoragePath($storagePath);

        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        // --step を付けず、一気に最新まで持っていく
        $artisan->call('migrate', ['--force' => true]);

        echo "<h1>2. Laravel Migration Success!</h1><pre>" . $artisan->output() . "</pre>";

    } catch (\Exception $e) {
        echo "<h1>Migration Fatal Error</h1><pre>" . $e->getMessage() . "</pre>";
    }
    exit;
}

// 4. 通常起動
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->useStoragePath($storagePath);
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
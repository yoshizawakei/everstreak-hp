<?php
// 1. 書き込み可能な一時ディレクトリの設定
$storagePath = '/tmp/storage';
foreach (['/framework/views', '/framework/cache', '/framework/sessions', '/bootstrap/cache'] as $dir) {
    if (!is_dir($storagePath . $dir))
        mkdir($storagePath . $dir, 0755, true);
}

// 2. Laravelの内部パスを環境変数で強制固定（読み込み前に実行）
putenv("APP_CONFIG_CACHE={$storagePath}/bootstrap/cache/config.php");
putenv("APP_SERVICES_CACHE={$storagePath}/bootstrap/cache/services.php");
putenv("APP_PACKAGES_CACHE={$storagePath}/bootstrap/cache/packages.php");
putenv("VIEW_COMPILED_PATH={$storagePath}/framework/views");
putenv("DB_CONNECTION=pgsql");

// 3. マイグレーション実行モード
if (isset($_GET['run_migrate'])) {
    try {
        // DBのクリーンアップ（前回成功したロジック）
        $dsn = "pgsql:host=ep-wispy-pine-anpdl125-pooler.c-6.us-east-1.aws.neon.tech;port=5432;dbname=neondb";
        $pdo = new PDO($dsn, 'neondb_owner', 'npg_7B9dNIqtGPHo');
        $pdo->exec("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
        $pdo = null;

        require __DIR__ . '/../vendor/autoload.php';
        $app = require_once __DIR__ . '/../bootstrap/app.php';
        $app->useStoragePath($storagePath); // パスの再設定

        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $artisan->call('migrate', ['--force' => true]);
        echo "<h1>Migration Success!</h1><pre>" . $artisan->output() . "</pre>";
    } catch (\Exception $e) {
        echo "<h1>Migration Error</h1><pre>" . $e->getMessage() . "</pre>";
    }
    exit;
}

// 4. 通常のサイト表示（ここが500エラーの原因でした）
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// ★重要：通常起動時にも一時ディレクトリを使うよう指示
$app->useStoragePath($storagePath);

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
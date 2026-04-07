
        $host = 'ep-wispy-pine-anpdl125-pooler.c-6.us-east-1.aws.neon.tech';
        $user = 'neondb_owner';
        $pass = 'npg_7B9dNIqtGPHo';

<?php
// 1. Vercelの書き込み制限を完全に回避するためのディレクトリ作成
$storagePath = '/tmp/storage';
foreach (['/framework/views', '/framework/cache', '/framework/sessions', '/bootstrap/cache'] as $dir) {
    if (!is_dir($storagePath . $dir)) {
        mkdir($storagePath . $dir, 0755, true);
    }
}

// 2. Laravelが内部で参照するキャッシュパスを、読み込み「前」に強制上書き
putenv("APP_CONFIG_CACHE={$storagePath}/bootstrap/cache/config.php");
putenv("APP_SERVICES_CACHE={$storagePath}/bootstrap/cache/services.php");
putenv("APP_PACKAGES_CACHE={$storagePath}/bootstrap/cache/packages.php");
putenv("VIEW_COMPILED_PATH={$storagePath}/framework/views");

// 3. 環境変数の設定
putenv("DB_CONNECTION=pgsql");
$_ENV['DB_CONNECTION'] = 'pgsql';

// 4. マイグレーション実行
if (isset($_GET['run_migrate'])) {
    try {
        // A. DBの掃除（前回成功したロジック）
        $host = 'ep-wispy-pine-anpdl125-pooler.c-6.us-east-1.aws.neon.tech';
        $user = 'neondb_owner';
        $pass = 'npg_7B9dNIqtGPHo';
        $dsn = "pgsql:host=$host;port=5432;dbname=neondb";
        $pdo = new PDO($dsn, $user, $pass);
        $pdo->exec("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
        echo "<h1>1. Database Cleaned!</h1>";

        // B. Laravelの起動（ここでキャッシュエラーを防ぐために上記の設定が効く）
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

// 5. 通常起動
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
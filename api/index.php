<?php
// 1. 環境変数の競合を物理的に排除
putenv("DB_CONNECTION=pgsql");
$_ENV['DB_CONNECTION'] = 'pgsql';

// 2. Vercelの書き込み制限回避
$storagePath = '/tmp/storage/framework';
foreach (['views', 'cache', 'sessions'] as $dir) {
    if (!is_dir("$storagePath/$dir")) {
        mkdir("$storagePath/$dir", 0755, true);
    }
}
putenv("VIEW_COMPILED_PATH=/tmp/storage/framework/views");

// 3. Laravelを最小限の状態でロード
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// 4. 【本番】テーブル作成（マイグレーション）を強制実行
if (isset($_GET['run_migrate'])) {
    try {
        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $status = $artisan->call('migrate', ['--force' => true]);
        echo "<h1>Migration Success!</h1><pre>" . $artisan->output() . "</pre>";
    } catch (\Exception $e) {
        echo "<h1>Migration Error</h1><pre>" . $e->getMessage() . "</pre>";
    }
    exit;
}

// 5. 通常の起動
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::capture());
$response->send();
$kernel->terminate($request, $response);
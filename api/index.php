<?php
// 1. Vercelの書き込み制限を回避
$storagePath = '/tmp/storage/framework';
foreach (['views', 'cache', 'sessions'] as $dir) {
    if (!is_dir("$storagePath/$dir")) {
        mkdir("$storagePath/$dir", 0755, true);
    }
}
putenv("VIEW_COMPILED_PATH=/tmp/storage/framework/views");
putenv("APP_CONFIG_CACHE=/tmp/config.php");

// 2. Laravelの標準的な起動処理
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// 3. カーネルを生成し、リクエストを処理（ここでサービスが完全に登録されます）
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

// 4. 【重要】リクエストが migrate 指示だった場合のみ、割り込んで実行
if ($request->query('run_migrate') === '1') {
    try {
        // コンソールコマンドを強制実行
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);

        echo "<h1>Migration Success!</h1>";
        echo "<pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
        echo "<a href='/'>Go to Homepage</a>";
        exit;
    } catch (\Exception $e) {
        echo "<h1>Migration Error</h1>";
        echo "<pre>" . $e->getMessage() . "</pre>";
        exit;
    }
}

// 5. 通常時はそのまま画面を表示
$response->send();
$kernel->terminate($request, $response);
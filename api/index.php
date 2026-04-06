<?php
// 1. 書き込み制限回避（ここは変更なし）
$storagePath = '/tmp/storage/framework';
foreach (['views', 'cache', 'sessions'] as $dir) {
    if (!is_dir("$storagePath/$dir")) {
        mkdir("$storagePath/$dir", 0755, true);
    }
}
putenv("VIEW_COMPILED_PATH=/tmp/storage/framework/views");
putenv("APP_CONFIG_CACHE=/tmp/config.php");

// 2. パスを修正して読み込む
// api/ フォルダから見て一階層上の vendor と bootstrap を指定
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

// 3. アプリの起動準備
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

// 4. マイグレーション実行判定
// handleの前に判定することで、DBエラーが出る前に処理を挟みます
if (isset($_GET['run_migrate']) && $_GET['run_migrate'] === '1') {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        echo "<h1>Migration Success!</h1><pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
        exit;
    } catch (\Exception $e) {
        echo "<h1>Migration Error</h1><pre>" . $e->getMessage() . "</pre>";
        exit;
    }
}

// 5. 通常の実行
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();
$kernel->terminate($request, $response);
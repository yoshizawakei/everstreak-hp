<?php
// 1. 書き込み制限回避
$storagePath = '/tmp/storage/framework';
foreach (['views', 'cache', 'sessions'] as $dir) {
    if (!is_dir("$storagePath/$dir")) {
        mkdir("$storagePath/$dir", 0755, true);
    }
}
putenv("VIEW_COMPILED_PATH=/tmp/storage/framework/views");
putenv("APP_CONFIG_CACHE=/tmp/config.php");

// 2. Laravelのオートローダーとアプリケーションを先に読み込む
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

// 3. アプリが起動した後にマイグレーション判定を行う
if ($request->query('run_migrate') === '1') {
    try {
        // クラスをフルネームで指定して呼び出す
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        echo "<h1>Migration Success!</h1>";
        echo "<pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
        exit;
    } catch (\Exception $e) {
        echo "<h1>Migration Error</h1>";
        echo "<pre>" . $e->getMessage() . "</pre>";
        exit;
    }
}

// 4. 通常のレスポンスを送信
$response->send();
$kernel->terminate($request, $response);
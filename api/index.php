<?php
// 1. Vercelの書き込み制限を回避するためのパス設定
$storagePath = '/tmp/storage/framework';
foreach (['views', 'cache', 'sessions'] as $dir) {
    if (!is_dir("$storagePath/$dir")) {
        mkdir("$storagePath/$dir", 0755, true);
    }
}

// 2. Laravelのコンパイル済みファイル（Bladeなど）の出力先を強制変更
putenv("VIEW_COMPILED_PATH=/tmp/storage/framework/views");
putenv("APP_CONFIG_CACHE=/tmp/config.php");

if (isset($_GET['run_migrate']) && $_GET['run_migrate'] === '1') {
    try {
        \Artisan::call('migrate', ['--force' => true]);
        echo "Migration Success!<br>";
        echo nl2br(\Artisan::output());
        exit;
    } catch (\Exception $e) {
        echo "Migration Error: " . $e->getMessage();
        exit;
    }
}

// 3. 実行
require __DIR__ . '/../public/index.php';
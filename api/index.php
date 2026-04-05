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

// 14行目を以下に書き換え
try {
    \Artisan::call('migrate', ['--force' => true]);
    echo "Migration Success: " . \Artisan::output();
} catch (\Exception $e) {
    echo "Migration Error: " . $e->getMessage();
}

// 3. 実行
require __DIR__ . '/../public/index.php';
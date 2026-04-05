<?php
// Vercelの書き込み制限を回避するための設定
$storagePath = '/tmp/storage/framework';
foreach (['views', 'cache', 'sessions'] as $dir) {
    if (!is_dir("$storagePath/$dir")) {
        mkdir("$storagePath/$dir", 0755, true);
    }
}

// 実行
require __DIR__ . '/../public/index.php';
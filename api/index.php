<?php
// Vercelの読み取り専用制限を回避
$paths = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs'
];

foreach ($paths as $path) {
    if (!is_dir($path)) {
        mkdir($path, 0755, true);
    }
}

// ログ出力先も一時フォルダに向ける
putenv("LOG_CHANNEL=errorlog");

require __DIR__ . '/../public/index.php';
<?php

// 1. Vercelの読み取り専用環境でのキャッシュ問題を回避
putenv('APP_CONFIG_CACHE=/tmp/config.php');
putenv('APP_ROUTES_CACHE=/tmp/routes.php');
putenv('APP_SERVICES_CACHE=/tmp/services.php');
putenv('APP_PACKAGES_CACHE=/tmp/packages.php');

// 2. 必要なディレクトリの作成
$storagePath = '/tmp/storage/framework';
foreach (['views', 'cache', 'sessions'] as $dir) {
    if (!is_dir("$storagePath/$dir")) {
        mkdir("$storagePath/$dir", 0755, true);
    }
}

// 3. ログの出力先を標準出力に強制（Logs画面で見やすくするため）
putenv("LOG_CHANNEL=errorlog");

// 4. Laravel本体の起動
require __DIR__ . '/../public/index.php';
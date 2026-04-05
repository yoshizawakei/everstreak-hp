<?php
// Vercelは /tmp 以外書き込めないので、キャッシュ先などを強制的に変更する
mkdir('/tmp/storage/framework/views', 0755, true);
mkdir('/tmp/storage/framework/cache', 0755, true);
mkdir('/tmp/storage/framework/sessions', 0755, true);

require __DIR__ . '/../public/index.php';
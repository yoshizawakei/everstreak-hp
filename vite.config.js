import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // Dockerコンテナ外(ブラウザ)からの接続を許可
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true, // Docker内のファイル変更を強制的に検知
        },
    },
});
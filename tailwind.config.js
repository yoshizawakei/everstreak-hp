/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Noto Serif JP"', 'serif'],
            },
            // 揺らぎ（Fluid）を標準クラスとして登録
            animation: {
                'fluid-slow': 'fluid 20s ease-in-out infinite',
            },
            keyframes: {
                fluid: {
                    '0%, 100%': { borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%' },
                    '33%': { borderRadius: '40% 60% 70% 30% / 50% 30% 70% 50%' },
                    '66%': { borderRadius: '60% 40% 30% 70% / 30% 50% 50% 70%' },
                },
            },
        },
    },
    plugins: [],
};
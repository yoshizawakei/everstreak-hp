/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                // 日本語の明朝体を主役に、英字をそれに合わせる
                serif: ['"Noto Serif JP"', '"Playfair Display"', 'serif'],
                // 日本語のゴシック体を主役に、英字をそれに合わせる
                sans: ['"Noto Sans JP"', 'Montserrat', 'sans-serif'],
            },
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
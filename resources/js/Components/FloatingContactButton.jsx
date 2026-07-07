import { Mail } from 'lucide-react';

export default function FloatingContactButton() {
    return (
        <a
            href="/#contact"
            className="group fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex items-center gap-2 bg-slate-900 hover:bg-[#ff6b00] text-white rounded-full pl-5 pr-6 py-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] transition-all duration-300 active:scale-95"
        >
            <Mail className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">
                Contact
            </span>
        </a>
    );
}

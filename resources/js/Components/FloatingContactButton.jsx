import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function FloatingContactButton() {
    return (
        <motion.a
            href="/#contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="group fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] flex items-center gap-3 md:gap-3.5 bg-slate-900 hover:bg-[#ff6b00] text-white rounded-full pl-5 pr-6 py-4 md:pl-7 md:pr-9 md:py-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] hover:shadow-[0_25px_60px_-12px_rgba(255,107,0,0.5)] ring-1 ring-white/10 transition-all duration-300"
        >
            <Mail className="w-4 h-4 md:w-[18px] md:h-[18px] shrink-0" strokeWidth={1.5} />
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.25em] md:tracking-[0.3em] font-bold whitespace-nowrap">
                Contact
            </span>

            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 md:h-3.5 md:w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff6b00] opacity-75 group-hover:bg-white" />
                <span className="relative inline-flex h-full w-full rounded-full bg-[#ff6b00] ring-2 ring-[#fdfdfe] group-hover:bg-white" />
            </span>
        </motion.a>
    );
}

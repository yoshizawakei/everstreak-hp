import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    LayoutDashboard, 
    Newspaper, 
    Mail, 
    Settings, 
    ExternalLink, 
    ArrowRight,
    TrendingUp
} from 'lucide-react';

export default function Dashboard({ auth, newsCount, messageCount }) {
    // 統計データ（ダミーまたはPropsから取得）
    const stats = [
        { label: 'Total News', value: newsCount || 0, icon: <Newspaper size={20} />, href: route('admin.news.index'), color: 'bg-blue-50 text-blue-600' },
        { label: 'Messages', value: messageCount || 0, icon: <Mail size={20} />, href: '#', color: 'bg-emerald-50 text-emerald-600' },
        { label: 'System Status', value: 'Active', icon: <TrendingUp size={20} />, href: '#', color: 'bg-orange-50 text-[#ff6b00]' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <LayoutDashboard className="text-slate-400" size={24} />
                    <h2 className="text-2xl font-serif text-slate-900 tracking-tight">
                        Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    
                    {/* Welcome Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200"
                    >
                        <div className="relative z-10">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400">Welcome back</span>
                            <h3 className="text-3xl font-serif italic mt-2">Hello, {auth.user.name}</h3>
                            <p className="text-slate-400 text-sm mt-4 max-w-md font-light leading-relaxed">
                                EverStreakの管理システムへようこそ。
                                今日も新しい価値の軌跡を残していきましょう。
                            </p>
                            <div className="mt-8 flex gap-4">
                                <Link 
                                    href="/" 
                                    target="_blank"
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-xs font-bold transition-all backdrop-blur-md"
                                >
                                    <ExternalLink size={14} /> View Site
                                </Link>
                            </div>
                        </div>
                        {/* 背景の装飾的アクセント */}
                        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-[#ff6b00] rounded-full blur-[100px] opacity-20"></div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                    <Link href={stat.href} className="text-slate-300 group-hover:text-slate-900 transition-colors">
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{stat.label}</div>
                                <div className="text-3xl font-serif text-slate-900">{stat.value}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Actions / Recent activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
                            <h4 className="text-lg font-serif mb-6 flex items-center gap-2 text-slate-900">
                                <Settings size={18} className="text-slate-400" /> Quick Actions
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <Link 
                                    href={route('admin.news.create')}
                                    className="p-6 bg-slate-50 rounded-2xl hover:bg-[#ff6b00] hover:text-white transition-all group"
                                >
                                    <Newspaper className="mb-3 text-slate-400 group-hover:text-white" />
                                    <div className="text-sm font-bold">Post News</div>
                                    <div className="text-[10px] opacity-60 mt-1">お知らせを新規投稿</div>
                                </Link>
                                <Link 
                                    href={route('profile.edit')}
                                    className="p-6 bg-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all group"
                                >
                                    <Settings className="mb-3 text-slate-400 group-hover:text-white" />
                                    <div className="text-sm font-bold">Profile Settings</div>
                                    <div className="text-[10px] opacity-60 mt-1">アカウント設定の変更</div>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Mail size={24} className="text-slate-300" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">No New Messages</h4>
                            <p className="text-xs text-slate-400 mt-2 max-w-[200px]">
                                現在、新しいお問い合わせはありません。
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
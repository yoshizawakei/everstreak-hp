import { Link, useForm } from '@inertiajs/react';
import { Plus, Trash2, Edit3, ExternalLink, Calendar, Eye, EyeOff } from 'lucide-react';

export default function Index({ news }) {
    const { delete: destroy } = useForm();

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-2xl font-serif text-slate-900 tracking-tight">News Management</h1>
                    <Link 
                        href={route('admin.news.create')} 
                        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-cyan-900 transition-colors"
                    >
                        <Plus size={18} /> 新規記事投稿
                    </Link>
                </div>

                <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Status</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Release Date</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Title</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Category</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {news.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        {item.is_published ? (
                                            <span className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                                                <Eye size={12} /> Public
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                                <EyeOff size={12} /> Private
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-500 font-mono flex flex-col">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} /> 
                                            {new Date(item.published_at || item.created_at).toLocaleDateString()}
                                        </span>
                                        {new Date(item.published_at) > new Date() && (
                                            <span className="text-[9px] text-orange-500 font-bold uppercase mt-1">Scheduled</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-base font-medium text-slate-800">{item.title}</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-4">
                                            <Link 
                                                href={route('admin.news.edit', item.id)}
                                                className="text-slate-300 hover:text-emerald-500 transition-colors"
                                            >
                                                <Edit3 size={18} />
                                            </Link>
                                            <button 
                                                onClick={() => confirm('削除しますか？') && destroy(route('admin.news.destroy', item.id))}
                                                className="text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* ... footer ... */}
            </div>
        </div>
    );
}
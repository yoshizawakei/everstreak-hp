import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Plus, 
    Trash2, 
    Edit3, 
    Calendar, 
    Eye, 
    EyeOff, 
    Newspaper 
} from 'lucide-react';

export default function Index({ auth, news }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('この記事を削除してもよろしいですか？')) {
            destroy(route('admin.news.destroy', { news: id }), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Newspaper className="text-slate-400" size={24} />
                        <h2 className="text-2xl font-serif text-slate-900 tracking-tight">
                            News Management
                        </h2>
                    </div>
                    <Link 
                        href={route('admin.news.create')} 
                        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#ff6b00] transition-all shadow-lg shadow-slate-200"
                    >
                        <Plus size={16} /> Create New
                    </Link>
                </div>
            }
        >
            <Head title="News Management" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Status</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Release Date</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Title</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {news.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            {item.is_published ? (
                                                <span className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                                                    <Eye size={12} /> 公開中
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                                    <EyeOff size={12} /> 非公開
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-sm text-slate-500 font-mono">
                                            <div className="flex flex-col">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} /> 
                                                    {new Date(item.published_at || item.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-base font-medium text-slate-800">{item.title}</td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-4">
                                                <Link 
                                                    href={route('admin.news.edit', { news: item.id })}
                                                    className="text-slate-300 hover:text-emerald-500 transition-colors"
                                                >
                                                    <Edit3 size={18} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(item.id)}
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
                        {news.length === 0 && (
                            <div className="p-20 text-center text-slate-400 text-sm italic">記事がありません。</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
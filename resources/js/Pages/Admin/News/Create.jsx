import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Send, Eye, EyeOff, Calendar } from 'lucide-react';

export default function Create() {
    // 現在時刻を 'YYYY-MM-DDTHH:MM' 形式で取得
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        category: 'Notice',
        is_published: true,
        published_at: localDateTime,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.news.store'), {
            onSuccess: () => alert('記事を公開しました'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link href={route('admin.news.index')} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-8 text-sm">
                    <ArrowLeft size={16} /> 一覧に戻る
                </Link>

                <div className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-200">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="flex justify-between items-start mb-10">
                            <h1 className="text-2xl font-serif text-slate-900">Create News</h1>
                            <button 
                                type="button"
                                onClick={() => setData('is_published', !data.is_published)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-all ${
                                    data.is_published ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-200 text-slate-500'
                                }`}
                            >
                                {data.is_published ? <><Eye size={14} /> PUBLIC</> : <><EyeOff size={14} /> PRIVATE</>}
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Category</label>
                                <select 
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                                >
                                    <option value="Notice">Notice</option>
                                    <option value="Update">Update</option>
                                    <option value="Event">Event</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                                    <Calendar size={12} /> Release Date
                                </label>
                                <input 
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={e => setData('published_at', e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Title</label>
                            <input 
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-lg font-medium"
                                placeholder="記事のタイトル..."
                            />
                            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Content</label>
                            <textarea 
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-2xl p-4 h-64 focus:ring-2 focus:ring-slate-200 transition-all resize-none text-base"
                                placeholder="本文を入力..."
                            />
                            {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
                        </div>

                        <button 
                            disabled={processing}
                            className="w-full py-5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-[#ff6b00] transition-all flex items-center justify-center gap-3"
                        >
                            <Send size={18} /> {processing ? '送信中...' : '記事を保存して公開'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
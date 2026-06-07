import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Eye, EyeOff, Calendar } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Edit({ news }) {
    const formatDateTime = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        const offset = d.getTimezoneOffset() * 60000;
        return new Date(d.getTime() - offset).toISOString().slice(0, 16);
    };

    const { data, setData, patch, processing, errors } = useForm({
        title: news.title || '',
        content: news.content || '',
        category: news.category || 'Notice',
        is_published: !!news.is_published,
        published_at: formatDateTime(news.published_at || news.created_at),
    });

    const modules = {
        toolbar: [
            [{ 'header': [2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.news.update', { news: news.id }), {
            onSuccess: () => alert('更新しました'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link href={route('admin.news.index')} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-6 sm:mb-8 text-sm">
                    <ArrowLeft size={16} /> 一覧に戻る
                </Link>

                <div className="bg-white rounded-3xl sm:rounded-[40px] p-5 sm:p-12 shadow-sm border border-slate-200">
                    <form onSubmit={submit} className="space-y-6 sm:space-y-8">
                        <div className="flex justify-between items-center mb-6 sm:mb-10 gap-4">
                            <h1 className="text-xl sm:text-2xl font-serif text-slate-900">Edit News</h1>
                            <button 
                                type="button"
                                onClick={() => setData('is_published', !data.is_published)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all shrink-0 ${
                                    data.is_published ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-200 text-slate-500'
                                }`}
                            >
                                {data.is_published ? <><Eye size={12} /> 公開</> : <><EyeOff size={12} /> 非公開</>}
                            </button>
                        </div>
                        
                        {/* スマホでは1列、PCでは2列 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Category</label>
                                <select 
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                                >
                                    <option value="Notice">お知らせ</option>
                                    <option value="Update">更新情報</option>
                                    <option value="Event">イベント</option>
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
                                className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-base sm:text-lg font-medium"
                            />
                            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Content</label>
                            <div className="bg-slate-50 rounded-2xl overflow-hidden min-h-[350px] sm:min-h-[400px] flex flex-col border border-slate-100">
                                <ReactQuill 
                                    theme="snow"
                                    value={data.content}
                                    onChange={value => setData('content', value)}
                                    modules={modules}
                                    className="flex-1 flex flex-col"
                                />
                            </div>
                            {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
                        </div>

                        <button 
                            disabled={processing}
                            className="w-full py-4 sm:py-5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-[#ff6b00] transition-all flex items-center justify-center gap-3 mt-6 sm:mt-12"
                        >
                            <Save size={18} /> {processing ? '保存中...' : '変更を保存する'}
                        </button>
                    </form>
                </div>
            </div>
            {/* エディタのレスポンシブスタイル微調整 */}
            <style>{`
                .ql-container { font-size: 15px; border: none !important; flex: 1; }
                @media (min-width: 640px) { .ql-container { font-size: 16px; } }
                .ql-toolbar { border: none !important; border-bottom: 1px solid #e2e8f0 !important; background: #f8fafc; padding: 8px !important; }
                .ql-editor { min-height: 250px; padding: 1rem sm:1.5rem; }
            `}</style>
        </div>
    );
}
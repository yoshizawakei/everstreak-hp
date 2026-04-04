import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Send, Eye, EyeOff, Calendar } from 'lucide-react';
// リッチエディタの導入
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Create() {
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        category: 'Notice',
        is_published: true,
        published_at: localDateTime,
    });

    // エディタのツールバー設定
    const modules = {
        toolbar: [
            [{ 'header': [2, 3, false] }], // 中タイトル(H2), 小タイトル(H3)
            ['bold', 'italic', 'underline', 'strike'], // 太字、斜体、下線、打ち消し線
            [{ 'color': [] }, { 'background': [] }], // 文字色、背景色
            [{ 'list': 'ordered'}, { 'list': 'bullet' }], // 箇条書き
            ['link', 'image'], // リンク、画像
            ['clean'] // フォーマット解除
        ],
    };

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
                                {data.is_published ? <><Eye size={14} /> 公開</> : <><EyeOff size={14} /> 非公開</>}
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
                                className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-lg font-medium"
                                placeholder="記事のタイトル..."
                            />
                            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Content</label>
                            <div className="bg-slate-50 rounded-2xl overflow-hidden min-h-[400px] flex flex-col">
                                <ReactQuill 
                                    theme="snow"
                                    value={data.content}
                                    onChange={value => setData('content', value)}
                                    modules={modules}
                                    className="flex-1 flex flex-col"
                                    placeholder="本文をデザインしてください..."
                                />
                            </div>
                            {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
                        </div>

                        <button 
                            disabled={processing}
                            className="w-full py-5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-[#ff6b00] transition-all flex items-center justify-center gap-3 mt-12"
                        >
                            <Send size={18} /> {processing ? '送信中...' : '記事を保存して公開'}
                        </button>
                    </form>
                </div>
            </div>
            {/* エディタのスタイル調整 */}
            <style>{`
                .ql-container { font-size: 16px; border: none !important; flex: 1; }
                .ql-toolbar { border: none !important; border-bottom: 1px solid #e2e8f0 !important; background: #f8fafc; }
                .ql-editor { min-h-[300px]; padding: 1.5rem; }
                .ql-editor.ql-blank::before { color: #cbd5e1; font-style: normal; }
            `}</style>
        </div>
    );
}
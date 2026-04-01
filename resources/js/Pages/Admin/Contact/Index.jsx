import { Link, useForm } from '@inertiajs/react';
import { Mail, MessageSquare, Trash2, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Index({ contacts }) {
    // deleteは予約語のため、エイリアスとしてdestroyを使用
    const { patch, delete: destroy } = useForm();
    const [expandedId, setExpandedId] = useState(null);

    // ステータスの切り替え
    const toggleReplied = (id) => {
        patch(route('admin.contacts.toggle-replied', { contact: id }), {
            preserveScroll: true,
        });
    };

    // 削除処理
    const handleDelete = (id) => {
        if (confirm('このお問い合わせを削除してもよろしいですか？')) {
            destroy(route('admin.contacts.destroy', { contact: id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-2xl font-serif text-slate-900 tracking-tight">Contact Management</h1>
                    <p className="text-slate-400 text-sm mt-2">届いたお問い合わせを確認・管理します。</p>
                </div>

                <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Status</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Date</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Inquirer</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Message</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {contacts.map((contact) => (
                                <tr key={contact.id} className={`hover:bg-slate-50/30 transition-colors ${!contact.is_replied ? 'bg-blue-50/20' : ''}`}>
                                    <td className="px-8 py-6 align-top">
                                        <button 
                                            onClick={() => toggleReplied(contact.id)}
                                            className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                                contact.is_replied ? 'text-emerald-500' : 'text-orange-400'
                                            }`}
                                        >
                                            {contact.is_replied ? (
                                                <><CheckCircle size={14} /> Replied</>
                                            ) : (
                                                <><Clock size={14} /> Pending</>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-8 py-6 text-xs text-slate-500 font-mono align-top">
                                        {new Date(contact.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6 align-top">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800">{contact.name}</span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                <Mail size={10} /> {contact.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 align-top max-w-xs">
                                        <div 
                                            className="cursor-pointer group"
                                            onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                                        >
                                            <p className={`text-sm text-slate-600 transition-all duration-300 ${
                                                expandedId === contact.id ? 'whitespace-pre-wrap' : 'line-clamp-1'
                                            }`}>
                                                {contact.message}
                                            </p>
                                            {expandedId !== contact.id && (
                                                <span className="text-[10px] text-slate-300 group-hover:text-[#ff6b00] transition-colors">
                                                    Click to expand
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right align-top">
                                        <div className="flex justify-end gap-4">
                                            {/* メッセージ展開ボタン */}
                                            <button 
                                                onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                                                className={`transition-colors ${expandedId === contact.id ? 'text-[#ff6b00]' : 'text-slate-300 hover:text-slate-600'}`}
                                            >
                                                <MessageSquare size={18} />
                                            </button>
                                            {/* 削除ボタン */}
                                            <button 
                                                onClick={() => handleDelete(contact.id)}
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
                    {contacts.length === 0 && (
                        <div className="p-20 text-center text-slate-400 text-sm italic">
                            お問い合わせはまだありません。
                        </div>
                    )}
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                    <Link href="/" className="text-slate-400 text-xs flex items-center gap-2 hover:text-slate-600 transition-colors">
                        <ExternalLink size={12} /> サイトを表示する
                    </Link>
                </div>
            </div>
        </div>
    );
}
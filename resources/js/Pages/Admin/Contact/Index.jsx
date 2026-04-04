import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Mail, 
    Trash2, 
    CheckCircle, 
    Clock, 
    Reply, 
    ChevronDown, 
    ChevronUp 
} from 'lucide-react';
import { useState } from 'react';

export default function Index({ auth, contacts }) {
    const { patch, delete: destroy } = useForm();
    
    // どのメッセージが開いているかを管理
    const [expandedId, setExpandedId] = useState(null);

    const toggleReplied = (id) => {
        patch(route('admin.contacts.toggle-replied', { contact: id }), {
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('このお問い合わせを削除してもよろしいですか？')) {
            destroy(route('admin.contacts.destroy', { contact: id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Mail className="text-slate-400" size={24} />
                    <h2 className="text-2xl font-serif text-slate-900 tracking-tight">
                        Messages
                    </h2>
                </div>
            }
        >
            <Head title="Messages" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                                    <tr 
                                        key={contact.id} 
                                        className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${expandedId === contact.id ? 'bg-slate-50' : ''} ${!contact.is_replied ? 'bg-blue-50/10' : ''}`}
                                        onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                                    >
                                        <td className="px-8 py-6 align-top">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); toggleReplied(contact.id); }}
                                                className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${contact.is_replied ? 'text-emerald-500' : 'text-orange-400'}`}
                                            >
                                                {contact.is_replied ? <CheckCircle size={14} /> : <Clock size={14} />}
                                                {contact.is_replied ? 'Replied' : 'Pending'}
                                            </button>
                                        </td>
                                        <td className="px-8 py-6 text-xs text-slate-500 font-mono align-top">
                                            {new Date(contact.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6 align-top">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800">{contact.name}</span>
                                                <span className="text-[10px] text-slate-400">{contact.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 align-top">
                                            <div className="flex flex-col gap-2">
                                                <p className={`text-sm text-slate-600 leading-relaxed transition-all ${expandedId === contact.id ? '' : 'line-clamp-1'}`}>
                                                    {contact.message}
                                                </p>
                                                {expandedId !== contact.id && (
                                                    <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1">
                                                        <ChevronDown size={10} /> Click to Read More
                                                    </span>
                                                )}
                                                {expandedId === contact.id && (
                                                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                                        <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1">
                                                            <ChevronUp size={10} /> Click to Close
                                                        </span>
                                                        <a 
                                                            href={`mailto:${contact.email}?subject=Re: お問い合わせありがとうございます（EverStreak）`}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#ff6b00] transition-all flex items-center gap-2"
                                                        >
                                                            <Reply size={12} /> Reply Now
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right align-top">
                                            <div className="flex justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                                                <a 
                                                    href={`mailto:${contact.email}?subject=Re: お問い合わせありがとうございます（EverStreak）`}
                                                    className="text-slate-300 hover:text-[#ff6b00] transition-all"
                                                >
                                                    <Reply size={18} />
                                                </a>
                                                <button onClick={() => handleDelete(contact.id)} className="text-slate-300 hover:text-red-500 transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {contacts.length === 0 && (
                            <div className="p-20 text-center text-slate-400 text-sm italic">お問い合わせはありません。</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
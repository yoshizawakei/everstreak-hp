import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Lock, Mail, LogIn } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-10 text-center">
                <h1 className="text-2xl font-serif text-slate-900 tracking-tight">Admin Login</h1>
                <p className="text-slate-400 text-sm mt-2 font-sans">管理者アカウントでログインしてください。</p>
            </div>

            {status && (
                <div className="mb-6 text-sm font-medium text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                        <Mail size={12} /> Email Address
                    </label>
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                            <Lock size={12} /> Password
                        </label>
                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-[10px] text-slate-400 hover:text-slate-900 transition-colors">
                                Forgot?
                            </Link>
                        )}
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        value={data.password}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center">
                    <label className="flex items-center group cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-200 text-slate-900 focus:ring-slate-900"
                        />
                        <span className="ms-2 text-xs text-slate-500 group-hover:text-slate-900 transition-colors">
                            ログイン状態を保持する
                        </span>
                    </label>
                </div>

                <button 
                    disabled={processing}
                    className="w-full py-4 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-[#ff6b00] transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
                >
                    <LogIn size={18} /> {processing ? 'Authenticating...' : 'Sign In'}
                </button>
            </form>
        </GuestLayout>
    );
}
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-10 text-center">
                <h1 className="text-2xl font-serif text-slate-900 tracking-tight">Create Account</h1>
                <p className="text-slate-400 text-sm mt-2 font-sans">管理者情報を登録してください。</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                        <User size={12} /> Name
                    </label>
                    <TextInput
                        value={data.name}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                        <Mail size={12} /> Email
                    </label>
                    <TextInput
                        type="email"
                        value={data.email}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                            <Lock size={12} /> Password
                        </label>
                        <TextInput
                            type="password"
                            value={data.password}
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                            Confirm
                        </label>
                        <TextInput
                            type="password"
                            value={data.password_confirmation}
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>
                </div>
                <InputError message={errors.password} />

                <div className="pt-4 space-y-4">
                    <button 
                        disabled={processing}
                        className="w-full py-4 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-[#ff6b00] transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
                    >
                        <UserPlus size={18} /> {processing ? 'Registering...' : 'Register'}
                    </button>

                    <div className="text-center">
                        <Link href={route('login')} className="text-xs text-slate-400 hover:text-slate-900 underline underline-offset-4 transition-colors">
                            Already registered?
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
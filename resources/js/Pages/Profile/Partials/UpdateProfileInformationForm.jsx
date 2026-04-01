import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { User, Mail, Save, CheckCircle } from 'lucide-react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), { preserveScroll: true });
    };

    return (
        <section className={`bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm ${className}`}>
            <header className="mb-8">
                <h2 className="text-xl font-serif text-slate-900">Profile Information</h2>
                <p className="mt-2 text-sm text-slate-400">アカウントの基本情報とメールアドレスを更新します。</p>
            </header>

            <form onSubmit={submit} className="space-y-6 max-w-xl">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                        <User size={12} /> Name
                    </label>
                    <input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                        required
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                        <Mail size={12} /> Email Address
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                        required
                    />
                    <InputError message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <p className="text-xs text-orange-600 leading-relaxed">
                            メールアドレスが未認証です。
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 underline hover:text-orange-800 transition-colors"
                            >
                                認証メールを再送する
                            </Link>
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button 
                        disabled={processing}
                        className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-[#ff6b00] transition-all shadow-lg shadow-slate-100"
                    >
                        <Save size={16} /> {processing ? 'Saving...' : 'Save Changes'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-500 flex items-center gap-1 font-medium">
                            <CheckCircle size={16} /> Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
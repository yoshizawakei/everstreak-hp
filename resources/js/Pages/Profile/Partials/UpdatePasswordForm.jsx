import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { Key, Save, CheckCircle } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={`bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm ${className}`}>
            <header className="mb-8">
                <h2 className="text-xl font-serif text-slate-900">Update Password</h2>
                <p className="mt-2 text-sm text-slate-400">セキュリティを維持するため、長く複雑なパスワードを使用してください。</p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6 max-w-xl">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 flex items-center gap-1">
                        <Key size={12} /> Current Password
                    </label>
                    <input
                        type="password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">New Password</label>
                        <input
                            type="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Confirm New Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-slate-200 transition-all text-sm"
                        />
                    </div>
                </div>
                <InputError message={errors.password} />

                <div className="flex items-center gap-4 pt-2">
                    <button 
                        disabled={processing}
                        className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-[#ff6b00] transition-all shadow-lg shadow-slate-100"
                    >
                        <Save size={16} /> {processing ? 'Updating...' : 'Update Password'}
                    </button>

                    <Transition show={recentlySuccessful}>
                        <p className="text-sm text-emerald-500 flex items-center gap-1 font-medium">
                            <CheckCircle size={16} /> Updated.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
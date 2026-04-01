import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const confirmUserDeletion = () => setConfirmingUserDeletion(true);
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`bg-white p-10 rounded-[32px] border border-red-100 shadow-sm ${className}`}>
            <header className="mb-8">
                <h2 className="text-xl font-serif text-red-600 flex items-center gap-2">
                    <AlertTriangle size={20} /> Delete Account
                </h2>
                <p className="mt-2 text-sm text-slate-400">アカウントを削除すると、すべてのデータが永久に失われます。</p>
            </header>

            <button 
                onClick={confirmUserDeletion}
                className="px-8 py-3.5 bg-red-50 text-red-600 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-all border border-red-100"
            >
                アカウントを完全に削除する
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-10 bg-white">
                    <h2 className="text-xl font-serif text-slate-900">Are you sure?</h2>
                    <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                        本当に削除しますか？確定するにはパスワードを入力してください。
                    </p>

                    <div className="mt-8">
                        <input
                            type="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-red-200 transition-all text-sm"
                            placeholder="Password"
                            isFocused
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-10 flex justify-end gap-4">
                        <button 
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            disabled={processing}
                            className="px-8 py-3 bg-red-600 text-white rounded-full text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2"
                        >
                            <Trash2 size={16} /> {processing ? 'Deleting...' : 'Delete Account'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
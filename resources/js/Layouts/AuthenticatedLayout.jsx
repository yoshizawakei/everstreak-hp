import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { LayoutDashboard, Newspaper, Mail } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {/* ロゴ: クリックでダッシュボードに戻るように設定 */}
                            <div className="flex shrink-0 items-center">
                                <Link href={route('dashboard')} className="flex items-center gap-2 group">
                                    <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-[#ff6b00] transition-colors">
                                        <ApplicationLogo className="block h-5 w-auto fill-current text-white" />
                                    </div>
                                    <span className="font-serif italic text-xl tracking-tighter text-slate-900">EverStreak</span>
                                </Link>
                            </div>

                            {/* メインナビゲーション */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <div className="flex items-center gap-2">
                                        <LayoutDashboard size={16} /> Dashboard
                                    </div>
                                </NavLink>
                                <NavLink href={route('admin.news.index')} active={route().current('admin.news.*')}>
                                    <div className="flex items-center gap-2">
                                        <Newspaper size={16} /> News
                                    </div>
                                </NavLink>
                                <NavLink href={route('admin.contacts.index')} active={route().current('admin.contacts.*')}>
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} /> Messages
                                    </div>
                                </NavLink>
                            </div>
                        </div>

                        {/* ユーザーメニュー */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 hover:border-slate-300 focus:outline-none">
                                                {user.name}
                                                <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile Settings</Dropdown.Link>
                                        <Dropdown.Link href="/" target="_blank">View Live Site</Dropdown.Link>
                                        <hr className="border-slate-100" />
                                        <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* モバイル用メニューボタン */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button onClick={() => setShowingNavigationDropdown((prev) => !prev)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* モバイルメニュー */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.news.index')} active={route().current('admin.news.*')}>News</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.contacts.index')} active={route().current('admin.contacts.*')}>Messages</ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
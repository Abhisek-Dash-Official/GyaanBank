"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { BrandMark, ChevronDownIcon, MenuIcon, CloseIcon } from "@/components/Icons";

export default function Header() {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isActive = (path) => pathname === path;

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                <div className="flex items-center space-x-8">
                    <Link href="/" className="flex items-center">
                        <BrandMark className="w-16 h-16" />
                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            GyaanBank
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/explore"
                            className={
                                isActive("/explore")
                                    ? "text-blue-700 font-semibold"
                                    : "text-slate-600 hover:text-slate-900 transition-colors"
                            }
                        >
                            Browse Notes
                        </Link>
                        <Link
                            href="/upload"
                            className={
                                isActive("/upload")
                                    ? "text-blue-700 font-semibold"
                                    : "text-slate-600 hover:text-slate-900 transition-colors"
                            }
                        >
                            Sell Notes
                        </Link>
                        {session?.user?.role === "admin" && (
                            <Link
                                href="/admin"
                                className={
                                    pathname.startsWith("/admin")
                                        ? "text-blue-700 font-semibold"
                                        : "text-slate-600 hover:text-slate-900 transition-colors"
                                }
                            >
                                Admin Panel
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {status === "loading" ? (
                        <div className="h-8 w-24 bg-slate-100 rounded animate-pulse" />
                    ) : session ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="flex items-center space-x-2 text-sm font-medium text-slate-800 hover:text-slate-950 px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                <span>{session.user.name}</span>
                                <ChevronDownIcon className="w-4 h-4 text-slate-500" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-md shadow-sm py-1 z-50">
                                    <div className="px-3.5 py-2 border-b border-slate-100">
                                        <p className="text-xs text-slate-500 truncate">Signed in as</p>
                                        <p className="text-xs font-semibold text-slate-900 truncate mt-0.5">
                                            {session.user.email}
                                        </p>
                                    </div>

                                    <Link
                                        href="/dashboard"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                    >
                                        My Library & Uploads
                                    </Link>
                                    <Link
                                        href="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                    >
                                        Account & Payouts
                                    </Link>
                                    {session.user.role === "admin" && (
                                        <Link
                                            href="/admin"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-3.5 py-2 text-sm text-blue-700 font-medium hover:bg-slate-50"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}

                                    <div className="border-t border-slate-100 mt-1 pt-1">
                                        <button
                                            type="button"
                                            onClick={() => signOut({ callbackUrl: "/login" })}
                                            className="w-full text-left px-3.5 py-2 text-sm text-red-600 hover:bg-slate-50 cursor-pointer"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-slate-700 hover:text-slate-950 px-3 py-2 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="text-sm font-medium bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded-md transition-colors"
                            >
                                Create Account
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex md:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-3">
                    <div className="flex flex-col space-y-2 text-sm font-medium">
                        <Link
                            href="/explore"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1.5 text-slate-700 hover:text-slate-900"
                        >
                            Browse Notes
                        </Link>
                        <Link
                            href="/upload"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1.5 text-slate-700 hover:text-slate-900"
                        >
                            Sell Notes
                        </Link>
                        {session?.user?.role === "admin" && (
                            <Link
                                href="/admin"
                                onClick={() => setMobileMenuOpen(false)}
                                className="py-1.5 text-blue-700 font-semibold"
                            >
                                Admin Panel
                            </Link>
                        )}
                    </div>

                    <div className="border-t border-slate-200 pt-3">
                        {session ? (
                            <div className="space-y-2 text-sm">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    {session.user.name}
                                </p>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-1.5 text-slate-700"
                                >
                                    My Library & Uploads
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-1.5 text-slate-700"
                                >
                                    Account & Payouts
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => signOut({ callbackUrl: "/login" })}
                                    className="block w-full text-left py-1.5 text-red-600 font-medium"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full text-center py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-md"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full text-center py-2 text-sm font-medium bg-blue-700 text-white rounded-md"
                                >
                                    Create Account
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
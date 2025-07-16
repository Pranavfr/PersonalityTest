'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { UserCircle2, ChevronDown, LogOut, LogIn, Users, Lightbulb, Book, Target, Info, Menu, X } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const { user, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPersonalityTypes, setShowPersonalityTypes] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null);

  // Load profile avatar from localStorage
  useEffect(() => {
    if (user) {
      const key = `profile_${user.uid}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setProfileAvatar(data.avatar || null);
        } catch {
          setProfileAvatar(null);
        }
      } else {
        setProfileAvatar(null);
      }
    } else {
      setProfileAvatar(null);
    }
  }, [user]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#18192a]/80 backdrop-blur-lg border-b border-purple-400/20 shadow-2xl flex items-center justify-between px-4 md:px-8 py-3">
      <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(233,46,251,0.5)]">
        <UserCircle2 className="w-8 h-8 text-pink-500 drop-shadow-[0_0_12px_#E92EFB]" />
        PersonalityTest
      </Link>
      <div className="flex-1" />
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 ml-auto"
        onClick={() => setMobileMenuOpen((v) => !v)}
        aria-label="Open menu"
      >
        {mobileMenuOpen ? <X className="w-7 h-7 text-purple-400" /> : <Menu className="w-7 h-7 text-purple-400" />}
      </button>
      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-8 ml-auto">
        <div className="relative">
          <button
            className="flex items-center gap-1 text-white font-bold hover:text-pink-400 hover:drop-shadow-[0_0_8px_#E92EFB] transition-all duration-200"
            onClick={() => setShowPersonalityTypes((v) => !v)}
          >
            Personality Types <ChevronDown className="w-4 h-4" />
          </button>
          {showPersonalityTypes && (
            <div className="absolute left-0 mt-2 w-52 bg-[#18192a]/95 backdrop-blur-lg rounded-xl shadow-2xl border border-purple-400/40 z-50 transition-all duration-200 ring-2 ring-purple-400/20">
              <Link href="/personalities" className="flex items-center gap-2 px-4 py-2 text-white hover:text-pink-400 hover:bg-[#232946]/80 rounded-t-xl transition-all font-semibold">
                <UserCircle2 className="w-4 h-4 text-purple-300" /> All Types
              </Link>
              <Link href="/compatibility" className="flex items-center gap-2 px-4 py-2 text-white hover:text-pink-400 hover:bg-[#232946]/80 transition-all font-semibold">
                <Users className="w-4 h-4 text-blue-300" /> Compatibility
              </Link>
              <Link href="/growth" className="flex items-center gap-2 px-4 py-2 text-white hover:text-pink-400 hover:bg-[#232946]/80 rounded-b-xl transition-all font-semibold">
                <Lightbulb className="w-4 h-4 text-pink-300" /> Growth
              </Link>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-1 text-white font-bold hover:text-pink-400 hover:drop-shadow-[0_0_8px_#E92EFB] transition-all duration-200"
            onClick={() => setShowResources((v) => !v)}
          >
            Resources <ChevronDown className="w-4 h-4" />
          </button>
          {showResources && (
            <div className="absolute left-0 mt-2 w-44 bg-[#18192a]/95 backdrop-blur-lg rounded-xl shadow-2xl border border-purple-400/40 z-50 transition-all duration-200 ring-2 ring-purple-400/20">
              <Link href="/faq" className="flex items-center gap-2 px-4 py-2 text-white hover:text-pink-400 hover:bg-[#232946]/80 rounded-t-xl transition-all font-semibold">
                <Book className="w-4 h-4 text-purple-300" /> FAQ
              </Link>
              <Link href="/careers" className="flex items-center gap-2 px-4 py-2 text-white hover:text-pink-400 hover:bg-[#232946]/80 transition-all font-semibold">
                <Target className="w-4 h-4 text-blue-300" /> Careers
              </Link>
              <Link href="/about" className="flex items-center gap-2 px-4 py-2 text-white hover:text-pink-400 hover:bg-[#232946]/80 rounded-b-xl transition-all font-semibold">
                <Info className="w-4 h-4 text-pink-300" /> About
              </Link>
            </div>
          )}
        </div>
        {/* Auth Section */}
        {loading ? (
          <div className="w-24 h-8 bg-purple-200 dark:bg-purple-900 rounded animate-pulse" />
        ) : user ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 text-white font-bold hover:text-pink-400 hover:drop-shadow-[0_0_8px_#E92EFB] transition-all duration-200"
              onClick={() => setShowDropdown((v) => !v)}
            >
              {profileAvatar ? (
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-purple-400 shadow-md flex items-center justify-center overflow-hidden">
                  <img src={profileAvatar} alt="Avatar" className="w-full h-full object-cover" />
                </span>
              ) : (
                <UserCircle2 className="w-6 h-6 text-pink-500 drop-shadow-[0_0_12px_#E92EFB]" />
              )}
              {user.displayName || user.email || "Account"}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-[#18192a]/95 backdrop-blur-lg rounded-xl shadow-2xl border border-purple-400/40 z-50">
                {/* Admin Dashboard Link (only for Pranav) */}
                {user.email === "pranav16022016@gmail.com" && (
                  <Link href="/admin" className="block px-4 py-2 text-pink-400 hover:text-white hover:bg-pink-500/20 rounded-t-xl font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.77 7.82 20 9 12.91l-5-3.64 5.91-.91z" /></svg>
                    Admin Dashboard
                  </Link>
                )}
                <Link href="/dashboard" className={`block px-4 py-2 text-white hover:text-pink-400 hover:bg-[#232946]/80 ${user.email === "pranav16022016@gmail.com" ? '' : 'rounded-t-xl'} font-semibold`}>Dashboard</Link>
                <button
                  onClick={async () => {
                    await signOut(getAuth());
                    window.location.href = "/auth/signin";
                  }}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#232946]/80 rounded-b-xl flex items-center gap-2 font-semibold"
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <LogIn className="w-4 h-4" /> Log In
          </Link>
        )}
      </div>
      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          {/* Mobile Menu Panel */}
          <div className="fixed top-[64px] left-0 w-full z-50 bg-[#18192a] backdrop-blur-lg border-t border-purple-400/30 shadow-2xl flex flex-col gap-2 px-4 pb-8 pt-4 animate-fade-in">
            {/* Close button (always visible) */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-[#232946] text-purple-300 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-purple-400 z-50"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
            {/* Menu Links */}
            <button
              className="flex items-center gap-2 text-white font-bold py-4 text-lg hover:text-pink-400 hover:drop-shadow-[0_0_8px_#E92EFB] transition-all duration-200 w-full justify-start"
              onClick={() => setShowPersonalityTypes((v) => !v)}
            >
              Personality Types <ChevronDown className="w-5 h-5" />
            </button>
            {showPersonalityTypes && (
              <div className="flex flex-col gap-1 pl-6">
                <Link href="/personalities" className="flex items-center gap-2 py-3 text-purple-300 hover:text-pink-400 text-base">All Types</Link>
                <Link href="/compatibility" className="flex items-center gap-2 py-3 text-blue-300 hover:text-pink-400 text-base">Compatibility</Link>
                <Link href="/growth" className="flex items-center gap-2 py-3 text-pink-300 hover:text-pink-400 text-base">Growth</Link>
              </div>
            )}
            <button
              className="flex items-center gap-2 text-white font-bold py-4 text-lg hover:text-pink-400 hover:drop-shadow-[0_0_8px_#E92EFB] transition-all duration-200 w-full justify-start"
              onClick={() => setShowResources((v) => !v)}
            >
              Resources <ChevronDown className="w-5 h-5" />
            </button>
            {showResources && (
              <div className="flex flex-col gap-1 pl-6">
                <Link href="/faq" className="flex items-center gap-2 py-3 text-purple-300 hover:text-pink-400 text-base">FAQ</Link>
                <Link href="/careers" className="flex items-center gap-2 py-3 text-blue-300 hover:text-pink-400 text-base">Careers</Link>
                <Link href="/about" className="flex items-center gap-2 py-3 text-pink-300 hover:text-pink-400 text-base">About</Link>
              </div>
            )}
            {loading ? (
              <div className="w-24 h-8 bg-purple-200 dark:bg-purple-900 rounded animate-pulse my-2" />
            ) : user ? (
              <div className="flex flex-col gap-2 mt-4">
                <button
                  className="flex items-center gap-2 text-white font-bold py-4 text-lg hover:text-pink-400 hover:drop-shadow-[0_0_8px_#E92EFB] transition-all duration-200 w-full justify-start"
                  onClick={() => setShowDropdown((v) => !v)}
                >
                  {profileAvatar ? (
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-purple-400 shadow-md flex items-center justify-center overflow-hidden">
                      <img src={profileAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    </span>
                  ) : (
                    <UserCircle2 className="w-6 h-6 text-pink-500 drop-shadow-[0_0_12px_#E92EFB]" />
                  )}
                  {user.displayName || user.email || "Account"}
                  <ChevronDown className="w-5 h-5" />
                </button>
                {showDropdown && (
                  <div className="flex flex-col gap-1 pl-6">
                    {user.email === "pranav16022016@gmail.com" && (
                      <Link href="/admin" className="py-3 text-pink-400 hover:text-white flex items-center gap-2 font-semibold text-base">Admin Dashboard</Link>
                    )}
                    <Link href="/dashboard" className="py-3 text-purple-300 hover:text-pink-400 text-base">Dashboard</Link>
                    <button
                      onClick={async () => {
                        await signOut(getAuth());
                        window.location.href = "/auth/signin";
                      }}
                      className="flex items-center gap-2 text-red-400 py-3 hover:text-pink-400 text-base"
                    >
                      <LogOut className="w-5 h-5" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-md my-2 w-full justify-center"
              >
                <LogIn className="w-5 h-5" /> Log In
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
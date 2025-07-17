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
        const data = JSON.parse(saved);
        setProfileAvatar(data.avatar || null);
      }
    }
  }, [user]);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setShowDropdown(false);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#18192a]/95 backdrop-blur-lg border-b border-purple-400/20 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-pink-500/25 transition-all duration-300">
              <UserCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
              PersonalityTest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Personality Types Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPersonalityTypes(!showPersonalityTypes)}
                className="flex items-center gap-1 text-gray-200 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm sm:text-base">Types</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showPersonalityTypes ? 'rotate-180' : ''}`} />
              </button>
              {showPersonalityTypes && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#18192a]/95 backdrop-blur-lg border border-purple-400/30 rounded-xl shadow-2xl py-2">
                  <Link href="/personalities" className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors">
                    All Types
                  </Link>
                  <Link href="/compatibility" className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors">
                    Compatibility
                  </Link>
                  <Link href="/growth" className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors">
                    Growth
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowResources(!showResources)}
                className="flex items-center gap-1 text-gray-200 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <Book className="w-4 h-4" />
                <span className="text-sm sm:text-base">Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showResources ? 'rotate-180' : ''}`} />
              </button>
              {showResources && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#18192a]/95 backdrop-blur-lg border border-purple-400/30 rounded-xl shadow-2xl py-2">
                  <Link href="/careers" className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors">
                    Careers
                  </Link>
                  <Link href="/faq" className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors">
                    FAQ
                  </Link>
                  <Link href="/about" className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors">
                    About
                  </Link>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  {profileAvatar ? (
                    <img src={profileAvatar} alt="Profile" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                  ) : (
                    <UserCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  )}
                  <span className="text-sm sm:text-base hidden sm:block">{user.displayName || user.email}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-[#18192a]/95 backdrop-blur-lg border border-purple-400/30 rounded-xl shadow-2xl py-2">
                    {user.email === "pranav16022016@gmail.com" && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-pink-400 hover:text-white hover:bg-white/10 transition-colors">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-200 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-purple-400/20 py-4 space-y-4">
            {/* Personality Types */}
            <div>
              <button
                onClick={() => setShowPersonalityTypes(!showPersonalityTypes)}
                className="flex items-center justify-between w-full text-left text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Personality Types</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showPersonalityTypes ? 'rotate-180' : ''}`} />
              </button>
              {showPersonalityTypes && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link href="/personalities" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg">
                    All Types
                  </Link>
                  <Link href="/compatibility" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg">
                    Compatibility
                  </Link>
                  <Link href="/growth" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg">
                    Growth
                  </Link>
                </div>
              )}
            </div>

            {/* Resources */}
            <div>
              <button
                onClick={() => setShowResources(!showResources)}
                className="flex items-center justify-between w-full text-left text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Resources</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showResources ? 'rotate-180' : ''}`} />
              </button>
              {showResources && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link href="/careers" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg">
                    Careers
                  </Link>
                  <Link href="/faq" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg">
                    FAQ
                  </Link>
                  <Link href="/about" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg">
                    About
                  </Link>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <div className="px-4">
              <ThemeToggle />
            </div>

            {/* User Menu */}
            {user ? (
              <div className="space-y-2">
                <Link href="/dashboard" className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10">
                  <UserCircle2 className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Dashboard</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base mx-4"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
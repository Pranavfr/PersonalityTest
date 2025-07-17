"use client";

import { useState } from "react";
import Link from "next/link";
import { Brain, ArrowLeft } from "lucide-react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { trackClick } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';

export default function SignIn() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const { user: authUser } = useAuth();

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/50 dark:to-blue-900/50 flex items-center justify-center p-4 pt-24 sm:pt-28">
      <div className="max-w-sm sm:max-w-md w-full">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 sm:mb-8 text-sm sm:text-base"
          onClick={async () => {
            await trackClick({
              link: 'Back to Home',
              href: '/',
              userId: authUser?.uid || undefined,
              userEmail: authUser?.email || undefined,
            });
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Sign In Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Sign in to access your personality insights</p>
          </div>

          {/* Google Sign In */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            {error && (
              <div className="text-red-600 bg-red-100 rounded p-3 text-center text-sm sm:text-base">{error}</div>
            )}
            {user && (
              <div className="text-green-700 bg-green-100 rounded p-3 text-center text-sm sm:text-base">
                Signed in as {user.displayName || user.email}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                New to PersonalityTest?
              </span>
            </div>
          </div>

          {/* Guest Access */}
          <Link
            href="/quiz"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            onClick={async () => {
              await trackClick({
                link: 'Take Test as Guest',
                href: '/quiz',
                userId: authUser?.uid || undefined,
                userEmail: authUser?.email || undefined,
              });
            }}
          >
            Take Test as Guest
          </Link>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
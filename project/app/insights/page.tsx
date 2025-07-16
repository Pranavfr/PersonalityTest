"use client";

import Link from "next/link";
import { Rocket, Briefcase, TrendingUp } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { personalityTypes } from "@/data/results";

export default function InsightsPage() {
  const { user, loading } = useAuth();
  const [quizResult, setQuizResult] = useState<any>(null);
  const [loadingResult, setLoadingResult] = useState(true);

  useEffect(() => {
    const fetchQuizResult = async () => {
      if (user) {
        const docRef = doc(db, "quizResults", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setQuizResult(docSnap.data());
        } else {
          setQuizResult(null);
        }
      }
      setLoadingResult(false);
    };
    fetchQuizResult();
  }, [user]);

  let typeInfo = null;
  if (quizResult && quizResult.type && personalityTypes[quizResult.type]) {
    typeInfo = personalityTypes[quizResult.type];
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 px-4">
      <div className="bg-white/10 dark:bg-gray-900/40 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-10 max-w-xl w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Rocket className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Unlock Your Potential</h1>
        <p className="text-lg text-purple-100 mb-4">
          Get advanced insights, career tips, and personalized growth plans.<br/>
          Actionable recommendations for personal and professional development.
        </p>
        {loading || loadingResult ? (
          <div className="text-purple-200 mt-8">Loading your insights...</div>
        ) : !user ? (
          <div className="text-purple-200 mt-8">
            <Link href="/auth/signin" className="underline">Sign in</Link> to see your personalized insights.
          </div>
        ) : !quizResult || !typeInfo ? (
          <div className="text-purple-200 mt-8">
            <Link href="/quiz" className="underline">Take the personality quiz</Link> to unlock your personalized insights!
          </div>
        ) : (
          <div className="space-y-8 mt-8">
            {/* Growth Recommendations */}
            <div className="bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl p-6 text-left">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Growth Recommendations</h2>
              </div>
              <ul className="list-disc list-inside text-purple-100 text-left space-y-1">
                {typeInfo.growthTips?.length ? (
                  typeInfo.growthTips.map((tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ))
                ) : (
                  <li>Embrace opportunities for self-improvement and seek feedback regularly.</li>
                )}
              </ul>
            </div>
            {/* Career Path Suggestions */}
            <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl p-6 text-left">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Career Path Suggestions</h2>
              </div>
              <ul className="list-disc list-inside text-purple-100 text-left space-y-1">
                {typeInfo.careers?.length ? (
                  typeInfo.careers.map((career: string, i: number) => (
                    <li key={i}>{career}</li>
                  ))
                ) : (
                  <li>Explore careers that align with your strengths and interests.</li>
                )}
              </ul>
            </div>
          </div>
        )}
        <div className="mt-8">
          <Link href="/dashboard" className="text-purple-300 hover:text-white underline font-medium">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
} 
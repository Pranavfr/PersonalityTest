"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Brain } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { Users, Lightbulb, Book, Target, Info, ArrowRight, Instagram, Award, Globe, Share2, CheckCircle, UserCircle2 } from "lucide-react";
import { personalityTypes } from "@/data/results";
import * as htmlToImage from 'html-to-image';
import { useRef } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [quizResult, setQuizResult] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  // Growth Tracker state
  const [completedGrowthTips, setCompletedGrowthTips] = useState<string[]>([]);

  // Quiz History state
  const [quizHistory, setQuizHistory] = useState<any[]>([]);

  // Badges state
  const [badges, setBadges] = useState<{ [key: string]: boolean }>({});

  // Profile state
  const [profile, setProfile] = useState<{ avatar?: string; name?: string; bio?: string }>({});
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<{ name: string; bio: string }>({ name: '', bio: '' });
  const [profileLoading, setProfileLoading] = useState(false);

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [bookmarksLoading, setBookmarksLoading] = useState(false);

  // Reminders state
  const [reminders, setReminders] = useState<{ text: string; date: string }[]>([]);
  const [reminderInput, setReminderInput] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [remindersLoading, setRemindersLoading] = useState(false);

  // Streaks & Stats state
  const [streak, setStreak] = useState(0);
  const [lastVisit, setLastVisit] = useState('');
  const [stats, setStats] = useState<{ quizzes: number; typesViewed: number; growthTips: number }>({ quizzes: 0, typesViewed: 0, growthTips: 0 });

  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  // Load quiz result from Firestore
  useEffect(() => {
    const fetchQuizResult = async () => {
      if (user) {
        try {
          const docRef = doc(db, "quizResults", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setQuizResult(docSnap.data());
            setError(null);
          } else {
            setQuizResult(null);
            setError(null);
          }
        } catch (err: any) {
          setQuizResult(null);
          if (err && err.message && err.message.includes("offline")) {
            setError("You appear to be offline. Please check your internet connection.");
          } else {
            setError("Failed to load quiz result. Please try again later.");
          }
        }
      }
    };
    fetchQuizResult();
  }, [user]);

  // Load completed tips from localStorage
  useEffect(() => {
    if (user && quizResult && quizResult.type) {
      const key = `growthTips_${user.uid}_${quizResult.type}`;
      const saved = localStorage.getItem(key);
      setCompletedGrowthTips(saved ? JSON.parse(saved) : []);
    }
  }, [user, quizResult]);

  // Load quiz history from localStorage
  useEffect(() => {
    if (user) {
      const key = `quizHistory_${user.uid}`;
      const saved = localStorage.getItem(key);
      setQuizHistory(saved ? JSON.parse(saved) : []);
    }
  }, [user, quizResult]);

  // Load badges from localStorage
  useEffect(() => {
    if (user) {
      const badgeKey = `badges_${user.uid}`;
      const saved = localStorage.getItem(badgeKey);
      let badgeState = saved ? JSON.parse(saved) : {};
      // Calculate badges
      badgeState.firstTest = quizHistory.length > 0;
      badgeState.explorer = (localStorage.getItem(`visitedTypes_${user.uid}`) ? JSON.parse(localStorage.getItem(`visitedTypes_${user.uid}`)!) : []).length >= 16;
      badgeState.socialSharer = !!localStorage.getItem(`sharedResults_${user.uid}`);
      badgeState.growthSeeker = quizResult && personalityTypes[quizResult.type]?.growthTips && completedGrowthTips.length === personalityTypes[quizResult.type].growthTips.length && completedGrowthTips.length > 0;
      setBadges(badgeState);
      localStorage.setItem(badgeKey, JSON.stringify(badgeState));
    }
  }, [user, quizHistory, quizResult, completedGrowthTips]);

  // Load profile from Firestore (with localStorage fallback)
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setProfileLoading(true);
        const key = `profile_${user.uid}`;
        try {
          const docRef = doc(db, "profiles", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfile(data);
            setProfileForm({ name: data.name || user.displayName || '', bio: data.bio || '' });
            localStorage.setItem(key, JSON.stringify(data));
          } else {
            // Fallback to localStorage, then save to Firestore
            const saved = localStorage.getItem(key);
            const data = saved ? JSON.parse(saved) : {};
            setProfile(data);
            setProfileForm({ name: data.name || user.displayName || '', bio: data.bio || '' });
            if (Object.keys(data).length > 0) {
              await setDoc(docRef, data);
            }
          }
        } catch (e) {
          // Fallback to localStorage only
          const saved = localStorage.getItem(key);
          const data = saved ? JSON.parse(saved) : {};
          setProfile(data);
          setProfileForm({ name: data.name || user.displayName || '', bio: data.bio || '' });
        }
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  // Load bookmarks from Firestore (with localStorage fallback)
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (user) {
        setBookmarksLoading(true);
        const key = `bookmarks_${user.uid}`;
        try {
          const docRef = doc(db, "bookmarks", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setBookmarks(data.types || []);
            localStorage.setItem(key, JSON.stringify(data.types || []));
          } else {
            // Fallback to localStorage
            const saved = localStorage.getItem(key);
            setBookmarks(saved ? JSON.parse(saved) : []);
          }
        } catch (e) {
          // Fallback to localStorage only
          const saved = localStorage.getItem(key);
          setBookmarks(saved ? JSON.parse(saved) : []);
        }
        setBookmarksLoading(false);
      }
    };
    fetchBookmarks();
  }, [user]);

  // Load reminders from Firestore (with localStorage fallback)
  useEffect(() => {
    const fetchReminders = async () => {
      if (user) {
        setRemindersLoading(true);
        const key = `reminders_${user.uid}`;
        try {
          const docRef = doc(db, "reminders", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setReminders(data.items || []);
            localStorage.setItem(key, JSON.stringify(data.items || []));
          } else {
            // Fallback to localStorage
            const saved = localStorage.getItem(key);
            setReminders(saved ? JSON.parse(saved) : []);
          }
        } catch (e) {
          // Fallback to localStorage only
          const saved = localStorage.getItem(key);
          setReminders(saved ? JSON.parse(saved) : []);
        }
        setRemindersLoading(false);
      }
    };
    fetchReminders();
  }, [user]);

  // Load streaks & stats from Firestore (with localStorage fallback)
  useEffect(() => {
    const fetchStreaksStats = async () => {
      if (user) {
        const streakKey = `streak_${user.uid}`;
        const statsKey = `stats_${user.uid}`;
        let today = new Date().toDateString();
        let streakData = { streak: 0, lastVisit: today };
        let statsData = { quizzes: quizHistory.length, typesViewed: 0, growthTips: 0 };
        // Types viewed
        const typesViewedArr = localStorage.getItem(`visitedTypes_${user.uid}`);
        statsData.typesViewed = typesViewedArr ? JSON.parse(typesViewedArr).length : 0;
        // Growth tips completed
        statsData.growthTips = completedGrowthTips.length;
        try {
          const docRef = doc(db, 'streaks', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            streakData = docSnap.data();
          } else {
            // Fallback to localStorage
            const saved = localStorage.getItem(streakKey);
            if (saved) streakData = JSON.parse(saved);
          }
        } catch (e) {
          const saved = localStorage.getItem(streakKey);
          if (saved) streakData = JSON.parse(saved);
        }
        // Streak logic
        if (streakData.lastVisit !== today) {
          const last = new Date(streakData.lastVisit);
          const diff = (new Date(today).getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
          if (diff === 1) {
            streakData.streak += 1;
          } else {
            streakData.streak = 1;
          }
          streakData.lastVisit = today;
          // Save updated streak
          localStorage.setItem(streakKey, JSON.stringify(streakData));
          try {
            await setDoc(doc(db, 'streaks', user.uid), streakData);
          } catch (e) {}
        }
        setStreak(streakData.streak);
        setLastVisit(streakData.lastVisit);
        // Stats
        try {
          const docRef = doc(db, 'stats', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            statsData = { ...statsData, ...docSnap.data() };
          } else {
            const saved = localStorage.getItem(statsKey);
            if (saved) statsData = { ...statsData, ...JSON.parse(saved) };
          }
        } catch (e) {
          const saved = localStorage.getItem(statsKey);
          if (saved) statsData = { ...statsData, ...JSON.parse(saved) };
        }
        // Save updated stats
        localStorage.setItem(statsKey, JSON.stringify(statsData));
        try {
          await setDoc(doc(db, 'stats', user.uid), statsData);
        } catch (e) {}
        setStats(statsData);
      }
    };
    fetchStreaksStats();
  }, [user, quizHistory, completedGrowthTips]);

  // Handle tip toggle
  const handleToggleTip = (tip: string) => {
    if (!user || !quizResult?.type) return;
    let updated: string[];
    if (completedGrowthTips.includes(tip)) {
      updated = completedGrowthTips.filter(t => t !== tip);
    } else {
      updated = [...completedGrowthTips, tip];
    }
    setCompletedGrowthTips(updated);
    const key = `growthTips_${user.uid}_${quizResult.type}`;
    localStorage.setItem(key, JSON.stringify(updated));
  };

  // Community click count (reuse logic from homepage)
  useEffect(() => {
    const count = parseInt(localStorage.getItem('siteClickCount') || '0', 10);
    setClickCount(count);
  }, []);

  // Example function to save a quiz result
  const saveQuizResult = async (result: any) => {
    if (!user) return;
    setSaving(true);
    const docRef = doc(db, "quizResults", user.uid);
    await setDoc(docRef, result);
    setQuizResult(result);
    setSaving(false);
  };

  // Handle profile save (Firestore + localStorage)
  const handleProfileSave = async () => {
    if (!user) return;
    const key = `profile_${user.uid}`;
    const updated = { ...profile, name: profileForm.name, bio: profileForm.bio };
    setProfile(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    setProfileLoading(true);
    try {
      await setDoc(doc(db, "profiles", user.uid), updated);
    } catch (e) {}
    setProfileLoading(false);
    setEditingProfile(false);
  };

  // Handle avatar upload (Firestore + localStorage)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const key = `profile_${user.uid}`;
      const updated = { ...profile, avatar: reader.result as string };
      setProfile(updated);
      localStorage.setItem(key, JSON.stringify(updated));
      setProfileLoading(true);
      try {
        await setDoc(doc(db, "profiles", user.uid), updated);
      } catch (e) {}
      setProfileLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Remove bookmark
  const handleRemoveBookmark = async (type: string) => {
    if (!user) return;
    const key = `bookmarks_${user.uid}`;
    const updated = bookmarks.filter(t => t !== type);
    setBookmarks(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    try {
      await setDoc(doc(db, "bookmarks", user.uid), { types: updated });
    } catch (e) {}
  };

  // Add reminder
  const handleAddReminder = async () => {
    if (!user || !reminderInput.trim()) return;
    const key = `reminders_${user.uid}`;
    const newReminder = { text: reminderInput.trim(), date: reminderDate };
    const updated = [...reminders, newReminder];
    setReminders(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    setReminderInput('');
    setReminderDate('');
    try {
      await setDoc(doc(db, "reminders", user.uid), { items: updated });
    } catch (e) {}
  };

  // Remove reminder
  const handleRemoveReminder = async (idx: number) => {
    if (!user) return;
    const key = `reminders_${user.uid}`;
    const updated = reminders.filter((_, i) => i !== idx);
    setReminders(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    try {
      await setDoc(doc(db, "reminders", user.uid), { items: updated });
    } catch (e) {}
  };

  // Data & Privacy handlers
  const handleDownloadData = () => {
    if (!user) return;
    const data = {
      profile,
      quizHistory,
      bookmarks,
      reminders,
      badges,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_personality_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCard = async () => {
    if (!shareCardRef.current) return;
    const dataUrl = await htmlToImage.toPng(shareCardRef.current, { backgroundColor: '#18192a' });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'my_personality_card.png';
    a.click();
  };

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const handleDeleteData = async () => {
    if (!user) return;
    // Remove from Firestore
    try {
      await setDoc(doc(db, 'profiles', user.uid), {});
      await setDoc(doc(db, 'quizResults', user.uid), {});
      await setDoc(doc(db, 'bookmarks', user.uid), { types: [] });
      await setDoc(doc(db, 'reminders', user.uid), { items: [] });
      await setDoc(doc(db, 'streaks', user.uid), { streak: 0, lastVisit: new Date().toDateString() });
      await setDoc(doc(db, 'stats', user.uid), { quizzes: 0, typesViewed: 0, growthTips: 0 });
    } catch (e) {}
    // Remove from localStorage
    localStorage.removeItem(`profile_${user.uid}`);
    localStorage.removeItem(`quizHistory_${user.uid}`);
    localStorage.removeItem(`bookmarks_${user.uid}`);
    localStorage.removeItem(`reminders_${user.uid}`);
    localStorage.removeItem(`badges_${user.uid}`);
    localStorage.removeItem(`streak_${user.uid}`);
    localStorage.removeItem(`stats_${user.uid}`);
    setDeleteConfirm(false);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-pink-900/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-xl text-gray-300">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-pink-900/30">
      <Navigation />
      {/* Cosmic background overlay (optional: add stars here if you want) */}
      <div className="container mx-auto px-4 py-12 pb-24 flex flex-col gap-10">
        {/* Profile Customization Card */}
        {user && (
          <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl text-left flex flex-col gap-4 mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Profile</h2>
            {profileLoading ? (
              <div className="text-gray-300">Loading profile...</div>
            ) : (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex flex-col items-center">
                <label htmlFor="avatar-upload" className="cursor-pointer group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-4 border-purple-400 shadow-lg flex items-center justify-center overflow-hidden mb-2">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle2 className="w-16 h-16 text-white/80 group-hover:text-pink-300 transition-colors" />
                    )}
                  </div>
                  <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  <span className="text-xs text-purple-200 group-hover:text-pink-300 transition-colors">Change Avatar</span>
                </label>
              </div>
              <div className="flex-1">
                {editingProfile ? (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      className="bg-[#232946]/80 border border-purple-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder="Display Name"
                      value={profileForm.name}
                      onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                    />
                    <textarea
                      className="bg-[#232946]/80 border border-purple-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder="Short Bio"
                      value={profileForm.bio}
                      onChange={e => setProfileForm(f => ({ ...f, bio: e.target.value }))}
                      rows={2}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={handleProfileSave} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all">Save</button>
                      <button onClick={() => setEditingProfile(false)} className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition-all">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="text-lg font-bold text-white">{profile.name || user.displayName || user.email || 'User'}</div>
                    <div className="text-gray-300 text-sm mb-2">{profile.bio || 'No bio set.'}</div>
                    <button onClick={() => setEditingProfile(true)} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all w-max">Edit Profile</button>
                  </div>
                )}
              </div>
            </div>
            )}
          </div>
        )}
        {/* Personality Type Deep Dive Card */}
        {quizResult && personalityTypes[quizResult.type] && (
          <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl text-left flex flex-col gap-4 mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-2">
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold text-white mb-1">
                  {personalityTypes[quizResult.type].code} - {personalityTypes[quizResult.type].name}
                </h2>
                <div className="text-gray-200 mb-2">{personalityTypes[quizResult.type].description}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {personalityTypes[quizResult.type].strengths && (
                    <div>
                      <span className="font-bold text-purple-300">Strengths:</span>
                      {personalityTypes[quizResult.type].strengths.slice(0, 3).map((s, i) => (
                        <span key={i} className="ml-2 bg-purple-400/20 text-purple-100 px-2 py-1 rounded-full text-xs font-semibold">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {personalityTypes[quizResult.type].weaknesses && (
                    <div>
                      <span className="font-bold text-pink-300">Weaknesses:</span>
                      {personalityTypes[quizResult.type].weaknesses.slice(0, 3).map((w, i) => (
                        <span key={i} className="ml-2 bg-pink-400/20 text-pink-100 px-2 py-1 rounded-full text-xs font-semibold">{w}</span>
                      ))}
                    </div>
                  )}
                </div>
                {personalityTypes[quizResult.type].careers && (
                  <div className="mb-2">
                    <span className="font-bold text-green-300">Best Careers:</span>
                    {personalityTypes[quizResult.type].careers.slice(0, 3).map((c, i) => (
                      <span key={i} className="ml-2 bg-green-400/20 text-green-100 px-2 py-1 rounded-full text-xs font-semibold">{c}</span>
                    ))}
                  </div>
                )}
                {personalityTypes[quizResult.type].famous && (
                  <div className="mb-2">
                    <span className="font-bold text-yellow-300">Famous:</span>
                    {personalityTypes[quizResult.type].famous.slice(0, 3).map((f, i) => (
                      <span key={i} className="ml-2 bg-yellow-400/20 text-yellow-100 px-2 py-1 rounded-full text-xs font-semibold">{f}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Growth Tracker Card */}
        {quizResult && personalityTypes[quizResult.type]?.growthTips && (
          <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl text-left flex flex-col gap-4 mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Growth Tracker</h2>
            <div className="text-gray-200 mb-4">Personal growth tips for your type. Check them off as you progress!</div>
            <ul className="space-y-3">
              {personalityTypes[quizResult.type].growthTips.map((tip: string, idx: number) => (
                <li key={idx} className="flex items-center gap-3">
                  <button
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${completedGrowthTips.includes(tip) ? 'bg-green-500 border-green-400' : 'bg-transparent border-purple-400'}`}
                    aria-label={completedGrowthTips.includes(tip) ? 'Mark as incomplete' : 'Mark as complete'}
                    onClick={() => handleToggleTip(tip)}
                  >
                    {completedGrowthTips.includes(tip) && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    )}
                  </button>
                  <span className={`text-gray-100 ${completedGrowthTips.includes(tip) ? 'line-through opacity-60' : ''}`}>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Streaks & Stats Card */}
        {user && (
          <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl text-left flex flex-col gap-4 mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Streaks & Stats</h2>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-green-400">{streak}</span>
                <span className="text-sm text-gray-300">Day Streak</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-blue-400">{stats.quizzes}</span>
                <span className="text-sm text-gray-300">Quizzes Taken</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-purple-400">{stats.typesViewed}</span>
                <span className="text-sm text-gray-300">Types Viewed</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-pink-400">{stats.growthTips}</span>
                <span className="text-sm text-gray-300">Growth Tips Completed</span>
              </div>
            </div>
            {streak === 0 && stats.quizzes === 0 && stats.typesViewed === 0 && stats.growthTips === 0 && (
              <div className="text-gray-400 mt-4">Start exploring, taking quizzes, and growing to build your streak and stats!</div>
            )}
          </div>
        )}
        {/* Badges & Achievements Card */}
        {user && (
          <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl text-left flex flex-col gap-4 mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Badges & Achievements</h2>
            <div className="flex flex-wrap gap-6 items-center">
              {/* First Test Completed */}
              <div className="flex flex-col items-center">
                <Award className={`w-8 h-8 mb-1 ${badges.firstTest ? 'text-yellow-400' : 'text-gray-500 opacity-40'}`} />
                <span className={`text-sm font-bold ${badges.firstTest ? 'text-yellow-200' : 'text-gray-400'}`}>First Test</span>
              </div>
              {/* Explorer */}
              <div className="flex flex-col items-center">
                <Globe className={`w-8 h-8 mb-1 ${badges.explorer ? 'text-blue-400' : 'text-gray-500 opacity-40'}`} />
                <span className={`text-sm font-bold ${badges.explorer ? 'text-blue-200' : 'text-gray-400'}`}>Explorer</span>
              </div>
              {/* Social Sharer */}
              <div className="flex flex-col items-center">
                <Share2 className={`w-8 h-8 mb-1 ${badges.socialSharer ? 'text-pink-400' : 'text-gray-500 opacity-40'}`} />
                <span className={`text-sm font-bold ${badges.socialSharer ? 'text-pink-200' : 'text-gray-400'}`}>Social Sharer</span>
              </div>
              {/* Growth Seeker */}
              <div className="flex flex-col items-center">
                <CheckCircle className={`w-8 h-8 mb-1 ${badges.growthSeeker ? 'text-green-400' : 'text-gray-500 opacity-40'}`} />
                <span className={`text-sm font-bold ${badges.growthSeeker ? 'text-green-200' : 'text-gray-400'}`}>Growth Seeker</span>
              </div>
            </div>
            {Object.values(badges).every(v => !v) && (
              <div className="text-gray-400 mt-4">No badges earned yet. Complete actions to unlock achievements!</div>
            )}
          </div>
        )}
        {/* Quiz History Card */}
        {user && (
          <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl text-left flex flex-col gap-4 mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Quiz History</h2>
            {quizHistory.length === 0 ? (
              <div className="text-gray-400">No quiz history found.</div>
            ) : (
              <ul className="space-y-2">
                {quizHistory.slice(-5).reverse().map((entry, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <span className="font-bold text-purple-200">{entry.type}</span>
                    <span className="text-gray-300 text-xs">{new Date(entry.date).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {/* Bookmarks Card */}
        {user && (
          <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl text-left flex flex-col gap-4 mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Bookmarks</h2>
            {bookmarksLoading ? (
              <div className="text-gray-300">Loading bookmarks...</div>
            ) : bookmarks.length === 0 ? (
              <div className="text-gray-400">No bookmarks yet. Bookmark personality types to see them here!</div>
            ) : (
              <ul className="space-y-2">
                {bookmarks.map((type, idx) => (
                  <li key={type} className="flex items-center gap-4">
                    <span className="font-bold text-purple-200">{type}</span>
                    <span className="text-gray-300 text-sm">{personalityTypes[type]?.name || ''}</span>
                    <button onClick={() => handleRemoveBookmark(type)} className="ml-auto text-pink-400 hover:text-pink-600 font-bold">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {/* Notifications & Reminders Card */}
        {user && (
          <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl text-left flex flex-col gap-4 mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Notifications & Reminders</h2>
            {/* Site notifications (hardcoded for now) */}
            <div className="mb-4">
              <div className="text-purple-200 font-bold mb-1">Site Updates</div>
              <ul className="list-disc pl-5 text-gray-200 text-sm space-y-1">
                <li>🎉 New dashboard features rolling out now!</li>
                <li>🌌 Enjoy the new cosmic, glassy design everywhere.</li>
                <li>🔒 Your profile and bookmarks now sync across devices.</li>
              </ul>
            </div>
            {/* Personal reminders */}
            <div className="mb-2">
              <div className="text-pink-200 font-bold mb-1">Your Reminders</div>
              {remindersLoading ? (
                <div className="text-gray-300">Loading reminders...</div>
              ) : reminders.length === 0 ? (
                <div className="text-gray-400">No reminders set. Add one below!</div>
              ) : (
                <ul className="space-y-2">
                  {reminders.map((rem, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-gray-100">{rem.text}</span>
                      {rem.date && <span className="text-xs text-gray-400">({new Date(rem.date).toLocaleDateString()})</span>}
                      <button onClick={() => handleRemoveReminder(idx)} className="ml-auto text-pink-400 hover:text-pink-600 font-bold">Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center mt-2">
              <input
                type="text"
                className="flex-1 bg-[#232946]/80 border border-purple-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Add a reminder (e.g., Retake the test in 3 months)"
                value={reminderInput}
                onChange={e => setReminderInput(e.target.value)}
              />
              <input
                type="date"
                className="bg-[#232946]/80 border border-purple-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={reminderDate}
                onChange={e => setReminderDate(e.target.value)}
              />
              <button
                onClick={handleAddReminder}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                Add
              </button>
            </div>
          </div>
        )}
        {/* Data & Privacy Card */}
        {user && (
          <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl text-left flex flex-col gap-4 mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Data & Privacy</h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={handleDownloadData}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Download My Data (JSON)
              </button>
              <button
                onClick={handleDownloadCard}
                className="bg-gradient-to-r from-green-400 to-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:from-green-500 hover:to-blue-700 transition-all"
              >
                Download My Card (PNG)
              </button>
              <button
                onClick={() => setDeleteConfirm(true)}
                className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold hover:from-pink-600 hover:to-red-700 transition-all"
              >
                Delete My Data
              </button>
            </div>
            {deleteConfirm && (
              <div className="mt-4 bg-red-900/60 border border-red-400 rounded-lg p-4 text-red-200">
                <div className="font-bold mb-2">Are you sure you want to delete all your data? This cannot be undone.</div>
                <div className="flex gap-2">
                  <button
                    onClick={handleDeleteData}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-all"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {/* Hidden shareable card for PNG export */}
            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
              <div ref={shareCardRef} className="w-[420px] bg-[#18192a] rounded-2xl border border-purple-400/40 shadow-2xl p-8 flex flex-col items-center text-center font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-4 border-purple-400 shadow-lg flex items-center justify-center overflow-hidden mb-4">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle2 className="w-16 h-16 text-white/80" />
                  )}
                </div>
                {/* Name & Bio */}
                <div className="text-2xl font-extrabold text-white mb-1">{profile.name || user.displayName || user.email || 'User'}</div>
                <div className="text-gray-300 text-base mb-4">{profile.bio || ''}</div>
                {/* Type & Summary */}
                {quizResult && personalityTypes[quizResult.type] && (
                  <>
                    <div className="text-lg font-bold text-purple-200 mb-1">{personalityTypes[quizResult.type].code} - {personalityTypes[quizResult.type].name}</div>
                    <div className="text-gray-200 text-sm mb-4">{personalityTypes[quizResult.type].description}</div>
                  </>
                )}
                {/* Streaks & Stats */}
                <div className="flex flex-wrap gap-6 justify-center mb-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-green-400">{streak}</span>
                    <span className="text-xs text-gray-300">Day Streak</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-blue-400">{stats.quizzes}</span>
                    <span className="text-xs text-gray-300">Quizzes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-purple-400">{stats.typesViewed}</span>
                    <span className="text-xs text-gray-300">Types Viewed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-pink-400">{stats.growthTips}</span>
                    <span className="text-xs text-gray-300">Growth Tips</span>
                  </div>
                </div>
                {/* Badges */}
                <div className="flex flex-wrap gap-4 justify-center mb-4">
                  {badges.firstTest && <span className="bg-yellow-400/20 text-yellow-200 px-3 py-1 rounded-full text-xs font-bold">First Test</span>}
                  {badges.explorer && <span className="bg-blue-400/20 text-blue-200 px-3 py-1 rounded-full text-xs font-bold">Explorer</span>}
                  {badges.socialSharer && <span className="bg-pink-400/20 text-pink-200 px-3 py-1 rounded-full text-xs font-bold">Social Sharer</span>}
                  {badges.growthSeeker && <span className="bg-green-400/20 text-green-200 px-3 py-1 rounded-full text-xs font-bold">Growth Seeker</span>}
                </div>
                {/* Branding */}
                <div className="mt-2 text-xs text-purple-400 font-bold">Powered by PersonalityTest</div>
              </div>
            </div>
          </div>
        )}
        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link href="/personalities" className="bg-[#18192a]/90 rounded-2xl p-6 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center hover:scale-[1.03] transition-all">
            <Users className="w-8 h-8 text-blue-400 mb-2" />
            <div className="text-lg font-bold text-white mb-1">Explore Types</div>
            <div className="text-gray-200 text-sm">See all 16 personality types</div>
          </Link>
          <Link href="/growth" className="bg-[#18192a]/90 rounded-2xl p-6 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center hover:scale-[1.03] transition-all">
            <Lightbulb className="w-8 h-8 text-pink-400 mb-2" />
            <div className="text-lg font-bold text-white mb-1">Growth</div>
            <div className="text-gray-200 text-sm">Personal growth tips for your type</div>
          </Link>
          <Link href="/compatibility" className="bg-[#18192a]/90 rounded-2xl p-6 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center hover:scale-[1.03] transition-all">
            <Users className="w-8 h-8 text-purple-400 mb-2" />
            <div className="text-lg font-bold text-white mb-1">Compatibility</div>
            <div className="text-gray-200 text-sm">See how types connect in relationships</div>
          </Link>
          <Link href="/careers" className="bg-[#18192a]/90 rounded-2xl p-6 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center hover:scale-[1.03] transition-all">
            <Target className="w-8 h-8 text-green-400 mb-2" />
            <div className="text-lg font-bold text-white mb-1">Careers</div>
            <div className="text-gray-200 text-sm">Best jobs for your personality</div>
          </Link>
          <Link href="/faq" className="bg-[#18192a]/90 rounded-2xl p-6 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center hover:scale-[1.03] transition-all">
            <Book className="w-8 h-8 text-yellow-400 mb-2" />
            <div className="text-lg font-bold text-white mb-1">FAQ</div>
            <div className="text-gray-200 text-sm">Answers to common questions</div>
          </Link>
          <Link href="/about" className="bg-[#18192a]/90 rounded-2xl p-6 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center hover:scale-[1.03] transition-all">
            <Info className="w-8 h-8 text-pink-400 mb-2" />
            <div className="text-lg font-bold text-white mb-1">About</div>
            <div className="text-gray-200 text-sm">Learn about this project</div>
          </Link>
        </div>
        {/* Community Card */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto bg-[#18192a]/90 rounded-3xl p-6 sm:p-8 md:p-10 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center">
          <h3 className="text-2xl font-extrabold text-purple-100 mb-4 flex flex-col items-center">
            Join the Community!
            <span className="mt-2 text-base text-gray-300">Follow us on</span>
            <a href="https://www.instagram.com/codesentinel.tech/" target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center justify-center text-pink-400 hover:text-pink-500 transition-colors">
              <Instagram className="w-7 h-7" />
            </a>
          </h3>
          <p className="text-lg text-gray-200 mb-2">
            <span className="font-bold text-pink-400 text-2xl">{clickCount.toLocaleString()}</span> personalities and counting—add yours!
          </p>
        </div>
      </div>
    </div>
  );
}
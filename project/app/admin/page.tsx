"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { collection, getDocs, DocumentData, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Trash2 } from "lucide-react";

function getStartOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
function getStartOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
function getStartOfMonth(date = new Date()) {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [clicks, setClicks] = useState<DocumentData[]>([]);
  const [loadingClicks, setLoadingClicks] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtering state
  const [filterLink, setFilterLink] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filtered and paginated clicks
  const filteredClicks = useMemo(() => {
    return clicks.filter(click =>
      (!filterLink || (click.link && click.link.toLowerCase().includes(filterLink.toLowerCase()))) &&
      (!filterCountry || (click.country && click.country.toLowerCase().includes(filterCountry.toLowerCase())))
    );
  }, [clicks, filterLink, filterCountry]);
  const paginatedClicks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredClicks.slice(start, start + pageSize);
  }, [filteredClicks, page, pageSize]);
  const totalPages = Math.ceil(filteredClicks.length / pageSize);

  // User management state
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);
  const [filterUser, setFilterUser] = useState("");
  const [userPage, setUserPage] = useState(1);
  const userPageSize = 10;

  // Fetch users from quizResults
  useEffect(() => {
    async function fetchUsers() {
      setLoadingUsers(true);
      try {
        const snap = await getDocs(collection(db, "quizResults"));
        const data = snap.docs.map(docSnap => ({ _docId: docSnap.id, ...docSnap.data() }));
        setUsers(data);
        setUserError(null);
      } catch (e) {
        setUserError("Failed to load users");
      }
      setLoadingUsers(false);
    }
    fetchUsers();
  }, []);

  // Filtered and paginated users
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      !filterUser ||
      (user._docId && user._docId.toLowerCase().includes(filterUser.toLowerCase())) ||
      (user.type && user.type.toLowerCase().includes(filterUser.toLowerCase()))
    );
  }, [users, filterUser]);
  const paginatedUsers = useMemo(() => {
    const start = (userPage - 1) * userPageSize;
    return filteredUsers.slice(start, start + userPageSize);
  }, [filteredUsers, userPage, userPageSize]);
  const userTotalPages = Math.ceil(filteredUsers.length / userPageSize);

  useEffect(() => {
    if (loading) return;
    if (!user || user.email !== "pranav16022016@gmail.com") {
      router.replace("/404");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchClicks() {
      setLoadingClicks(true);
      try {
        const snap = await getDocs(collection(db, "clicks"));
        const data = snap.docs.map(docSnap => ({ ...docSnap.data(), _docId: docSnap.id }));
        setClicks(data);
        setError(null);
      } catch (e) {
        setError("Failed to load analytics");
      }
      setLoadingClicks(false);
    }
    fetchClicks();
  }, []);

  // Delete click event
  async function handleDeleteClick(docId: string) {
    if (!window.confirm("Are you sure you want to delete this click event?")) return;
    await deleteDoc(doc(db, "clicks", docId));
    // Refresh clicks
    setClicks(clicks => clicks.filter(c => c._docId !== docId));
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black/80">
        <div className="text-white text-2xl font-bold animate-pulse">Loading Admin Dashboard...</div>
      </div>
    );
  }
  if (user.email !== "pranav16022016@gmail.com") {
    return null;
  }

  // Aggregate analytics
  const now = new Date();
  const today = getStartOfDay(now);
  const week = getStartOfWeek(now);
  const month = getStartOfMonth(now);
  let totalClicks = clicks.length;
  let todayClicks = 0, weekClicks = 0, monthClicks = 0;
  let regionMap: Record<string, number> = {}, countryMap: Record<string, number> = {};
  let chartLabels: string[] = [], chartCounts: any[] = [];
  // Always provide a valid chartData object
  let chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Clicks per Day",
        data: chartCounts,
        backgroundColor: "#a855f7",
      },
    ],
  };

  if (clicks.length) {
    // Count by day for last 14 days
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (13 - i));
      d.setHours(0, 0, 0, 0);
      return d;
    });
    chartLabels = days.map(d => d.toLocaleDateString());
    chartCounts = days.map(d => 0);
    clicks.forEach(click => {
      const t = new Date(click.timestamp);
      if (t >= today) todayClicks++;
      if (t >= week) weekClicks++;
      if (t >= month) monthClicks++;
      // Chart
      for (let i = 0; i < days.length; i++) {
        if (t >= days[i] && (i === days.length - 1 || t < days[i + 1])) {
          chartCounts[i]++;
          break;
        }
      }
      // Region/Country
      if (click.region) regionMap[click.region] = (regionMap[click.region] || 0) + 1;
      if (click.country) countryMap[click.country] = (countryMap[click.country] || 0) + 1;
    });
    chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: "Clicks per Day",
          data: chartCounts,
          backgroundColor: "#a855f7",
        },
      ],
    };
  }

  return (
    <main className="min-h-screen pt-24 bg-gradient-to-br from-[#1a0033] via-[#2d004d] to-[#0a001a] flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl p-8 rounded-2xl bg-white/5 border border-purple-500 shadow-xl backdrop-blur-md mt-8">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wide neon-glow">Admin Dashboard</h1>
        <p className="text-lg text-purple-200 mb-8">Welcome, Pranav! Here you can view all site activity and manage the platform.</p>
        {loadingClicks ? (
          <div className="text-white/80 text-center py-12 text-xl font-semibold opacity-60">Loading analytics...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-12 text-xl font-semibold">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-[#18192a]/80 rounded-xl p-6 border border-purple-400/30 shadow-lg flex flex-col items-center">
                <div className="text-3xl font-extrabold text-white mb-2">{totalClicks}</div>
                <div className="text-purple-200 font-bold">Total Clicks</div>
              </div>
              <div className="bg-[#18192a]/80 rounded-xl p-6 border border-purple-400/30 shadow-lg flex flex-col items-center">
                <div className="text-3xl font-extrabold text-white mb-2">{todayClicks}</div>
                <div className="text-purple-200 font-bold">Clicks Today</div>
              </div>
              <div className="bg-[#18192a]/80 rounded-xl p-6 border border-purple-400/30 shadow-lg flex flex-col items-center">
                <div className="text-3xl font-extrabold text-white mb-2">{weekClicks}</div>
                <div className="text-purple-200 font-bold">Clicks This Week</div>
              </div>
              <div className="bg-[#18192a]/80 rounded-xl p-6 border border-purple-400/30 shadow-lg flex flex-col items-center">
                <div className="text-3xl font-extrabold text-white mb-2">{monthClicks}</div>
                <div className="text-purple-200 font-bold">Clicks This Month</div>
              </div>
            </div>
            <div className="bg-[#18192a]/80 rounded-2xl p-6 border border-purple-400/30 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Clicks Over Time</h2>
              <Bar data={chartData} options={{ plugins: { legend: { labels: { color: '#fff' } } }, scales: { x: { ticks: { color: '#fff' } }, y: { ticks: { color: '#fff' } } } }} />
            </div>
            <div className="bg-[#18192a]/80 rounded-2xl p-6 border border-purple-400/30 shadow-lg mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">Click Event Explorer</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Filter by link..."
                  value={filterLink}
                  onChange={e => { setPage(1); setFilterLink(e.target.value); }}
                  className="bg-[#232946] border border-purple-400/30 rounded-lg px-3 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Filter by country..."
                  value={filterCountry}
                  onChange={e => { setPage(1); setFilterCountry(e.target.value); }}
                  className="bg-[#232946] border border-purple-400/30 rounded-lg px-3 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full text-sm text-left text-purple-100">
                  <thead className="bg-[#2d004d]/80">
                    <tr>
                      <th className="px-4 py-2">Link</th>
                      <th className="px-4 py-2">Href</th>
                      <th className="px-4 py-2">User</th>
                      <th className="px-4 py-2">Country</th>
                      <th className="px-4 py-2">Region</th>
                      <th className="px-4 py-2">Timestamp</th>
                      <th className="px-4 py-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedClicks.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-8 text-purple-300">No click events found.</td></tr>
                    ) : paginatedClicks.map((click, i) => (
                      <tr key={i} className="border-b border-purple-400/10 hover:bg-[#232946]/60 transition-all">
                        <td className="px-4 py-2">{click.link}</td>
                        <td className="px-4 py-2 break-all">{click.href}</td>
                        <td className="px-4 py-2">{click.userEmail || <span className="italic text-purple-400">Anonymous</span>}</td>
                        <td className="px-4 py-2">{click.country || <span className="text-purple-400">-</span>}</td>
                        <td className="px-4 py-2">{click.region || <span className="text-purple-400">-</span>}</td>
                        <td className="px-4 py-2">{click.timestamp ? new Date(click.timestamp).toLocaleString() : '-'}</td>
                        <td className="px-4 py-2 text-center">
                          <button
                            className="text-red-400 hover:text-red-600 transition-colors"
                            title="Delete click event"
                            onClick={() => handleDeleteClick(click._docId)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-purple-200">Page {page} of {totalPages || 1}</span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-purple-700/60 text-white font-bold disabled:opacity-40"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >Prev</button>
                  <button
                    className="px-3 py-1 rounded bg-purple-700/60 text-white font-bold disabled:opacity-40"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || totalPages === 0}
                  >Next</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#18192a]/80 rounded-xl p-6 border border-purple-400/30 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Top Countries</h3>
                <ul className="text-purple-100 space-y-2">
                  {Object.entries(countryMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([country, count]) => (
                    <li key={country} className="flex justify-between"><span>{country}</span><span className="font-bold">{count}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#18192a]/80 rounded-xl p-6 border border-purple-400/30 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Top Regions</h3>
                <ul className="text-purple-100 space-y-2">
                  {Object.entries(regionMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([region, count]) => (
                    <li key={region} className="flex justify-between"><span>{region}</span><span className="font-bold">{count}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            {/* User Management Section */}
            <div className="bg-[#18192a]/80 rounded-2xl p-6 border border-purple-400/30 shadow-lg mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">User Management</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Filter by UID or type..."
                  value={filterUser}
                  onChange={e => { setUserPage(1); setFilterUser(e.target.value); }}
                  className="bg-[#232946] border border-purple-400/30 rounded-lg px-3 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {loadingUsers ? (
                <div className="text-white/80 text-center py-8 text-lg font-semibold opacity-60">Loading users...</div>
              ) : userError ? (
                <div className="text-red-400 text-center py-8 text-lg font-semibold">{userError}</div>
              ) : (
                <div className="overflow-x-auto rounded-xl">
                  <table className="min-w-full text-sm text-left text-purple-100">
                    <thead className="bg-[#2d004d]/80">
                      <tr>
                        <th className="px-4 py-2">UID</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Scores</th>
                        <th className="px-4 py-2">Percentages</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-8 text-purple-300">No users found.</td></tr>
                      ) : paginatedUsers.map((user, i) => (
                        <tr key={user._docId} className="border-b border-purple-400/10 hover:bg-[#232946]/60 transition-all">
                          <td className="px-4 py-2 break-all font-mono">{user._docId}</td>
                          <td className="px-4 py-2">{user.type || <span className="italic text-purple-400">-</span>}</td>
                          <td className="px-4 py-2">{user.scores ? JSON.stringify(user.scores) : <span className="text-purple-400">-</span>}</td>
                          <td className="px-4 py-2">{user.percentages ? JSON.stringify(user.percentages) : <span className="text-purple-400">-</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex justify-between items-center mt-4">
                <span className="text-purple-200">Page {userPage} of {userTotalPages || 1}</span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-purple-700/60 text-white font-bold disabled:opacity-40"
                    onClick={() => setUserPage(p => Math.max(1, p - 1))}
                    disabled={userPage === 1}
                  >Prev</button>
                  <button
                    className="px-3 py-1 rounded bg-purple-700/60 text-white font-bold disabled:opacity-40"
                    onClick={() => setUserPage(p => Math.min(userTotalPages, p + 1))}
                    disabled={userPage === userTotalPages || userTotalPages === 0}
                  >Next</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// Add a neon-glow effect for headings
// You can add this to your global CSS if not already present:
// .neon-glow { text-shadow: 0 0 8px #a855f7, 0 0 16px #a855f7, 0 0 32px #a855f7; } 
// If you see a missing module error for react-chartjs-2, run:
// npm install react-chartjs-2 chart.js 
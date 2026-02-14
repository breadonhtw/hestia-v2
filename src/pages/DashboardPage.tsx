import { useAuthStore } from "../stores/authStore";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Signed in as: {user?.email}</p>
      <button
        onClick={signOut}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Sign out
      </button>
    </div>
  );
}

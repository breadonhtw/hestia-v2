import { useAuthStore } from "../stores/authStore";

export default function DashboardPage() {
  const profile = useAuthStore((s) => s.profile);
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {profile?.name}!</h1>
      <button
        onClick={signOut}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Sign out
      </button>
    </div>
  );
}

import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const signInWithMagicLink = useAuthStore((s) => s.signInWithMagicLink);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signInWithMagicLink(email);

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We sent a magic link to <strong>{email}</strong>. Click the link in
            the email to sign in.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-sm text-gray-900 underline hover:no-underline"
          >
            Try a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left panel — form */}
      <div className="flex flex-col justify-between px-8 py-10 sm:px-16 lg:px-20">
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          {/* Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 mb-10 mx-auto"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>

          <h1 className="text-3xl font-bold text-center mb-2">
            {isSignUp ? "Create your account" : "Welcome back!"}
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Your work, your team, your flow — all in one place.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit}>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none mb-4 text-sm"
            />

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 disabled:opacity-50 transition text-sm font-medium"
            >
              {loading
                ? "Sending…"
                : isSignUp
                  ? "Sign up with email"
                  : "Sign in with email"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-gray-900 font-medium underline hover:no-underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-8">
          <span className="hover:text-gray-600 cursor-pointer">Help</span>
          <span>/</span>
          <span className="hover:text-gray-600 cursor-pointer">Terms</span>
          <span>/</span>
          <span className="hover:text-gray-600 cursor-pointer">Privacy</span>
        </div>
      </div>

      {/* Right panel — hero image */}
      <div className="hidden lg:block relative">
        <img
          src="https://images.unsplash.com/photo-1627743914480-5c0a391767f0?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mountain landscape"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

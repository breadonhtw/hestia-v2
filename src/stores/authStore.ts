import { create } from "zustand";
import type { User, Session } from "@supabase/supabase-js";
import type { Tables } from "../lib/database.types";
import supabase from "../lib/supabase";

type Profile = Tables<"profiles">;

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: Profile | null;
  profileLoading: boolean;
  setSession: (session: Session | null) => void;
  signInWithMagicLink: (email: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
  createProfile: (
    name: string,
    phone: string,
  ) => Promise<{ error: Error | null }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  profile: null,
  profileLoading: true,

  setSession: (session) => set({ session, user: session?.user ?? null }),

  signInWithMagicLink: async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return { error: error as Error | null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, profile: null });
  },

  fetchProfile: async (userId: string) => {
    set({ profileLoading: true });
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    set({ profile: data ?? null, profileLoading: false });
  },

  createProfile: async (name: string, phone: string) => {
    const user = get().user;
    if (!user) return { error: new Error("Not authenticated") };

    const { data, error } = await supabase
      .from("profiles")
      .insert({ id: user.id, name, phone })
      .select()
      .single();

    if (error) return { error: error as Error };
    set({ profile: data });
    return { error: null };
  },

  initialize: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null, loading: false });

    if (session?.user) {
      await get().fetchProfile(session.user.id);
    } else {
      set({ profileLoading: false });
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      set({ session, user: session?.user ?? null, loading: false });
      if (session?.user) {
        await get().fetchProfile(session.user.id);
      } else {
        set({ profile: null, profileLoading: false });
      }
    });
  },
}));

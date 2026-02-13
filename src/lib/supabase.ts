import { createClient } from "@supabase/supabase-js";
import type { Database } from "/Users/brandon/Desktop/hestia-v2/src/lib/database.types.ts";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default supabase;

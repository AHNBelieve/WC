// src/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const checkSession = async () => {
  const auth = await supabase.auth.getSession();
  if (auth) {
    return true;
  } else {
    return false;
  }
};

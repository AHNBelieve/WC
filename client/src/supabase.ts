// src/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const getToken = async () => {
  const token = await supabase.auth
    .getSession()
    .then(({ data: { session } }) => session?.access_token);
  return token;
};

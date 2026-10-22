import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://djyilvmysdniwqmfbkgg.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqeWlsdm15c2RuaXdxbWZia2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2Nzc3ODUsImV4cCI6MjEwODI1Mzc4NX0.yDKjtnaXxHND4Wd-Bb0RLsTL1jZFKfW-p2tzg9GwjFY";

export const supabaseUrl =
  import.meta.env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const supabaseAnonKey =
  import.meta.env?.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "feeta_supabase_auth",
  },
});

/**
 * Helper to fetch published public content for a given type
 */
export async function fetchPublicContent(type) {
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("type", type)
    .eq("status", "published")
    .eq("visible", true)
    .is("deleted_at", null)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching public content for ${type}:`, error);
    return [];
  }

  return (data || []).map((row) => ({
    ...row,
    data: typeof row.data === "string" ? JSON.parse(row.data) : row.data,
  }));
}

/**
 * Helper to submit contact form or user inquiry
 */
export async function submitInquiry(formData) {
  const id = crypto.randomUUID();
  const { error } = await supabase
    .from("submissions")
    .insert([
      {
        id,
        data: formData,
        is_read: false,
      },
    ]);

  if (error) throw error;
  return { ok: true, id };
}

/**
 * Upload an asset to Supabase Storage in 'uploads' bucket
 */
export async function uploadMedia(file, customPath = "") {
  const fileExt = file.name ? file.name.split(".").pop() : "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = customPath ? `${customPath}/${fileName}` : fileName;

  const { error: uploadError } = await supabase.storage
    .from("uploads")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("uploads").getPublicUrl(filePath);
  return data.publicUrl;
}

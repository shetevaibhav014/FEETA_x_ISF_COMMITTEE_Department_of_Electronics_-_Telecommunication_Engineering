import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function usePublicContent(type) {
  const [content, setContent] = useState({ items: [], initialized: false });

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      try {
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
          console.warn(`Supabase load error for ${type}:`, error.message);
          if (isMounted) setContent({ items: [], initialized: false });
          return;
        }

        const formattedItems = (data || []).map((row) => ({
          ...row,
          data: typeof row.data === "string" ? JSON.parse(row.data) : (row.data || {}),
          visible: Boolean(row.visible),
        }));

        if (isMounted) {
          setContent({
            items: formattedItems,
            initialized: formattedItems.length > 0,
          });
        }
      } catch (err) {
        console.error(`Unexpected error loading ${type}:`, err);
        if (isMounted) setContent({ items: [], initialized: false });
      }
    }

    loadContent();

    // Subscribe to live database changes so frontend auto-updates when admin edits content
    const channel = supabase
      .channel(`public:content:${type}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "content",
          filter: `type=eq.${type}`,
        },
        () => {
          loadContent();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [type]);

  return content;
}

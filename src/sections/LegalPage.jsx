import { useLocation } from "react-router-dom";
import usePublicContent from "../hooks/usePublicContent";

export default function LegalPage() {
  const { pathname } = useLocation();
  const { items: pages } = usePublicContent("legal");
  const page = pages.find((entry) => entry.data.slug === pathname.slice(1)) || null;

  return (
    <section className="px-6 pb-24 pt-36">
      <article className="mx-auto max-w-3xl">
        <p className="section-subtitle">ETC Forum</p>
        <h1 className="section-title">{page?.title || (pathname === "/privacy" ? "Privacy policy" : "Terms of use")}</h1>
        {page?.data.content ? (
          <div className="mt-8 space-y-4 whitespace-pre-wrap leading-8 text-[var(--text-secondary)]">{page.data.content}</div>
        ) : (
          <p className="mt-8 leading-8 text-[var(--text-secondary)]">
            This page has not been published yet. Please contact the ETC Forum for information.
          </p>
        )}
      </article>
    </section>
  );
}

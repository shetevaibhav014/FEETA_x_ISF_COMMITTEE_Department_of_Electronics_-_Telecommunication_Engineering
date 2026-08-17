import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Error 404
      </p>

      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
        Page Not Found
      </h1>

      <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-10 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.8)]"
      >
        Back to Home
      </Link>
    </main>
  );
}

export default NotFound;

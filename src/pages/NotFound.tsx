import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
      <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
        404
      </p>
      <h1 className="font-display text-5xl md:text-7xl tracking-wide mb-6">
        Page not found.
      </h1>
      <Link
        href="/"
        className="text-primary font-mono text-sm tracking-wider uppercase border-b border-primary/40 hover:border-primary"
      >
        ← Back home
      </Link>
    </div>
  );
}

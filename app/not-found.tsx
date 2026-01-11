import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-lg text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
      >
        Back to home
      </Link>
    </div>
  );
}

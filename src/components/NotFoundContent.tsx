import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export function NotFoundContent() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-16 text-foreground sm:px-10">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">
          Lost in Code?
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          The page you are looking for has been moved, deleted, or never
          existed.
        </p>
        <div className="mt-10 w-full sm:w-xl rounded-2xl border border-border bg-background/80 p-4 sm:p-6 text-left shadow-lg shadow-primary/5">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          </div>
          <pre className="font-mono text-sm text-muted-foreground">
            {`// Exception: PageNotFound`}
          </pre>
          <pre className="mt-3 overflow-x-auto font-mono text-sm text-foreground">
            {`if (!navigationPath.exists) {
  return redirect('/home')
}`}
          </pre>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            <Link href="/">Return to Home</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="gap-2 border-border text-foreground hover:bg-muted"
            size="lg"
          >
            <Link href="/contact">Report a broken link</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

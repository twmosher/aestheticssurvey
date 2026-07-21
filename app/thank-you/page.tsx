import { ShareActions } from "@/components/site/share-actions";

export default function ThankYouPage() {
  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <section className="hero-panel space-y-8">
          <div className="hero-panel__topline" />
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--clay))]">
              Thank you
            </p>
            <h1 className="font-[family:var(--font-display)] text-4xl leading-tight tracking-[-0.04em] text-[hsl(var(--charcoal))] sm:text-5xl">
              You are now part of the Massachusetts benchmark.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[hsl(var(--muted-ink))] sm:text-lg">
              Your response is helping Aesthetic Career Club build a more credible compensation
              picture for medical aesthetics across Massachusetts. Private benchmark updates and the
              broader report will be shared once enough responsibly reviewed data is in place.
            </p>
          </div>
          <div className="grid gap-4 border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.82)] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--clay))]">
              Help broaden the benchmark
            </p>
            <p className="text-sm leading-6 text-[hsl(var(--muted-ink))]">
              If you know other Massachusetts professionals who should be represented, share the
              survey. The message stays anonymous and never includes personal compensation details.
            </p>
            <ShareActions />
          </div>
        </section>
      </div>
    </main>
  );
}

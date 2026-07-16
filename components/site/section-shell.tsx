import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  title,
  description,
  children,
  className = "",
}: SectionShellProps) {
  return (
    <section
      className={`border-t border-[hsl(var(--border))] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`.trim()}
      id={id}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="space-y-4">
            <h2 className="font-[family:var(--font-display)] text-4xl leading-tight tracking-[-0.03em] text-[hsl(var(--charcoal))] sm:text-5xl">
              {title}
            </h2>
            {description ? (
              <p className="max-w-xl text-base leading-7 text-[hsl(var(--muted-ink))] sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

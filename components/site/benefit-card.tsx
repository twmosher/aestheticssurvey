type BenefitCardProps = {
  index: number;
  title: string;
  description: string;
};

export function BenefitCard({ index, title, description }: BenefitCardProps) {
  return (
    <article className="flex h-full flex-col justify-between border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.85)] p-5 sm:p-6">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--clay))]">
          0{index}
        </p>
        <h3 className="font-[family:var(--font-display)] text-2xl leading-tight text-[hsl(var(--charcoal))]">
          {title}
        </h3>
        <p className="text-sm leading-6 text-[hsl(var(--muted-ink))]">{description}</p>
      </div>
    </article>
  );
}

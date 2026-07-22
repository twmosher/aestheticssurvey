interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  minutesRemaining: number;
  section: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  minutesRemaining,
  section,
}: ProgressBarProps) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-[hsl(var(--clay))]">
        <span>{section}</span>
        <span>
          Question {currentStep} of {totalSteps}
        </span>
      </div>
      <div
        aria-label="Survey progress"
        aria-valuemax={totalSteps}
        aria-valuemin={0}
        aria-valuenow={currentStep}
        className="h-2 overflow-hidden rounded-full bg-[hsl(var(--border)/0.75)]"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-[hsl(var(--clay-deep))] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm leading-6 text-[hsl(var(--stone-strong))]">
        About {minutesRemaining} minute{minutesRemaining === 1 ? "" : "s"} remaining
      </p>
    </div>
  );
}

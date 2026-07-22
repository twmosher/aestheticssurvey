interface RangeScaleOption {
  label: string;
  value: string;
}

interface RangeScaleProps {
  name: string;
  options: readonly RangeScaleOption[];
  value: string;
  onChange: (value: string) => void;
}

export function RangeScale({ name, onChange, options, value }: RangeScaleProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {options.map((option) => {
        const id = `${name}-${option.value}`;

        return (
          <label
            className="group flex cursor-pointer flex-col items-center gap-2"
            htmlFor={id}
            key={option.value}
          >
            <input
              checked={value === option.value}
              className="sr-only"
              id={id}
              name={name}
              onChange={() => onChange(option.value)}
              type="radio"
              value={option.value}
            />
            <span className="flex h-12 w-full items-center justify-center rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.92)] text-sm font-semibold text-[hsl(var(--charcoal))] transition group-has-[:checked]:border-[hsl(var(--clay-deep))] group-has-[:checked]:bg-[hsl(var(--clay-deep))] group-has-[:checked]:text-[hsl(var(--paper))]">
              {option.value}
            </span>
            <span className="text-center text-[0.7rem] leading-4 text-[hsl(var(--stone-strong))]">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

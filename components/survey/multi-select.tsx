interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  name: string;
  options: readonly MultiSelectOption[];
  selectedValues: readonly string[];
  onChange: (values: string[]) => void;
}

export function MultiSelect({ name, onChange, options, selectedValues }: MultiSelectProps) {
  return (
    <div className="grid gap-3">
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        const checked = selectedValues.includes(option.value);

        return (
          <label
            className="flex cursor-pointer items-start gap-3 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--paper)/0.9)] px-4 py-4 text-left transition hover:border-[hsl(var(--clay))]"
            htmlFor={id}
            key={option.value}
          >
            <input
              checked={checked}
              className="mt-1 h-4 w-4 rounded border-[hsl(var(--border))] text-[hsl(var(--clay-deep))] focus:ring-[hsl(var(--clay-deep))]"
              id={id}
              name={name}
              onChange={() => {
                if (checked) {
                  onChange(selectedValues.filter((entry) => entry !== option.value));
                  return;
                }

                onChange([...selectedValues, option.value]);
              }}
              type="checkbox"
            />
            <span className="text-sm leading-6 text-[hsl(var(--charcoal))]">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

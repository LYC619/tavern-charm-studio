interface SliderWithLabelProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export const SliderWithLabel = ({ label, value, onChange, min, max, step = 1, unit = '' }: SliderWithLabelProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-primary font-mono">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
  </div>
);

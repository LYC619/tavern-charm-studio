const PRESETS = ['#00e5ff', '#a855f7', '#f0c040', '#ff6b6b', '#4ade80', '#f472b6', '#60a5fa', '#ffffff', '#999999', '#1a1a2e'];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
}

export const ColorPicker = ({ value, onChange, label }: ColorPickerProps) => {
  const hexValue = value.startsWith('rgba') || value.startsWith('rgb') || value.startsWith('linear') ? '#888888' : value;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={hexValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-lg cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-xs font-mono bg-input border border-border rounded-lg text-foreground"
        />
      </div>
      <div className="flex gap-1 flex-wrap">
        {PRESETS.map(color => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className="w-5 h-5 rounded-md border border-border hover:scale-125 transition-transform"
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};

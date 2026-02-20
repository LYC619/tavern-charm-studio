import { Trash2 } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { ColorPicker } from '@/components/shared/ColorPicker';
import { SliderWithLabel } from '@/components/shared/SliderWithLabel';
import { textEffectPresetSets } from '@/utils/templates';

const MATCH_OPTIONS = [
  { value: 'asterisk', label: '*文字*（心理活动）' },
  { value: 'cn_parens', label: '（文字）（旁白）' },
  { value: 'brackets', label: '[文字]（系统提示）' },
  { value: 'strikethrough', label: '~~文字~~（删除线）' },
  { value: 'custom', label: '自定义正则' },
];

const SAMPLE_TEXT = '她走进了房间。*不知道他会不会来……*「你来了？」她轻声说道。（房间里弥漫着淡淡的花香。）[系统：好感度 +1]~~旧记忆碎片~~';

export const TextEffectTab = () => {
  const { textEffects, addTextEffect, updateTextEffect, removeTextEffect, setTextEffects } = useAppStore();

  const applyPresetSet = (key: string) => {
    const preset = textEffectPresetSets[key];
    const newEffects = preset.items.map(p => ({
      id: crypto.randomUUID(),
      customRegex: '',
      fontSize: 14,
      ...p,
    }));
    setTextEffects(newEffects);
  };

  const renderPreview = () => {
    let result = SAMPLE_TEXT;
    textEffects.forEach(rule => {
      let regex: RegExp | null = null;
      try {
        switch (rule.matchPattern) {
          case 'asterisk': regex = /\*(.*?)\*/gm; break;
          case 'cn_parens': regex = /（(.*?)）/gm; break;
          case 'brackets': regex = /\[(.*?)\]/gm; break;
          case 'strikethrough': regex = /~~(.*?)~~/gm; break;
          case 'custom': {
            if (rule.customRegex) {
              const match = rule.customRegex.match(/^\/(.+)\/([gimsuy]*)$/);
              if (match) regex = new RegExp(match[1], match[2]);
            }
            break;
          }
        }
      } catch { /* invalid regex */ }

      if (regex) {
        result = result.replace(regex, (_m, g1) => {
          const styles = [
            `color:${rule.color}`,
            `font-size:${rule.fontSize}px`,
            `opacity:${rule.opacity}`,
            rule.italic ? 'font-style:italic' : '',
            rule.bold ? 'font-weight:bold' : '',
            rule.showBg ? `background:${rule.bgColor};padding:2px 4px;border-radius:3px` : '',
          ].filter(Boolean).join(';');
          return `<span style="${styles}">${g1}</span>`;
        });
      }
    });
    return result;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
        {/* Presets */}
        <div className="flex gap-2 flex-wrap">
          {Object.entries(textEffectPresetSets).map(([key, preset]) => (
            <button key={key} onClick={() => applyPresetSet(key)} className="preset-btn">
              {preset.icon} {preset.label}
            </button>
          ))}
        </div>

        {textEffects.map(rule => (
          <div key={rule.id} className="glass-panel p-4 space-y-3">
            <div className="flex items-center gap-2">
              <input value={rule.name} onChange={(e) => updateTextEffect(rule.id, { name: e.target.value })} className="flex-1 bg-input border border-border rounded-lg px-3 py-1.5 text-sm text-foreground" placeholder="规则名称" />
              <button onClick={() => removeTextEffect(rule.id)} className="p-1.5 hover:bg-destructive/20 text-destructive rounded-lg"><Trash2 size={16} /></button>
            </div>

            <select value={rule.matchPattern} onChange={(e) => updateTextEffect(rule.id, { matchPattern: e.target.value as any })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-sm text-foreground">
              {MATCH_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {rule.matchPattern === 'custom' && (
              <input value={rule.customRegex} onChange={(e) => updateTextEffect(rule.id, { customRegex: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-xs font-mono text-foreground" placeholder="/pattern/flags" />
            )}

            <ColorPicker label="文字颜色" value={rule.color} onChange={(v) => updateTextEffect(rule.id, { color: v })} />
            <SliderWithLabel label="字体大小" value={rule.fontSize} onChange={(v) => updateTextEffect(rule.id, { fontSize: v })} min={10} max={24} unit="px" />
            <SliderWithLabel label="透明度" value={rule.opacity} onChange={(v) => updateTextEffect(rule.id, { opacity: v })} min={0.1} max={1} step={0.1} />

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" checked={rule.italic} onChange={(e) => updateTextEffect(rule.id, { italic: e.target.checked })} className="accent-primary" /> 斜体
              </label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" checked={rule.bold} onChange={(e) => updateTextEffect(rule.id, { bold: e.target.checked })} className="accent-primary" /> 加粗
              </label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" checked={rule.showBg} onChange={(e) => updateTextEffect(rule.id, { showBg: e.target.checked })} className="accent-primary" /> 背景色
              </label>
            </div>
            {rule.showBg && <ColorPicker label="背景颜色" value={rule.bgColor} onChange={(v) => updateTextEffect(rule.id, { bgColor: v })} />}
          </div>
        ))}

        <button onClick={addTextEffect} className="w-full py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-all text-sm">
          ➕ 添加规则
        </button>
      </div>

      <div className="lg:w-1/2 lg:sticky lg:top-20 lg:self-start">
        <div className="glass-panel p-6" style={{ background: 'linear-gradient(180deg, hsl(225 45% 7%), hsl(225 37% 10%))' }}>
          <div className="text-sm leading-relaxed" style={{ color: '#e0e0e0', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: renderPreview() }} />
          <div className="text-center text-xs text-muted-foreground mt-4 pt-3 border-t border-border">预览效果</div>
        </div>
      </div>
    </div>
  );
};

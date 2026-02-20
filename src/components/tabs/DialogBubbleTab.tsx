import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { ColorPicker } from '@/components/shared/ColorPicker';
import { SliderWithLabel } from '@/components/shared/SliderWithLabel';
import { dialogPresets } from '@/utils/templates';

const TRIGGER_OPTIONS = [
  { value: 'braces_cn', label: '{角色名：内容}' },
  { value: 'braces_en', label: '{角色名:内容}' },
  { value: 'japanese', label: '「内容」' },
  { value: 'cn_quotes', label: '\u201c内容\u201d' },
  { value: 'custom', label: '自定义正则' },
];

const ALIGN_OPTIONS = [
  { value: 'left', label: '居左' },
  { value: 'center', label: '居中' },
  { value: 'right', label: '居右' },
];

export const DialogBubbleTab = () => {
  const { characters, addCharacter, updateCharacter, removeCharacter } = useAppStore();
  const [expandedId, setExpandedId] = useState<string | null>(characters[0]?.id ?? null);

  const applyPreset = (presetIndex: number) => {
    const updates = dialogPresets[presetIndex].apply();
    characters.forEach(c => updateCharacter(c.id, updates));
  };

  const sampleDialogs = characters.length >= 2
    ? [
        { char: characters[0], text: '你好，很高兴认识你。' },
        { char: characters[1], text: '我也是。今天天气真好呢。' },
        { char: characters[0], text: '嗯，要不要一起去散步？' },
      ]
    : [
        { char: characters[0], text: '你好，很高兴认识你。' },
        { char: characters[0], text: '今天天气真好呢。' },
        { char: characters[0], text: '要不要一起去散步？' },
      ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Config */}
      <div className="lg:w-1/2 space-y-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
        {/* Presets */}
        <div className="flex gap-2 flex-wrap">
          {dialogPresets.map((p, i) => (
            <button key={p.name} onClick={() => applyPreset(i)} className="preset-btn">
              {p.icon} {p.name}
            </button>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {characters.map((char) => (
            <motion.div
              key={char.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <input
                  value={char.name}
                  onChange={(e) => updateCharacter(char.id, { name: e.target.value })}
                  className="bg-input border border-border rounded-lg px-3 py-1.5 text-sm flex-1 mr-2 text-foreground"
                  placeholder="角色名"
                />
                <div className="flex items-center gap-1">
                  <button onClick={() => setExpandedId(expandedId === char.id ? null : char.id)} className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                    {expandedId === char.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {characters.length > 1 && (
                    <button onClick={() => removeCharacter(char.id)} className="p-1.5 hover:bg-destructive/20 text-destructive rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === char.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-3"
                  >
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">对话触发格式</label>
                      <select value={char.triggerFormat} onChange={(e) => updateCharacter(char.id, { triggerFormat: e.target.value as any })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-sm text-foreground">
                        {TRIGGER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>

                    {char.triggerFormat === 'custom' && (
                      <input value={char.customRegex} onChange={(e) => updateCharacter(char.id, { customRegex: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-xs font-mono text-foreground" placeholder="/pattern/flags" />
                    )}

                    <div className="space-y-3 pt-2 border-t border-border">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">气泡样式</h4>
                      <ColorPicker label="背景颜色" value={char.bubbleBgColor} onChange={(v) => updateCharacter(char.id, { bubbleBgColor: v })} />
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <input type="checkbox" checked={char.useGradient} onChange={(e) => updateCharacter(char.id, { useGradient: e.target.checked })} className="accent-primary" />
                        使用渐变
                      </label>
                      {char.useGradient && <ColorPicker label="渐变色2" value={char.gradientColor2} onChange={(v) => updateCharacter(char.id, { gradientColor2: v })} />}
                      <SliderWithLabel label="圆角" value={char.borderRadius} onChange={(v) => updateCharacter(char.id, { borderRadius: v })} min={0} max={30} unit="px" />
                      <SliderWithLabel label="内边距" value={char.padding} onChange={(v) => updateCharacter(char.id, { padding: v })} min={4} max={24} unit="px" />
                      <SliderWithLabel label="最大宽度" value={char.maxWidth} onChange={(v) => updateCharacter(char.id, { maxWidth: v })} min={30} max={100} unit="%" />
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">对齐方式</label>
                        <select value={char.align} onChange={(e) => updateCharacter(char.id, { align: e.target.value as any })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-sm text-foreground">
                          {ALIGN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                      </div>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <input type="checkbox" checked={char.showBorder} onChange={(e) => updateCharacter(char.id, { showBorder: e.target.checked })} className="accent-primary" />
                        显示边框
                      </label>
                      {char.showBorder && <ColorPicker label="边框颜色" value={char.borderColor} onChange={(v) => updateCharacter(char.id, { borderColor: v })} />}
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <input type="checkbox" checked={char.showShadow} onChange={(e) => updateCharacter(char.id, { showShadow: e.target.checked })} className="accent-primary" />
                        显示阴影
                      </label>
                      {char.showShadow && (
                        <>
                          <ColorPicker label="阴影颜色" value={char.shadowColor} onChange={(v) => updateCharacter(char.id, { shadowColor: v })} />
                          <SliderWithLabel label="模糊度" value={char.shadowBlur} onChange={(v) => updateCharacter(char.id, { shadowBlur: v })} min={0} max={30} unit="px" />
                        </>
                      )}
                    </div>

                    <div className="space-y-3 pt-2 border-t border-border">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">角色名样式</h4>
                      <ColorPicker label="字体颜色" value={char.nameColor} onChange={(v) => updateCharacter(char.id, { nameColor: v })} />
                      <SliderWithLabel label="字体大小" value={char.nameFontSize} onChange={(v) => updateCharacter(char.id, { nameFontSize: v })} min={12} max={24} unit="px" />
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-xs text-muted-foreground">
                          <input type="checkbox" checked={char.nameBold} onChange={(e) => updateCharacter(char.id, { nameBold: e.target.checked })} className="accent-primary" />
                          加粗
                        </label>
                        <label className="flex items-center gap-2 text-xs text-muted-foreground">
                          <input type="checkbox" checked={char.showAvatar} onChange={(e) => updateCharacter(char.id, { showAvatar: e.target.checked })} className="accent-primary" />
                          显示头像
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-border">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">对话文字样式</h4>
                      <ColorPicker label="字体颜色" value={char.textColor} onChange={(v) => updateCharacter(char.id, { textColor: v })} />
                      <SliderWithLabel label="字体大小" value={char.textFontSize} onChange={(v) => updateCharacter(char.id, { textFontSize: v })} min={12} max={18} unit="px" />
                      <SliderWithLabel label="行高" value={char.lineHeight} onChange={(v) => updateCharacter(char.id, { lineHeight: v })} min={1.2} max={2.0} step={0.1} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        <button onClick={addCharacter} className="w-full py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-all text-sm">
          ➕ 添加角色
        </button>
      </div>

      {/* Preview */}
      <div className="lg:w-1/2 lg:sticky lg:top-20 lg:self-start">
        <div className="glass-panel p-6" style={{ background: 'linear-gradient(180deg, hsl(225 45% 7%), hsl(225 37% 10%))' }}>
          <div className="space-y-3">
            {sampleDialogs.map((dialog, i) => {
              const c = dialog.char;
              if (!c) return null;
              const bg = c.useGradient
                ? `linear-gradient(${c.gradientDirection}, ${c.bubbleBgColor}, ${c.gradientColor2})`
                : c.bubbleBgColor;
              return (
                <div key={i} style={{ display: 'flex', justifyContent: c.align === 'right' ? 'flex-end' : c.align === 'center' ? 'center' : 'flex-start' }}>
                  <div style={{
                    background: bg,
                    borderRadius: c.borderRadius,
                    padding: c.padding,
                    maxWidth: `${c.maxWidth}%`,
                    border: c.showBorder ? `1px solid ${c.borderColor}` : 'none',
                    boxShadow: c.showShadow ? `0 2px ${c.shadowBlur}px ${c.shadowColor}` : 'none',
                  }}>
                    <div style={{
                      color: c.nameColor,
                      fontSize: c.nameFontSize,
                      fontWeight: c.nameBold ? 'bold' : 'normal',
                      marginBottom: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}>
                      {c.showAvatar && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 24, height: 24, borderRadius: '50%',
                          background: c.nameColor, color: '#000', fontSize: 12, fontWeight: 'bold',
                        }}>
                          {c.name.charAt(0)}
                        </span>
                      )}
                      {c.name}
                    </div>
                    <div style={{ color: c.textColor, fontSize: c.textFontSize, lineHeight: c.lineHeight }}>
                      {dialog.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center text-xs text-muted-foreground mt-4 pt-3 border-t border-border">预览效果</div>
        </div>
      </div>
    </div>
  );
};

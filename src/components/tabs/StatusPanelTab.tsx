import { Trash2 } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { ColorPicker } from '@/components/shared/ColorPicker';
import { SliderWithLabel } from '@/components/shared/SliderWithLabel';
import type { StatusField } from '@/types';

const SAMPLE_VALUES: Record<string, string> = {
  '时间': '傍晚', '地点': '学校走廊', '服装': '校服', '心情': '开心',
  '生命值': '80', '魔力': '45', '体力': '60',
};

export const StatusPanelTab = () => {
  const { statusPanel, updateStatusPanel, addField, updateField, removeField } = useAppStore();

  const groups = new Map<string, StatusField[]>();
  statusPanel.fields.forEach(f => {
    if (!groups.has(f.group)) groups.set(f.group, []);
    groups.get(f.group)!.push(f);
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
        <div className="glass-panel p-4 space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">面板标题</label>
            <input value={statusPanel.title} onChange={(e) => updateStatusPanel({ title: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-sm text-foreground" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">每行列数</label>
            <select value={statusPanel.columns} onChange={(e) => updateStatusPanel({ columns: Number(e.target.value) })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-sm text-foreground">
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}列</option>)}
            </select>
          </div>
          <ColorPicker label="背景颜色" value={statusPanel.bgColor} onChange={(v) => updateStatusPanel({ bgColor: v })} />
          <ColorPicker label="字段值颜色" value={statusPanel.valueColor} onChange={(v) => updateStatusPanel({ valueColor: v })} />
          <ColorPicker label="字段名颜色" value={statusPanel.labelColor} onChange={(v) => updateStatusPanel({ labelColor: v })} />
          <SliderWithLabel label="圆角" value={statusPanel.borderRadius} onChange={(v) => updateStatusPanel({ borderRadius: v })} min={0} max={24} unit="px" />
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={statusPanel.showBorder} onChange={(e) => updateStatusPanel({ showBorder: e.target.checked })} className="accent-primary" />
            显示边框
          </label>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={statusPanel.showGroupTitle} onChange={(e) => updateStatusPanel({ showGroupTitle: e.target.checked })} className="accent-primary" />
            显示分组标题
          </label>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">字段列表</h4>
          {statusPanel.fields.map(field => (
            <div key={field.id} className="glass-panel p-3 flex items-center gap-2 flex-wrap">
              <input value={field.name} onChange={(e) => updateField(field.id, { name: e.target.value })} className="flex-1 min-w-[80px] bg-input border border-border rounded-lg px-2 py-1 text-sm text-foreground" placeholder="字段名" />
              <select value={field.type} onChange={(e) => updateField(field.id, { type: e.target.value as any })} className="bg-input border border-border rounded-lg px-2 py-1 text-xs text-foreground">
                <option value="text">文本</option>
                <option value="progress">进度条</option>
                <option value="badge">标签</option>
              </select>
              <input value={field.group} onChange={(e) => updateField(field.id, { group: e.target.value })} className="w-20 bg-input border border-border rounded-lg px-2 py-1 text-xs text-foreground" placeholder="分组" />
              <button onClick={() => removeField(field.id)} className="p-1 hover:bg-destructive/20 text-destructive rounded-lg"><Trash2 size={14} /></button>
            </div>
          ))}
          <button onClick={addField} className="w-full py-2 rounded-xl border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-all text-sm">
            ➕ 添加字段
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:w-1/2 lg:sticky lg:top-20 lg:self-start">
        <div className="glass-panel p-4" style={{ background: 'linear-gradient(180deg, hsl(225 45% 7%), hsl(225 37% 10%))' }}>
          <div style={{
            background: statusPanel.bgColor,
            borderRadius: statusPanel.borderRadius,
            border: statusPanel.showBorder ? `1px solid ${statusPanel.borderColor}` : 'none',
            padding: 12,
            color: statusPanel.labelColor,
          }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 12 }}>
              {statusPanel.title}
            </div>
            {Array.from(groups).map(([groupName, gFields]) => (
              <div key={groupName} style={{ marginBottom: 8 }}>
                {statusPanel.showGroupTitle && (
                  <div style={{ fontWeight: 'bold', padding: '4px 8px', borderBottom: `1px solid ${statusPanel.borderColor}`, marginBottom: 4, fontSize: 14 }}>
                    {groupName}
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${statusPanel.columns}, 1fr)`, gap: 4 }}>
                  {gFields.map(f => (
                    <div key={f.id} style={{ padding: '6px 8px', textAlign: 'center' }}>
                      <div style={{ fontSize: 12, marginBottom: 2 }}>{f.name}</div>
                      {f.type === 'badge' ? (
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 12, background: statusPanel.valueColor + '33', color: statusPanel.valueColor, fontSize: 12 }}>
                          {SAMPLE_VALUES[f.name] || '示例值'}
                        </span>
                      ) : f.type === 'progress' ? (
                        <div>
                          <div style={{ width: '100%', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)' }}>
                            <div style={{ width: '60%', height: '100%', borderRadius: 3, background: statusPanel.valueColor }} />
                          </div>
                          <span style={{ color: statusPanel.valueColor, fontSize: 11 }}>60%</span>
                        </div>
                      ) : (
                        <span style={{ color: statusPanel.valueColor, fontSize: 14 }}>
                          {SAMPLE_VALUES[f.name] || '示例值'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-muted-foreground mt-4 pt-3 border-t border-border">预览效果</div>
        </div>
      </div>
    </div>
  );
};

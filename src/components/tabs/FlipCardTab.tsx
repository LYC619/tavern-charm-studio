import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { ColorPicker } from '@/components/shared/ColorPicker';
import { SliderWithLabel } from '@/components/shared/SliderWithLabel';

const GRADIENT_DIRS = ['135deg', '45deg', '90deg', '180deg', '0deg', '270deg'];

export const FlipCardTab = () => {
  const { flipCard, updateFlipCard } = useAppStore();
  const [showFront, setShowFront] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
        <div className="glass-panel p-4 space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">触发标签配置</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">正面内容标签名</label>
              <input value={flipCard.frontTag} onChange={(e) => updateFlipCard({ frontTag: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-sm font-mono text-foreground" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">背面内容标签名</label>
              <input value={flipCard.backTag} onChange={(e) => updateFlipCard({ backTag: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-sm font-mono text-foreground" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">编号标签名</label>
              <input value={flipCard.numberTag} onChange={(e) => updateFlipCard({ numberTag: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-sm font-mono text-foreground" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 leading-relaxed">
            💡 在角色卡 prompt 中使用 <code className="text-primary font-mono">&lt;{flipCard.frontTag}&gt;</code> 正面内容 <code className="text-primary font-mono">&lt;/{flipCard.frontTag}&gt;</code> 等标签包裹内容即可触发翻页效果。
          </p>
        </div>

        <div className="glass-panel p-4 space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">卡片样式</h4>
          <div className="grid grid-cols-2 gap-3">
            <ColorPicker label="正面背景色1" value={flipCard.frontBg1} onChange={(v) => updateFlipCard({ frontBg1: v })} />
            <ColorPicker label="正面背景色2" value={flipCard.frontBg2} onChange={(v) => updateFlipCard({ frontBg2: v })} />
            <ColorPicker label="背面背景色1" value={flipCard.backBg1} onChange={(v) => updateFlipCard({ backBg1: v })} />
            <ColorPicker label="背面背景色2" value={flipCard.backBg2} onChange={(v) => updateFlipCard({ backBg2: v })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">正面渐变方向</label>
              <select value={flipCard.frontGradientDir} onChange={(e) => updateFlipCard({ frontGradientDir: e.target.value })} className="w-full bg-input border border-border rounded-lg px-2 py-1.5 text-sm text-foreground">
                {GRADIENT_DIRS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">背面渐变方向</label>
              <select value={flipCard.backGradientDir} onChange={(e) => updateFlipCard({ backGradientDir: e.target.value })} className="w-full bg-input border border-border rounded-lg px-2 py-1.5 text-sm text-foreground">
                {GRADIENT_DIRS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <ColorPicker label="文字颜色" value={flipCard.textColor} onChange={(v) => updateFlipCard({ textColor: v })} />
          <SliderWithLabel label="字体大小" value={flipCard.fontSize} onChange={(v) => updateFlipCard({ fontSize: v })} min={12} max={24} unit="px" />
          <SliderWithLabel label="圆角" value={flipCard.borderRadius} onChange={(v) => updateFlipCard({ borderRadius: v })} min={0} max={30} unit="px" />
          <SliderWithLabel label="内边距" value={flipCard.padding} onChange={(v) => updateFlipCard({ padding: v })} min={4} max={32} unit="px" />
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">翻转提示文字</label>
            <input value={flipCard.flipHint} onChange={(e) => updateFlipCard({ flipHint: e.target.value })} className="w-full bg-input border border-border rounded-lg px-3 py-1.5 text-sm text-foreground" />
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 lg:sticky lg:top-20 lg:self-start">
        <div className="glass-panel p-6" style={{ background: 'linear-gradient(180deg, hsl(225 45% 7%), hsl(225 37% 10%))' }}>
          <motion.div
            onClick={() => setShowFront(!showFront)}
            animate={{ rotateY: showFront ? 0 : 180 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            style={{
              background: showFront
                ? `linear-gradient(${flipCard.frontGradientDir}, ${flipCard.frontBg1}, ${flipCard.frontBg2})`
                : `linear-gradient(${flipCard.backGradientDir}, ${flipCard.backBg1}, ${flipCard.backBg2})`,
              color: flipCard.textColor,
              fontSize: flipCard.fontSize,
              borderRadius: flipCard.borderRadius,
              padding: flipCard.padding,
              cursor: 'pointer',
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              perspective: 1000,
            }}
          >
            <div style={{ fontWeight: 'bold', padding: 8, textAlign: 'center' }}>
              {showFront
                ? '这是卡片正面内容，点击可翻转查看背面。'
                : '这是卡片背面内容，显示角色状态或隐藏信息。'}
            </div>
            {flipCard.flipHint && (
              <div style={{ fontSize: 12, opacity: 0.5, marginTop: 8 }}>{flipCard.flipHint}</div>
            )}
          </motion.div>
          <div className="text-center text-xs text-muted-foreground mt-4 pt-3 border-t border-border">预览效果 · 点击卡片翻面</div>
        </div>
      </div>
    </div>
  );
};

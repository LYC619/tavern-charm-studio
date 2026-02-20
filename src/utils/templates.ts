import type { CharacterConfig, TextEffectRule } from '@/types';

export interface DialogPreset {
  name: string;
  icon: string;
  apply: () => Partial<CharacterConfig>;
}

export const dialogPresets: DialogPreset[] = [
  {
    name: '经典简约',
    icon: '📝',
    apply: () => ({
      bubbleBgColor: 'rgba(255,255,255,0.12)',
      useGradient: false,
      borderRadius: 12,
      showBorder: true,
      borderColor: 'rgba(255,255,255,0.15)',
      showShadow: true,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowBlur: 8,
      nameColor: '#ffffff',
      textColor: '#d0d0d0',
      padding: 12,
    }),
  },
  {
    name: '赛博霓虹',
    icon: '🌃',
    apply: () => ({
      bubbleBgColor: 'rgba(0,229,255,0.08)',
      useGradient: true,
      gradientColor2: 'rgba(168,85,247,0.15)',
      gradientDirection: '135deg',
      borderRadius: 16,
      showBorder: true,
      borderColor: 'rgba(0,229,255,0.3)',
      showShadow: true,
      shadowColor: 'rgba(0,229,255,0.2)',
      shadowBlur: 15,
      nameColor: '#00e5ff',
      textColor: '#e0e8ff',
      padding: 14,
    }),
  },
  {
    name: '暖色复古',
    icon: '🕯️',
    apply: () => ({
      bubbleBgColor: 'rgba(240,192,64,0.1)',
      useGradient: false,
      borderRadius: 8,
      showBorder: true,
      borderColor: 'rgba(240,192,64,0.25)',
      showShadow: true,
      shadowColor: 'rgba(240,192,64,0.1)',
      shadowBlur: 10,
      nameColor: '#f0c040',
      textColor: '#e0d8c8',
      padding: 12,
    }),
  },
];

export interface TextEffectPresetItem {
  name: string;
  matchPattern: TextEffectRule['matchPattern'];
  color: string;
  italic: boolean;
  bold: boolean;
  opacity: number;
  showBg: boolean;
  bgColor: string;
}

export const textEffectPresetSets: Record<string, { label: string; icon: string; items: TextEffectPresetItem[] }> = {
  standard: {
    label: '标准文学',
    icon: '📝',
    items: [
      { name: '心理活动', matchPattern: 'asterisk', color: '#999999', italic: false, bold: false, opacity: 0.7, showBg: false, bgColor: '' },
      { name: '旁白描写', matchPattern: 'cn_parens', color: '#a0a0b0', italic: true, bold: false, opacity: 0.8, showBg: false, bgColor: '' },
      { name: '系统提示', matchPattern: 'brackets', color: '#00e5ff', italic: false, bold: false, opacity: 0.6, showBg: true, bgColor: 'rgba(0,229,255,0.1)' },
    ],
  },
  cyber: {
    label: '赛博风格',
    icon: '🌃',
    items: [
      { name: '心理活动', matchPattern: 'asterisk', color: '#a855f7', italic: true, bold: false, opacity: 0.8, showBg: false, bgColor: '' },
      { name: '旁白描写', matchPattern: 'cn_parens', color: '#00e5ff', italic: false, bold: false, opacity: 0.7, showBg: true, bgColor: 'rgba(0,229,255,0.08)' },
      { name: '系统提示', matchPattern: 'brackets', color: '#f0c040', italic: false, bold: true, opacity: 0.9, showBg: true, bgColor: 'rgba(240,192,64,0.1)' },
    ],
  },
  soft: {
    label: '柔和淡雅',
    icon: '🌸',
    items: [
      { name: '心理活动', matchPattern: 'asterisk', color: '#c4b5fd', italic: true, bold: false, opacity: 0.75, showBg: false, bgColor: '' },
      { name: '旁白描写', matchPattern: 'cn_parens', color: '#93c5fd', italic: true, bold: false, opacity: 0.7, showBg: false, bgColor: '' },
      { name: '系统提示', matchPattern: 'brackets', color: '#fda4af', italic: false, bold: false, opacity: 0.65, showBg: true, bgColor: 'rgba(253,164,175,0.08)' },
    ],
  },
};

import React from 'react';
import { CVDesignSettings, FontFamily, FontSizeScale, PhotoShape, SpacingScale } from '../../types/cv';
import { Palette, Type, Sliders, Image, Check } from 'lucide-react';

interface ThemeCustomizerProps {
  design: CVDesignSettings;
  onChange: (fields: Partial<CVDesignSettings>) => void;
}

const colorPresets = [
  { name: 'Azul JobStep', hex: '#2563eb' },
  { name: 'Azul Marino', hex: '#1e3a8a' },
  { name: 'Pizarra Formal', hex: '#334155' },
  { name: 'Verde Esmeralda', hex: '#059669' },
  { name: 'Burdeos', hex: '#991b1b' },
  { name: 'Violeta Tecnológico', hex: '#7c3aed' },
  { name: 'Cian Profesional', hex: '#0284c7' },
  { name: 'Antracita Oscuro', hex: '#18181b' }
];

const fontFamilies: { id: FontFamily; name: string; preview: string }[] = [
  { id: 'font-jakarta', name: 'Plus Jakarta Sans', preview: 'Moderna y geométrica' },
  { id: 'font-outfit', name: 'Outfit', preview: 'Vanguardista y fresca' },
  { id: 'font-manrope', name: 'Manrope', preview: 'Corporativa y legible' },
  { id: 'font-dmsans', name: 'DM Sans', preview: 'Neogrotesca limpia' },
  { id: 'font-playfair', name: 'Playfair Display', preview: 'Serifa elegante ejecutiva' },
  { id: 'font-merriweather', name: 'Merriweather', preview: 'Editorial clásica tradicional' }
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ design, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Primary Color Palette */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-neutral-500" />
            Color Principal de Énfasis
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-500 uppercase">{design.primaryColor}</span>
            <input
              type="color"
              value={design.primaryColor}
              onChange={(e) => onChange({ primaryColor: e.target.value })}
              className="w-6 h-6 rounded cursor-pointer border border-neutral-300 p-0 bg-transparent"
              title="Personalizar color exacto"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {colorPresets.map((color) => {
            const isSelected = design.primaryColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => onChange({ primaryColor: color.hex })}
                className="group relative w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-2xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Typography Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-neutral-500" />
          Familia Tipográfica
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {fontFamilies.map((font) => {
            const isSelected = design.fontFamily === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => onChange({ fontFamily: font.id })}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs text-blue-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className={`text-xs font-bold ${font.id}`}>{font.name}</div>
                <div className="text-[10px] text-neutral-500">{font.preview}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacing & Font Sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Font size */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-800">
            Tamaño de Letra
          </label>
          <div className="flex items-center p-1 bg-neutral-100 rounded-lg">
            {(['sm', 'base', 'lg'] as FontSizeScale[]).map((sz) => {
              const label = sz === 'sm' ? 'Compacto' : sz === 'base' ? 'Estándar' : 'Grande';
              const isSelected = design.fontSize === sz;
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onChange({ fontSize: sz })}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    isSelected ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spacing */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-800">
            Espaciado y Márgenes
          </label>
          <div className="flex items-center p-1 bg-neutral-100 rounded-lg">
            {(['compact', 'normal', 'spacious'] as SpacingScale[]).map((sp) => {
              const label = sp === 'compact' ? 'Denso' : sp === 'normal' ? 'Normal' : 'Aireado';
              const isSelected = design.spacing === sp;
              return (
                <button
                  key={sp}
                  type="button"
                  onClick={() => onChange({ spacing: sp })}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    isSelected ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Photo Shape */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
          <Image className="w-3.5 h-3.5 text-neutral-500" />
          Formato de Foto de Perfil
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(
            [
              { id: 'rounded', label: 'Suave' },
              { id: 'circle', label: 'Circular' },
              { id: 'square', label: 'Recto' },
              { id: 'hidden', label: 'Ocultar' }
            ] as { id: PhotoShape; label: string }[]
          ).map((shape) => {
            const isSelected = design.photoShape === shape.id;
            return (
              <button
                key={shape.id}
                type="button"
                onClick={() => onChange({ photoShape: shape.id })}
                className={`py-2 px-1 text-xs text-center rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-2xs'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {shape.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

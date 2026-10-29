import React from 'react';
import { TemplateId } from '../../types/cv';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplate: TemplateId;
  onSelect: (template: TemplateId) => void;
}

interface TemplateOption {
  id: TemplateId;
  name: string;
  badge: string;
  description: string;
  previewBg: string;
}

const templates: TemplateOption[] = [
  {
    id: 'modern',
    name: 'JobStep Moderno',
    badge: 'Recomendado',
    description: 'Columna lateral oscura con alto contraste y timeline de logros estructurado.',
    previewBg: 'from-blue-600 to-indigo-900'
  },
  {
    id: 'classic',
    name: 'Profesional Clásico',
    badge: 'Atemporal',
    description: 'Distribución equilibrada tradicional centrada con sutiles filetes divisorios.',
    previewBg: 'from-slate-700 to-slate-900'
  },
  {
    id: 'minimal',
    name: 'Minimalista Suizo',
    badge: 'Limpio',
    description: 'Tipografía refinada y amplios espacios en blanco sin adornos innecesarios.',
    previewBg: 'from-neutral-500 to-neutral-800'
  },
  {
    id: 'executive',
    name: 'Ejecutivo & Liderazgo',
    badge: 'Senior',
    description: 'Bloque superior imponente ideal para directivos y mandos intermedios.',
    previewBg: 'from-blue-900 to-slate-950'
  },
  {
    id: 'creative',
    name: 'Creativo Contemporáneo',
    badge: 'Innovador',
    description: 'Acentos de color llamativos y etiquetas destacadas para perfiles creativos.',
    previewBg: 'from-purple-600 to-pink-600'
  },
  {
    id: 'corporate',
    name: 'Corporativo Estructurado',
    badge: 'Formal',
    description: 'Cuadrícula estricta con alta legibilidad para banca, consultoría y firmas.',
    previewBg: 'from-sky-700 to-blue-900'
  },
  {
    id: 'european',
    name: 'Estilo Europeo',
    badge: 'Europass Moderno',
    description: 'Margen lateral de fechas y desglose cronológico con estándares europeos.',
    previewBg: 'from-teal-700 to-slate-800'
  }
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ currentTemplate, onSelect }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-xs font-semibold text-neutral-700">
          Galería de Plantillas ({templates.length})
        </p>
        <span className="text-[11px] text-neutral-500">
          Cambia de diseño sin perder tus datos
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {templates.map((tpl) => {
          const isSelected = currentTemplate === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => onSelect(tpl.id)}
              className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20 shadow-sm'
                  : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-xs'
              }`}
            >
              {/* Miniature Layout Preview */}
              <div className="w-full h-24 mb-3 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 relative p-1.5 flex gap-1">
                {tpl.id === 'modern' ? (
                  <>
                    <div className="w-1/3 h-full bg-neutral-800 rounded-sm p-1 flex flex-col gap-1">
                      <div className="w-3 h-3 rounded-full bg-white/30 mx-auto" />
                      <div className="w-full h-1 bg-white/20 rounded-xs" />
                      <div className="w-3/4 h-1 bg-white/20 rounded-xs" />
                    </div>
                    <div className="flex-1 h-full bg-white rounded-sm p-1 flex flex-col gap-1">
                      <div className="w-3/4 h-2 bg-blue-600/40 rounded-xs" />
                      <div className="w-1/2 h-1 bg-neutral-200 rounded-xs" />
                      <div className="w-full h-1 bg-neutral-100 rounded-xs mt-1" />
                      <div className="w-full h-1 bg-neutral-100 rounded-xs" />
                    </div>
                  </>
                ) : tpl.id === 'classic' ? (
                  <div className="w-full h-full bg-white rounded-sm p-1.5 flex flex-col items-center gap-1">
                    <div className="w-1/2 h-2 bg-slate-800/60 rounded-xs" />
                    <div className="w-3/4 h-0.5 bg-neutral-300" />
                    <div className="w-full h-1 bg-neutral-200 rounded-xs mt-1" />
                    <div className="w-full h-1 bg-neutral-100 rounded-xs" />
                    <div className="w-full h-1 bg-neutral-100 rounded-xs" />
                  </div>
                ) : tpl.id === 'minimal' ? (
                  <div className="w-full h-full bg-white rounded-sm p-1.5 flex gap-1">
                    <div className="w-1/3 h-full flex flex-col gap-1 border-r border-neutral-100 pr-1">
                      <div className="w-3 h-3 bg-neutral-300 rounded-xs" />
                      <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 pl-1">
                      <div className="w-2/3 h-2 bg-neutral-800 rounded-xs" />
                      <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                      <div className="w-4/5 h-1 bg-neutral-200 rounded-xs" />
                    </div>
                  </div>
                ) : tpl.id === 'executive' ? (
                  <div className="w-full h-full bg-white rounded-sm flex flex-col">
                    <div className="w-full h-6 bg-blue-900 rounded-t-sm p-1 flex items-center gap-1">
                      <div className="w-3 h-3 rounded-xs bg-white/40" />
                      <div className="w-1/2 h-1.5 bg-white/80 rounded-xs" />
                    </div>
                    <div className="p-1.5 flex flex-col gap-1 flex-1">
                      <div className="w-full h-1.5 bg-neutral-200 rounded-xs" />
                      <div className="w-3/4 h-1 bg-neutral-100 rounded-xs" />
                    </div>
                  </div>
                ) : tpl.id === 'creative' ? (
                  <div className="w-full h-full bg-white rounded-sm flex flex-col">
                    <div className="w-full h-1.5 bg-purple-600" />
                    <div className="p-1.5 flex flex-col gap-1 flex-1">
                      <div className="w-1/2 h-2 bg-purple-600/50 rounded-xs" />
                      <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                      <div className="flex gap-1 mt-1">
                        <div className="w-3 h-1.5 bg-purple-100 rounded-xs" />
                        <div className="w-3 h-1.5 bg-purple-100 rounded-xs" />
                      </div>
                    </div>
                  </div>
                ) : tpl.id === 'corporate' ? (
                  <div className="w-full h-full bg-white rounded-sm p-1.5 flex flex-col gap-1">
                    <div className="w-full flex justify-between items-center border-b border-sky-600 pb-0.5">
                      <div className="w-1/2 h-2 bg-sky-900/70 rounded-xs" />
                      <div className="w-3 h-3 bg-neutral-200 rounded-xs" />
                    </div>
                    <div className="w-1/3 h-1.5 bg-sky-600 rounded-xs mt-0.5" />
                    <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-white rounded-sm p-1 flex gap-1">
                    <div className="w-1/4 h-full flex flex-col gap-1 border-r border-teal-600 pr-0.5">
                      <div className="w-full h-1 bg-teal-600 rounded-xs" />
                      <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 pl-0.5">
                      <div className="w-3/4 h-2 bg-neutral-800 rounded-xs" />
                      <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                    </div>
                  </div>
                )}

                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="text-xs font-bold text-neutral-900 truncate">{tpl.name}</h4>
                  <span className="text-[10px] text-neutral-500 font-medium bg-neutral-100 px-1.5 py-0.5 rounded">
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-tight line-clamp-2">
                  {tpl.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

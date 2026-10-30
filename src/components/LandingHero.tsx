import React from 'react';
import { TemplateId } from '../types/cv';
import { ArrowRight, Sparkles, FileEdit, CheckCircle2, ShieldCheck, Download, Zap } from 'lucide-react';

interface LandingHeroProps {
  onStartFromScratch: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onContinueEditing: () => void;
  hasSavedData: boolean;
  onOpenPublish?: () => void;
}

const previewCards: { id: TemplateId; name: string; tag: string; description: string; color: string }[] = [
  {
    id: 'modern',
    name: 'Moderno JobStep',
    tag: 'Más popular',
    description: 'Estructura en dos columnas con barra lateral para datos clave y habilidades.',
    color: '#2563eb'
  },
  {
    id: 'classic',
    name: 'Profesional Clásico',
    tag: 'Atemporal',
    description: 'Distribución equilibrada tradicional y sobria, perfecta para cualquier sector.',
    color: '#1e3a8a'
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    tag: 'Limpio',
    description: 'Diseño tipográfico con espacios blancos amplios y lectura impecable.',
    color: '#0f172a'
  },
  {
    id: 'executive',
    name: 'Ejecutivo',
    tag: 'Alta Dirección',
    description: 'Cabecera de alto impacto con resumen de logros para perfiles con liderazgo.',
    color: '#1e293b'
  }
];

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartFromScratch,
  onSelectTemplate,
  onContinueEditing,
  hasSavedData,
  onOpenPublish
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-gradient-to-b from-white via-neutral-50/50 to-neutral-100/60 p-6 md:p-12">
      <div className="max-w-6xl mx-auto w-full pt-4 pb-12">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-700">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Creador de CV inspirado en JobStep.io</span>
            </div>
            {onOpenPublish && (
              <button
                type="button"
                onClick={onOpenPublish}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-800 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>En línea · Publicar y Compartir Gratis</span>
              </button>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Crea tu currículum profesional en minutos
          </h1>

          <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
            Diseña un currículum atractivo, moderno y optimizado para los reclutadores. 
            Personaliza colores, fuentes y descarga tu archivo en PDF de alta fidelidad sin coste ni registros.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={onContinueEditing}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{hasSavedData ? 'Continuar editando mi CV' : 'Crear mi CV'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onStartFromScratch}
              className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-700 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <FileEdit className="w-4 h-4 text-neutral-500" />
              <span>Comenzar desde cero</span>
            </button>
          </div>

          {/* Value props */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Descarga directa en PDF real
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Guardado automático local
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              7 Plantillas profesionales
            </span>
          </div>
        </div>

        {/* Template showcase preview grid */}
        <div className="mt-14 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                Selecciona una plantilla para comenzar
              </h2>
              <p className="text-xs text-neutral-500">
                Podrás cambiarla o editar cualquier detalle en cualquier momento.
              </p>
            </div>
            <button
              type="button"
              onClick={onContinueEditing}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              Ver todas en el editor →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {previewCards.map((card) => (
              <div
                key={card.id}
                onClick={() => onSelectTemplate(card.id)}
                className="group bg-white rounded-xl border border-neutral-200 p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Visual mockup of the CV sheet */}
                  <div className="w-full h-44 bg-neutral-50 rounded-lg border border-neutral-200 overflow-hidden relative p-3 flex gap-2 group-hover:scale-[1.02] transition-transform">
                    {card.id === 'modern' ? (
                      <>
                        <div className="w-1/3 h-full bg-neutral-900 rounded-sm p-1.5 flex flex-col gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-neutral-700 mx-auto" />
                          <div className="w-full h-1 bg-neutral-700 rounded-xs" />
                          <div className="w-4/5 h-1 bg-neutral-700 rounded-xs" />
                          <div className="w-2/3 h-1 bg-neutral-700 rounded-xs" />
                        </div>
                        <div className="flex-1 h-full bg-white rounded-sm p-1.5 flex flex-col gap-1.5">
                          <div className="w-3/4 h-2 bg-blue-600 rounded-xs" />
                          <div className="w-1/2 h-1 bg-neutral-300 rounded-xs" />
                          <div className="w-full h-1 bg-neutral-200 rounded-xs mt-2" />
                          <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                          <div className="w-5/6 h-1 bg-neutral-200 rounded-xs" />
                        </div>
                      </>
                    ) : card.id === 'classic' ? (
                      <div className="w-full h-full bg-white rounded-sm p-2 flex flex-col items-center gap-1.5">
                        <div className="w-1/2 h-2.5 bg-neutral-800 rounded-xs" />
                        <div className="w-1/3 h-1 bg-neutral-400 rounded-xs" />
                        <div className="w-full h-0.5 bg-neutral-300 my-0.5" />
                        <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                        <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                        <div className="w-3/4 h-1 bg-neutral-200 rounded-xs" />
                      </div>
                    ) : card.id === 'minimal' ? (
                      <div className="w-full h-full bg-white rounded-sm p-2 flex gap-2">
                        <div className="w-1/3 h-full flex flex-col gap-1.5 border-r border-neutral-100 pr-1">
                          <div className="w-4 h-4 bg-neutral-300 rounded-xs" />
                          <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                          <div className="w-2/3 h-2 bg-neutral-900 rounded-xs" />
                          <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                          <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-white rounded-sm flex flex-col overflow-hidden">
                        <div className="w-full h-8 bg-neutral-900 p-1 flex items-center gap-1">
                          <div className="w-4 h-4 rounded-xs bg-white/40" />
                          <div className="w-1/2 h-1.5 bg-white rounded-xs" />
                        </div>
                        <div className="p-2 flex-1 flex flex-col gap-1.5">
                          <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                          <div className="w-full h-1 bg-neutral-200 rounded-xs" />
                          <div className="w-2/3 h-1 bg-neutral-200 rounded-xs" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-xs font-bold text-neutral-900">{card.name}</h3>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {card.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-snug">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-800">
                  <span>Elegir plantilla</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer minimal info */}
      <footer className="text-center text-xs text-neutral-400 py-4 border-t border-neutral-200/60 max-w-6xl mx-auto w-full">
        JobStep CV Creator · Generador profesional de currículums en PDF · Sin marcas de agua
      </footer>
    </div>
  );
};

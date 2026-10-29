import React from 'react';
import { Sparkles } from 'lucide-react';

interface ProfileSectionProps {
  summary: string;
  onChange: (value: string) => void;
}

const inspirationExamples = [
  {
    title: 'Tecnología & Software',
    text: 'Ingeniero de software con más de 5 años de experiencia diseñando y manteniendo arquitecturas web escalables y APIs RESTful. Con sólidos conocimientos en React, TypeScript y servicios cloud. Enfocado en la calidad del código, rendimiento y entrega continua.'
  },
  {
    title: 'Diseño & Creativo',
    text: 'Diseñador de producto y UI/UX enfocado en crear experiencias digitales accesibles, centradas en el usuario y con alta conversión. Experiencia probada en investigación cualitativa, sistemas de diseño y prototipado rápido en Figma.'
  },
  {
    title: 'Negocios & Gestión',
    text: 'Profesional en administración de empresas y gestión de proyectos con historial demostrado liderando equipos multidisciplinarios. Especializado en optimización de procesos operativos, control presupuestario y crecimiento estratégico de ingresos.'
  },
  {
    title: 'Marketing & Ventas',
    text: 'Especialista en marketing digital y crecimiento enfocado en captación multicanal, automatización de embudos de ventas y analítica de conversión. Capacidad demostrada para escalar el ROI de campañas digitales y fidelización de clientes.'
  }
];

export const ProfileSection: React.FC<ProfileSectionProps> = ({ summary, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Extracto o Presentación Profesional
        </label>
        <p className="text-[11px] text-neutral-500 mb-2">
          Resume tu trayectoria, competencias clave y valor diferencial en 2 a 4 líneas.
        </p>
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ej. Profesional proactivo con más de 4 años de experiencia en... Destacado por mi capacidad de resolución de problemas y trabajo en equipo..."
          className="w-full text-xs p-3 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800 leading-relaxed"
        />
        <div className="flex justify-between items-center text-[11px] text-neutral-400 mt-1">
          <span>{summary.length} caracteres</span>
          <span>Recomendado: 150 - 400 caracteres</span>
        </div>
      </div>

      {/* Inspiration Snippets */}
      <div className="pt-2 border-t border-neutral-200">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Ejemplos e inspiración rápida
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {inspirationExamples.map((item, idx) => (
            <div 
              key={idx}
              className="p-2.5 bg-neutral-50 hover:bg-blue-50/50 border border-neutral-200 hover:border-blue-300 rounded-md transition-colors text-left flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-neutral-800 mb-1">{item.title}</p>
                <p className="text-[11px] text-neutral-600 line-clamp-3 leading-snug">{item.text}</p>
              </div>
              <button
                type="button"
                onClick={() => onChange(item.text)}
                className="mt-2 text-[11px] font-medium text-blue-600 hover:text-blue-800 text-left cursor-pointer"
              >
                Usar este texto →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

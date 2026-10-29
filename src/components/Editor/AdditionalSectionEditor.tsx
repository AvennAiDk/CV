import React from 'react';
import { AdditionalSection, AdditionalItem } from '../../types/cv';
import { Plus, Trash2, Award, FolderGit2, BookOpen, UserCheck, Star, HelpCircle, Check } from 'lucide-react';

interface AdditionalSectionEditorProps {
  sections: AdditionalSection[];
  onChange: (sections: AdditionalSection[]) => void;
}

const sectionPresets = [
  { id: 'certifications', title: 'Certificaciones', icon: Award, type: 'certifications' as const },
  { id: 'courses', title: 'Cursos & Talleres', icon: BookOpen, type: 'courses' as const },
  { id: 'projects', title: 'Proyectos Destacados', icon: FolderGit2, type: 'projects' as const },
  { id: 'awards', title: 'Reconocimientos y Premios', icon: Star, type: 'awards' as const },
  { id: 'references', title: 'Referencias Profesionales', icon: UserCheck, type: 'references' as const },
  { id: 'custom', title: 'Información Adicional', icon: HelpCircle, type: 'custom' as const }
];

export const AdditionalSectionEditor: React.FC<AdditionalSectionEditorProps> = ({ sections, onChange }) => {
  const toggleSection = (presetId: string, title: string, type: any) => {
    const existing = sections.find((s) => s.id === presetId);
    if (existing) {
      onChange(sections.map((s) => (s.id === presetId ? { ...s, enabled: !s.enabled } : s)));
    } else {
      const newSec: AdditionalSection = {
        id: presetId,
        title,
        type,
        enabled: true,
        items: []
      };
      onChange([...sections, newSec]);
    }
  };

  const handleAddItem = (sectionId: string) => {
    const newItem: AdditionalItem = {
      id: `add-item-${Date.now()}`,
      title: '',
      subtitle: '',
      date: '',
      description: ''
    };
    onChange(
      sections.map((sec) => (sec.id === sectionId ? { ...sec, items: [...sec.items, newItem] } : sec))
    );
  };

  const handleUpdateItem = (sectionId: string, itemId: string, fields: Partial<AdditionalItem>) => {
    onChange(
      sections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) => (item.id === itemId ? { ...item, ...fields } : item))
        };
      })
    );
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    onChange(
      sections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.filter((item) => item.id !== itemId)
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Quick toggle chips */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-neutral-700">
          Elige qué secciones adicionales deseas activar:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {sectionPresets.map((preset) => {
            const Icon = preset.icon;
            const current = sections.find((s) => s.id === preset.id);
            const isEnabled = current?.enabled;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => toggleSection(preset.id, preset.title, preset.type)}
                className={`p-2.5 rounded-lg border text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                  isEnabled
                    ? 'bg-blue-50/70 border-blue-400 text-blue-900 shadow-2xs'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isEnabled ? 'text-blue-600' : 'text-neutral-400'}`} />
                  <span className="truncate">{preset.title}</span>
                </div>
                {isEnabled && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active additional sections list */}
      <div className="space-y-5">
        {sections.filter((s) => s.enabled).map((sec) => (
          <div key={sec.id} className="p-4 bg-white border border-neutral-200 rounded-lg shadow-xs space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
              <input
                type="text"
                value={sec.title}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange(sections.map((s) => (s.id === sec.id ? { ...s, title: val } : s)));
                }}
                className="text-xs font-bold text-neutral-900 bg-transparent border-b border-transparent hover:border-neutral-300 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddItem(sec.id)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                Añadir elemento
              </button>
            </div>

            {sec.items.length === 0 ? (
              <p className="text-xs text-neutral-400 italic">No hay elementos en esta sección todavía.</p>
            ) : (
              <div className="space-y-3">
                {sec.items.map((item, idx) => (
                  <div key={item.id} className="p-3 bg-neutral-50 border border-neutral-200 rounded-md space-y-2 relative">
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(sec.id, item.id)}
                      className="absolute top-2.5 right-2.5 text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                      title="Eliminar elemento"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-600 mb-0.5">Título / Nombre</label>
                        <input
                          type="text"
                          placeholder="Ej. Certificación AWS, Proyecto E-commerce..."
                          value={item.title}
                          onChange={(e) => handleUpdateItem(sec.id, item.id, { title: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-600 mb-0.5">Entidad / Subtítulo</label>
                        <input
                          type="text"
                          placeholder="Ej. Amazon Web Services, Universidad..."
                          value={item.subtitle || ''}
                          onChange={(e) => handleUpdateItem(sec.id, item.id, { subtitle: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-600 mb-0.5">Fecha o Periodo</label>
                        <input
                          type="text"
                          placeholder="Ej. 2023 o May 2023"
                          value={item.date || ''}
                          onChange={(e) => handleUpdateItem(sec.id, item.id, { date: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-neutral-600 mb-0.5">Detalles adicionales</label>
                        <input
                          type="text"
                          placeholder="Descripción breve de alcance, enlace o nota..."
                          value={item.description || ''}
                          onChange={(e) => handleUpdateItem(sec.id, item.id, { description: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

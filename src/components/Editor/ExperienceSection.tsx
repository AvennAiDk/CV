import React, { useState } from 'react';
import { ExperienceItem } from '../../types/cv';
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase, PlusCircle, X } from 'lucide-react';

interface ExperienceSectionProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const handleAdd = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      position: '',
      company: '',
      city: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: ['']
    };
    onChange([newItem, ...items]);
    setExpandedId(newItem.id);
  };

  const handleUpdate = (id: string, fields: Partial<ExperienceItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...fields } : item)));
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleAddHighlight = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      handleUpdate(itemId, { highlights: [...(item.highlights || []), ''] });
    }
  };

  const handleUpdateHighlight = (itemId: string, index: number, value: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      const updated = [...(item.highlights || [])];
      updated[index] = value;
      handleUpdate(itemId, { highlights: updated });
    }
  };

  const handleDeleteHighlight = (itemId: string, index: number) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      const updated = (item.highlights || []).filter((_, i) => i !== index);
      handleUpdate(itemId, { highlights: updated });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xs text-neutral-500">
          Añade tus empleos en orden cronológico inverso (el más reciente primero).
        </p>
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs font-semibold px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir empleo
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-neutral-200 rounded-lg bg-neutral-50">
          <Briefcase className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-neutral-700">No has agregado ninguna experiencia laboral todavía.</p>
          <p className="text-[11px] text-neutral-400 mt-1">Haz clic en "Añadir empleo" para comenzar a listar tu trayectoria.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-3 text-xs font-semibold px-3 py-1.5 bg-white border border-neutral-300 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            + Añadir primera experiencia
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div 
                key={item.id} 
                className="bg-white border border-neutral-200 rounded-lg overflow-hidden transition-all shadow-xs"
              >
                {/* Header item */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-neutral-50 select-none bg-neutral-50/50"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-bold text-neutral-800 truncate">
                        {item.position || '(Puesto sin definir)'}
                      </p>
                      <p className="text-[11px] text-neutral-500 truncate">
                        {item.company || 'Empresa'} {item.startDate ? `· ${item.startDate} - ${item.current ? 'Presente' : item.endDate || '...'}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                      title="Eliminar experiencia"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-1 text-neutral-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                {isExpanded && (
                  <div className="p-4 border-t border-neutral-100 space-y-3 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Puesto o Cargo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Gerente de Proyecto / Especialista"
                          value={item.position}
                          onChange={(e) => handleUpdate(item.id, { position: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Empresa u Organización <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Google / BBVA"
                          value={item.company}
                          onChange={(e) => handleUpdate(item.id, { company: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Ciudad / Ubicación
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Madrid, España (o Remoto)"
                          value={item.city || ''}
                          onChange={(e) => handleUpdate(item.id, { city: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700">
                          <input
                            type="checkbox"
                            checked={item.current}
                            onChange={(e) => handleUpdate(item.id, { current: e.target.checked })}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>Actualmente trabajo aquí</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Fecha de inicio
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. 2021 o Ene 2021"
                          value={item.startDate}
                          onChange={(e) => handleUpdate(item.id, { startDate: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Fecha de finalización
                        </label>
                        <input
                          type="text"
                          disabled={item.current}
                          placeholder={item.current ? 'Presente' : 'Ej. 2023 o Dic 2023'}
                          value={item.current ? '' : item.endDate}
                          onChange={(e) => handleUpdate(item.id, { endDate: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 disabled:bg-neutral-100 disabled:text-neutral-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Resumen general de responsabilidades
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Descripción breve de tus funciones principales en el puesto..."
                        value={item.description}
                        onChange={(e) => handleUpdate(item.id, { description: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                      />
                    </div>

                    {/* Bullet Highlights / Achievements */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-medium text-neutral-700">
                          Logros y responsabilidades destacadas (Viñetas)
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddHighlight(item.id)}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <PlusCircle className="w-3 h-3" />
                          Añadir viñeta
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {(item.highlights || []).map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2">
                            <span className="text-neutral-400 text-xs">•</span>
                            <input
                              type="text"
                              placeholder="Ej. Crecimiento del 20% en ventas mediante optimización..."
                              value={highlight}
                              onChange={(e) => handleUpdateHighlight(item.id, hIdx, e.target.value)}
                              className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteHighlight(item.id, hIdx)}
                              className="p-1 text-neutral-400 hover:text-red-500"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

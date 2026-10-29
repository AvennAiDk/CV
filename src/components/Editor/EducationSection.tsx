import React, { useState } from 'react';
import { EducationItem } from '../../types/cv';
import { Plus, Trash2, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ items, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const handleAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      city: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([newItem, ...items]);
    setExpandedId(newItem.id);
  };

  const handleUpdate = (id: string, fields: Partial<EducationItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...fields } : item)));
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xs text-neutral-500">
          Añade tus títulos universitarios, posgrados o formación académica relevante.
        </p>
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs font-semibold px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir formación
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-neutral-200 rounded-lg bg-neutral-50">
          <GraduationCap className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-neutral-700">No has agregado formación académica aún.</p>
          <p className="text-[11px] text-neutral-400 mt-1">Muestra tus grados o títulos para que los reclutadores conozcan tu base técnica.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-3 text-xs font-semibold px-3 py-1.5 bg-white border border-neutral-300 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            + Añadir primer estudio
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
                        {item.degree || '(Título sin definir)'}
                      </p>
                      <p className="text-[11px] text-neutral-500 truncate">
                        {item.institution || 'Institución'} {item.startDate ? `· ${item.startDate} - ${item.current ? 'En curso' : item.endDate || '...'}` : ''}
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
                      title="Eliminar formación"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-1 text-neutral-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 border-t border-neutral-100 space-y-3 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Título / Carrera / Grado <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Grado en Ingeniería Informática"
                          value={item.degree}
                          onChange={(e) => handleUpdate(item.id, { degree: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Institución o Universidad <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Universidad Complutense"
                          value={item.institution}
                          onChange={(e) => handleUpdate(item.id, { institution: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Barcelona, España"
                          value={item.city || ''}
                          onChange={(e) => handleUpdate(item.id, { city: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700">
                          <input
                            type="checkbox"
                            checked={item.current || false}
                            onChange={(e) => handleUpdate(item.id, { current: e.target.checked })}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>Actualmente cursando</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Fecha de inicio
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. 2018"
                          value={item.startDate}
                          onChange={(e) => handleUpdate(item.id, { startDate: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Fecha de finalización (o prevista)
                        </label>
                        <input
                          type="text"
                          disabled={item.current}
                          placeholder={item.current ? 'En curso' : 'Ej. 2022'}
                          value={item.current ? '' : item.endDate}
                          onChange={(e) => handleUpdate(item.id, { endDate: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 disabled:bg-neutral-100 disabled:text-neutral-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Descripción o logros académicos (Opcional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Mención de honor, proyectos finales destacados, especialización..."
                        value={item.description || ''}
                        onChange={(e) => handleUpdate(item.id, { description: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                      />
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

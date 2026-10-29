import React, { useState } from 'react';
import { LanguageItem } from '../../types/cv';
import { Plus, Trash2, Languages as LangIcon } from 'lucide-react';

interface LanguagesSectionProps {
  items: LanguageItem[];
  onChange: (items: LanguageItem[]) => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({ items, onChange }) => {
  const [langName, setLangName] = useState('');
  const [proficiency, setProficiency] = useState<LanguageItem['proficiency']>('Intermedio');

  const handleAdd = () => {
    if (!langName.trim()) return;
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: langName.trim(),
      proficiency
    };
    onChange([...items, newItem]);
    setLangName('');
  };

  const handleRemove = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, fields: Partial<LanguageItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...fields } : item)));
  };

  return (
    <div className="space-y-4">
      {/* Add bar */}
      <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
        <label className="block text-xs font-medium text-neutral-700 mb-2">
          Añadir idioma
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Ej. Inglés, Francés, Alemán..."
            value={langName}
            onChange={(e) => setLangName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
            className="flex-1 text-xs px-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value as LanguageItem['proficiency'])}
            className="text-xs px-2.5 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-neutral-700 cursor-pointer"
          >
            <option value="Básico">Básico (A1 - A2)</option>
            <option value="Intermedio">Intermedio (B1 - B2)</option>
            <option value="Avanzado">Avanzado (C1)</option>
            <option value="Fluido">Competencia profesional completa (C2)</option>
            <option value="Nativo">Nativo o bilingüe</option>
          </select>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-semibold px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Añadir
          </button>
        </div>
      </div>

      {/* Active Languages */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-xs text-neutral-400 italic">No has registrado idiomas aún.</p>
        ) : (
          items.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-2.5 bg-white border border-neutral-200 rounded-md shadow-xs"
            >
              <div className="flex items-center gap-2">
                <LangIcon className="w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={item.language}
                  onChange={(e) => handleUpdate(item.id, { language: e.target.value })}
                  className="text-xs font-semibold text-neutral-800 bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none px-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={item.proficiency}
                  onChange={(e) => handleUpdate(item.id, { proficiency: e.target.value as LanguageItem['proficiency'] })}
                  className="text-xs py-1 px-2 border border-neutral-200 rounded bg-neutral-50 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Fluido">Fluido</option>
                  <option value="Nativo">Nativo</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 cursor-pointer"
                  title="Eliminar idioma"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

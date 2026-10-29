import React, { useState } from 'react';
import { SkillItem } from '../../types/cv';
import { Plus, X, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillItem[];
  onChange: (skills: SkillItem[]) => void;
}

const suggestedSkills = [
  'JavaScript / TypeScript', 'React', 'HTML & CSS', 'Node.js', 'Python', 'SQL',
  'UI/UX Design', 'Figma', 'Design Systems', 'Scrum / Agile', 'Gestión de Proyectos',
  'Liderazgo de Equipos', 'Resolución de Problemas', 'Comunicación Asertiva',
  'Google Analytics', 'Marketing Digital', 'Atención al Cliente', 'Ventas B2B'
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onChange }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillItem['level']>('Avanzado');

  const handleAdd = () => {
    if (!newSkillName.trim()) return;
    const item: SkillItem = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      level: newSkillLevel
    };
    onChange([...skills, item]);
    setNewSkillName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (id: string) => {
    onChange(skills.filter((s) => s.id !== id));
  };

  const handleAddSuggested = (name: string) => {
    if (skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) return;
    onChange([...skills, { id: `sk-${Date.now()}-${Math.random()}`, name, level: 'Avanzado' }]);
  };

  return (
    <div className="space-y-4">
      {/* Input bar */}
      <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
        <label className="block text-xs font-medium text-neutral-700">
          Añadir nueva habilidad
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Ej. Figma, React, Negociación, SEO..."
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-xs px-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value as SkillItem['level'])}
            className="text-xs px-2.5 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-neutral-700 cursor-pointer"
          >
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Experto">Experto</option>
          </select>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-semibold px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Agregar
          </button>
        </div>
      </div>

      {/* Active Skills List */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-semibold text-neutral-700">
            Habilidades incluidas ({skills.length})
          </p>
          {skills.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-[11px] text-red-600 hover:underline cursor-pointer"
            >
              Borrar todas
            </button>
          )}
        </div>

        {skills.length === 0 ? (
          <p className="text-xs text-neutral-400 italic">No has agregado ninguna habilidad aún.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs shadow-xs text-neutral-800"
              >
                <span className="font-medium">{skill.name}</span>
                {skill.level && (
                  <span className="text-[10px] text-neutral-400 border-l border-neutral-200 pl-1.5">
                    {skill.level}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(skill.id)}
                  className="ml-1 text-neutral-400 hover:text-red-500 rounded p-0.5 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Skills */}
      <div className="pt-2 border-t border-neutral-200">
        <div className="flex items-center gap-1 text-xs font-semibold text-neutral-600 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          Sugerencias populares (haz clic para agregar):
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestedSkills.map((name) => {
            const alreadyAdded = skills.some((s) => s.name.toLowerCase() === name.toLowerCase());
            return (
              <button
                key={name}
                type="button"
                disabled={alreadyAdded}
                onClick={() => handleAddSuggested(name)}
                className={`text-[11px] px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  alreadyAdded
                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    : 'bg-neutral-100 hover:bg-blue-50 hover:text-blue-700 text-neutral-700 border border-neutral-200'
                }`}
              >
                + {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

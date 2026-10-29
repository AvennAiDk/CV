import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface ProgressBarProps {
  score: number;
  tips: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ score, tips }) => {
  const [showTips, setShowTips] = useState(false);

  // Status color
  const getProgressColor = () => {
    if (score >= 90) return 'bg-emerald-600';
    if (score >= 60) return 'bg-blue-600';
    return 'bg-amber-500';
  };

  const getStatusLabel = () => {
    if (score >= 90) return '¡Excelente nivel!';
    if (score >= 60) return 'Buen progreso';
    return 'Completa más datos';
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-2xs mb-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {score >= 90 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          )}
          <span className="text-xs font-bold text-neutral-800">
            Nivel de completitud: {score}%
          </span>
          <span className="text-[11px] text-neutral-500 hidden sm:inline">
            · {getStatusLabel()}
          </span>
        </div>

        {tips.length > 0 && (
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>{tips.length} sugerencia{tips.length > 1 ? 's' : ''}</span>
            {showTips ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Progress bar line */}
      <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mt-2">
        <div 
          className={`h-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Expanded Tips list */}
      {showTips && tips.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-neutral-100 space-y-1">
          <p className="text-[11px] font-semibold text-neutral-700">Para maximizar el impacto de tu CV:</p>
          <ul className="space-y-1 text-xs text-neutral-600">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-100 space-y-4">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="text-center">
          <h3 className="text-base font-bold text-neutral-900">¿Comenzar un CV desde cero?</h3>
          <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
            Se limpiarán todos los campos actuales para iniciar un borrador en blanco. 
            Podrás recargar datos de ejemplo en cualquier momento desde el menú de opciones.
          </p>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Sí, borrar y empezar
          </button>
        </div>
      </div>
    </div>
  );
};

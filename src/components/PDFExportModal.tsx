import React from 'react';
import { Loader2, CheckCircle2, AlertCircle, Download, X } from 'lucide-react';

interface PDFExportModalProps {
  isOpen: boolean;
  progress: number;
  message: string;
  isDone: boolean;
  error?: string | null;
  onClose: () => void;
}

export const PDFExportModal: React.FC<PDFExportModalProps> = ({
  isOpen,
  progress,
  message,
  isDone,
  error,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 no-print animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-100 text-center space-y-4">
        {error ? (
          <>
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Error al generar PDF</h3>
              <p className="text-xs text-neutral-600 mt-1">{error}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </>
        ) : isDone ? (
          <>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">¡PDF descargado con éxito!</h3>
              <p className="text-xs text-neutral-600 mt-1">
                El archivo se ha guardado en tu carpeta de descargas con fidelidad de impresión A4.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Continuar
            </button>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Generando tu Currículum</h3>
              <p className="text-xs text-neutral-600 mt-1">{message || 'Procesando diseño en alta resolución...'}</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] font-mono text-neutral-400">{progress}%</p>
          </>
        )}
      </div>
    </div>
  );
};

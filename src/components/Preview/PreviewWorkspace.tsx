import React, { useState } from 'react';
import { CVData } from '../../types/cv';
import { CVDocument } from './CVDocument';
import { ZoomIn, ZoomOut, Maximize2, Download, Printer } from 'lucide-react';

interface PreviewWorkspaceProps {
  data: CVData;
  onDownloadPDF: () => void;
  onPrint: () => void;
  isGeneratingPDF: boolean;
}

export const PreviewWorkspace: React.FC<PreviewWorkspaceProps> = ({
  data,
  onDownloadPDF,
  onPrint,
  isGeneratingPDF
}) => {
  const [scale, setScale] = useState<number>(0.85);

  const handleZoomIn = () => setScale((prev) => Math.min(1.2, Number((prev + 0.1).toFixed(2))));
  const handleZoomOut = () => setScale((prev) => Math.max(0.5, Number((prev - 0.1).toFixed(2))));
  const handleResetZoom = () => setScale(0.85);

  return (
    <div className="flex flex-col h-full bg-neutral-200/80 rounded-2xl border border-neutral-300/80 overflow-hidden shadow-inner">
      {/* Preview toolbar */}
      <div className="bg-white px-4 py-2.5 border-b border-neutral-200 flex items-center justify-between gap-3 text-xs shrink-0 select-none no-print">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-800">Vista Previa A4</span>
          <span className="text-neutral-400">·</span>
          <span className="text-neutral-500 hidden sm:inline">210 × 297 mm</span>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1.5 bg-neutral-100 px-2 py-1 rounded-lg">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 text-neutral-600 hover:text-neutral-900 rounded hover:bg-neutral-200 transition-colors cursor-pointer"
            title="Reducir zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] text-neutral-700 w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 text-neutral-600 hover:text-neutral-900 rounded hover:bg-neutral-200 transition-colors cursor-pointer"
            title="Aumentar zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1 text-neutral-500 hover:text-neutral-800 ml-1 rounded hover:bg-neutral-200 cursor-pointer"
            title="Restablecer tamaño"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrint}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md font-medium text-xs cursor-pointer transition-colors"
            title="Imprimir o guardar como PDF vectorial nativo"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold text-xs cursor-pointer shadow-xs transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isGeneratingPDF ? 'Generando...' : 'Descargar PDF'}</span>
          </button>
        </div>
      </div>

      {/* Canvas viewport container */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div className="origin-top transition-transform duration-150">
          <CVDocument data={data} scale={scale} />
        </div>
      </div>
    </div>
  );
};

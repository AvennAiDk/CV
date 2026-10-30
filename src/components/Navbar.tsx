import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  FileText, 
  Eye, 
  Palette, 
  Layout, 
  CheckCircle2,
  ChevronDown,
  Globe
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'editor' | 'templates' | 'design' | 'preview';
  setActiveTab: (tab: 'editor' | 'templates' | 'design' | 'preview') => void;
  onDownloadPDF: () => void;
  onPrint: () => void;
  onReset: () => void;
  onLoadSample: () => void;
  isGeneratingPDF: boolean;
  lastSaved: Date | null;
  completionScore: number;
  onOpenPublish: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onDownloadPDF,
  onPrint,
  onReset,
  onLoadSample,
  isGeneratingPDF,
  lastSaved,
  completionScore,
  onOpenPublish
}) => {
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-base shadow-2xs">
            J
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-900 whitespace-nowrap">
            JobStep CV
          </span>
          <span className="hidden sm:inline-block text-xs font-medium text-neutral-400 pl-2 border-l border-neutral-200">
            {completionScore}% completado
          </span>
        </div>

        {/* Zone 2: Navigation links / Mode Switchers */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 ${
              activeTab === 'editor'
                ? 'text-neutral-900 border-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 border-transparent'
            }`}
          >
            Editor de Contenido
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 ${
              activeTab === 'templates'
                ? 'text-neutral-900 border-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 border-transparent'
            }`}
          >
            Plantillas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('design')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 ${
              activeTab === 'design'
                ? 'text-neutral-900 border-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 border-transparent'
            }`}
          >
            Personalizar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 lg:hidden ${
              activeTab === 'preview'
                ? 'text-neutral-900 border-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 border-transparent'
            }`}
          >
            Vista Previa
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Options Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 px-2.5 py-1.5 rounded-md hover:bg-neutral-100 transition-colors flex items-center gap-1 cursor-pointer border border-neutral-200"
            >
              <span>Opciones</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showOptionsDropdown && (
              <div 
                className="absolute right-0 mt-1.5 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-50 text-xs"
                onMouseLeave={() => setShowOptionsDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowOptionsDropdown(false);
                    onLoadSample();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2 text-neutral-700 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Cargar datos de ejemplo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowOptionsDropdown(false);
                    onReset();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2 text-neutral-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                  Comenzar desde cero
                </button>
                <div className="my-1 border-t border-neutral-100" />
                <button
                  type="button"
                  onClick={() => {
                    setShowOptionsDropdown(false);
                    onOpenPublish();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2 text-emerald-700 font-semibold cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  Publicar gratis / Compartir
                </button>
                <div className="my-1 border-t border-neutral-100" />
                <button
                  type="button"
                  onClick={() => {
                    setShowOptionsDropdown(false);
                    onPrint();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2 text-neutral-700 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-neutral-500" />
                  Imprimir / PDF del sistema
                </button>
              </div>
            )}
          </div>

          {/* Publicar gratis button */}
          <button
            type="button"
            onClick={onOpenPublish}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            title="Ver enlace público o publicar en Vercel / Netlify"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>Publicar gratis</span>
          </button>

          {/* Primary CTA: Descargar PDF */}
          <button
            type="button"
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPDF ? 'Generando PDF...' : 'Descargar PDF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

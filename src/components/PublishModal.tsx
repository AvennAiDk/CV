import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  Zap, 
  Server, 
  ArrowRight,
  ShieldCheck,
  FolderArchive
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'aistudio' | 'vercel' | 'netlify' | 'github'>('aistudio');

  if (!isOpen) return null;

  // Real public shared URL in AI Studio
  const publicUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('ais-dev') 
        ? window.location.origin.replace('ais-dev', 'ais-pre') 
        : window.location.origin)
    : 'https://ais-pre-7a6tdx5ytwigiqq2nremdn-899168677481.us-east1.run.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 no-print animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Publicar y Compartir Gratis</h3>
              <p className="text-[11px] text-neutral-500">Tu aplicación no requiere servidores de pago ni suscripciones</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Status: Already Live! */}
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              ¡Tu aplicación ya está en línea y accesible públicamente!
            </span>
            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              100% Gratis
            </span>
          </div>
          <p className="text-xs text-emerald-800 leading-snug">
            Google AI Studio aloja esta aplicación automáticamente en Google Cloud Run. Cualquier persona con el enlace puede acceder y crear su currículum.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 text-xs px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-neutral-800 font-mono select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar link'}</span>
            </button>
          </div>
        </div>

        {/* Alternative Free Hosting Providers */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-neutral-800">
            ¿Quieres publicarla con tu propio dominio o en otra plataforma gratis?
          </p>

          {/* Platform tabs */}
          <div className="flex items-center p-1 bg-neutral-100 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActivePlatform('vercel')}
              className={`flex-1 py-1.5 text-center font-medium rounded-md transition-colors cursor-pointer ${
                activePlatform === 'vercel' ? 'bg-white text-neutral-900 font-bold shadow-2xs' : 'text-neutral-600'
              }`}
            >
              Vercel
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform('netlify')}
              className={`flex-1 py-1.5 text-center font-medium rounded-md transition-colors cursor-pointer ${
                activePlatform === 'netlify' ? 'bg-white text-neutral-900 font-bold shadow-2xs' : 'text-neutral-600'
              }`}
            >
              Netlify
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform('github')}
              className={`flex-1 py-1.5 text-center font-medium rounded-md transition-colors cursor-pointer ${
                activePlatform === 'github' ? 'bg-white text-neutral-900 font-bold shadow-2xs' : 'text-neutral-600'
              }`}
            >
              GitHub Pages
            </button>
          </div>

          {/* Platform guides */}
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs space-y-2 text-neutral-700">
            {activePlatform === 'vercel' && (
              <div className="space-y-1.5">
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-neutral-800" />
                  Publicar en Vercel (Recomendado para dominios personalizados):
                </p>
                <ol className="list-decimal list-inside space-y-1 text-neutral-600 text-[11px] leading-relaxed">
                  <li>Sube tu repositorio a GitHub o GitLab.</li>
                  <li>Entra a <strong>vercel.com</strong> (crea una cuenta gratis con GitHub).</li>
                  <li>Haz clic en <strong>"Add New... &gt; Project"</strong> e importa tu repositorio.</li>
                  <li>El archivo <code>vercel.json</code> ya está incluido y configurado en este proyecto.</li>
                  <li>Haz clic en <strong>"Deploy"</strong>: ¡estará publicado con HTTPS y dominio gratis en 30 segundos!</li>
                </ol>
              </div>
            )}

            {activePlatform === 'netlify' && (
              <div className="space-y-1.5">
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-cyan-600" />
                  Publicar en Netlify (Sin código, arrastrar y soltar):
                </p>
                <ol className="list-decimal list-inside space-y-1 text-neutral-600 text-[11px] leading-relaxed">
                  <li>Ejecuta <code>npm run build</code> en tu terminal (crea la carpeta <code>dist/</code>).</li>
                  <li>Entra a <strong>app.netlify.com/drop</strong>.</li>
                  <li>Arrastra la carpeta <code>dist</code> directamente a la ventana del navegador.</li>
                  <li>El archivo <code>public/_redirects</code> ya está listo para evitar errores de ruta.</li>
                  <li>¡Netlify te dará una URL pública gratuita al instante!</li>
                </ol>
              </div>
            )}

            {activePlatform === 'github' && (
              <div className="space-y-1.5">
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-neutral-800" />
                  Publicar en GitHub Pages:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-neutral-600 text-[11px] leading-relaxed">
                  <li>Crea un repositorio público en GitHub.</li>
                  <li>Activa <strong>GitHub Pages</strong> desde <em>Settings &gt; Pages</em>.</li>
                  <li>Usa la acción automática de GitHub Actions para Vite.</li>
                  <li>Tu CV builder estará disponible en <code>https://tu-usuario.github.io/tu-repo</code>.</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

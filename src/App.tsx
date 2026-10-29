/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCVStorage } from './hooks/useCVStorage';
import { exportToPDF, printCV } from './utils/pdfExport';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { EditorAccordion } from './components/Editor/EditorAccordion';
import { TemplateSelector } from './components/Customization/TemplateSelector';
import { ThemeCustomizer } from './components/Customization/ThemeCustomizer';
import { PreviewWorkspace } from './components/Preview/PreviewWorkspace';
import { ProgressBar } from './components/ProgressBar';
import { PDFExportModal } from './components/PDFExportModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { TemplateId } from './types/cv';
import { FileEdit, Palette, Layout, Eye, CheckCircle2 } from 'lucide-react';

export default function App() {
  const {
    cvData,
    updateCV,
    updatePersonal,
    updateSummary,
    updateDesign,
    resetToEmpty,
    loadSample,
    lastSaved,
    isSaving,
    completionStats
  } = useCVStorage();

  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<'editor' | 'templates' | 'design' | 'preview'>('editor');

  // PDF generation state
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [pdfProgressMessage, setPdfProgressMessage] = useState('');
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfDone, setPdfDone] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Reset confirmation state
  const [showResetModal, setShowResetModal] = useState(false);

  // Start from scratch
  const handleStartFromScratch = () => {
    resetToEmpty();
    setCurrentView('app');
    setActiveTab('editor');
  };

  // Select template from landing
  const handleSelectTemplateFromLanding = (templateId: TemplateId) => {
    updateDesign({ template: templateId });
    setCurrentView('app');
    setActiveTab('editor');
  };

  // Continue editing
  const handleContinueEditing = () => {
    setCurrentView('app');
    setActiveTab('editor');
  };

  // Real PDF Generation
  const handleDownloadPDF = async () => {
    if (isGeneratingPDF) return;

    setIsGeneratingPDF(true);
    setPdfModalOpen(true);
    setPdfDone(false);
    setPdfError(null);
    setPdfProgress(10);
    setPdfProgressMessage('Iniciando exportación de alta calidad...');

    // Sanitize user name for filename
    const cleanName = (cvData.personal.fullName || 'Curriculum_Vitae')
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_\-\s]/g, '')
      .replace(/\s+/g, '_');

    const fileName = `CV_${cleanName}.pdf`;

    try {
      const success = await exportToPDF({
        elementId: 'cv-printable-root',
        fileName,
        onProgress: (progress, message) => {
          setPdfProgress(progress);
          setPdfProgressMessage(message);
        }
      });

      if (success) {
        setPdfDone(true);
      } else {
        setPdfError('No se pudo compilar el PDF. Revisa los datos e inténtalo nuevamente.');
      }
    } catch (err: any) {
      console.error(err);
      setPdfError(err?.message || 'Ocurrió un error inesperado al procesar el PDF.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Print CV / Native browser vector PDF
  const handlePrint = () => {
    printCV();
  };

  // Reset handler
  const handleConfirmReset = () => {
    resetToEmpty();
    setShowResetModal(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex flex-col antialiased">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadPDF={handleDownloadPDF}
        onPrint={handlePrint}
        onReset={() => setShowResetModal(true)}
        onLoadSample={loadSample}
        isGeneratingPDF={isGeneratingPDF}
        lastSaved={lastSaved}
        completionScore={completionStats.percentage}
      />

      {/* Main View Router */}
      {currentView === 'landing' ? (
        <LandingHero
          onStartFromScratch={handleStartFromScratch}
          onSelectTemplate={handleSelectTemplateFromLanding}
          onContinueEditing={handleContinueEditing}
          hasSavedData={Boolean(cvData.personal.fullName)}
        />
      ) : (
        <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 no-print">
          {/* Mobile sub-navigation bar */}
          <div className="flex md:hidden items-center justify-around bg-white p-1.5 rounded-xl border border-neutral-200 mb-4 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1 transition-colors ${
                activeTab === 'editor' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
              }`}
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1 transition-colors ${
                activeTab === 'templates' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Plantillas</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('design')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1 transition-colors ${
                activeTab === 'design' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Diseño</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1 transition-colors ${
                activeTab === 'preview' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista</span>
            </button>
          </div>

          {/* Split Screen Workspace on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form & Tools */}
            <div className={`lg:col-span-6 xl:col-span-5 space-y-4 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
              {/* Progress status */}
              <ProgressBar 
                score={completionStats.percentage} 
                tips={completionStats.tips} 
              />

              {/* View Tabs content */}
              {activeTab === 'editor' && (
                <EditorAccordion
                  cvData={cvData}
                  updatePersonal={updatePersonal}
                  updateSummary={updateSummary}
                  updateCV={updateCV}
                />
              )}

              {activeTab === 'templates' && (
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
                  <TemplateSelector
                    currentTemplate={cvData.design.template}
                    onSelect={(tpl) => updateDesign({ template: tpl })}
                  />
                </div>
              )}

              {activeTab === 'design' && (
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
                  <ThemeCustomizer
                    design={cvData.design}
                    onChange={updateDesign}
                  />
                </div>
              )}
            </div>

            {/* Right Column: Live Real-Time A4 Document Preview */}
            <div className={`lg:col-span-6 xl:col-span-7 sticky top-20 ${activeTab !== 'preview' ? 'hidden lg:block' : 'block'}`}>
              <PreviewWorkspace
                data={cvData}
                onDownloadPDF={handleDownloadPDF}
                onPrint={handlePrint}
                isGeneratingPDF={isGeneratingPDF}
              />
            </div>
          </div>
        </main>
      )}

      {/* PDF Export Progress/Status Modal */}
      <PDFExportModal
        isOpen={pdfModalOpen}
        progress={pdfProgress}
        message={pdfProgressMessage}
        isDone={pdfDone}
        error={pdfError}
        onClose={() => setPdfModalOpen(false)}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={showResetModal}
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
}

import { useState, useEffect, useCallback, useMemo } from 'react';
import { CVData, CVDesignSettings } from '../types/cv';
import { sampleCVData, emptyCVData } from '../data/initialData';

const STORAGE_KEY = 'jobstep_cv_data_v1';

export function useCVStorage() {
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure design object has all modern keys
        return {
          ...sampleCVData,
          ...parsed,
          design: {
            ...sampleCVData.design,
            ...(parsed.design || {})
          }
        };
      }
    } catch (e) {
      console.error('Failed to parse saved CV from localStorage:', e);
    }
    return sampleCVData;
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(() => new Date());
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save whenever cvData changes
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
        setLastSaved(new Date());
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      } finally {
        setIsSaving(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [cvData]);

  const updateCV = useCallback((updater: (prev: CVData) => CVData) => {
    setCvData(updater);
  }, []);

  const updatePersonal = useCallback((fields: Partial<CVData['personal']>) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...fields }
    }));
  }, []);

  const updateSummary = useCallback((summary: string) => {
    setCvData((prev) => ({ ...prev, summary }));
  }, []);

  const updateDesign = useCallback((fields: Partial<CVDesignSettings>) => {
    setCvData((prev) => ({
      ...prev,
      design: { ...prev.design, ...fields }
    }));
  }, []);

  const resetToEmpty = useCallback(() => {
    setCvData(emptyCVData);
  }, []);

  const loadSample = useCallback(() => {
    setCvData(sampleCVData);
  }, []);

  // Calculate completion percentage and tips
  const completionStats = useMemo(() => {
    let score = 0;
    const tips: string[] = [];

    // Personal info (max 30)
    if (cvData.personal.fullName.trim()) score += 10;
    else tips.push('Escribe tu nombre completo');

    if (cvData.personal.jobTitle.trim()) score += 10;
    else tips.push('Indica tu puesto o profesión deseada');

    if (cvData.personal.email.trim() && cvData.personal.phone.trim()) score += 10;
    else tips.push('Añade correo y teléfono de contacto');

    // Summary (max 15)
    if (cvData.summary.trim().length > 30) score += 15;
    else tips.push('Escribe un breve perfil profesional (2-3 líneas)');

    // Experience (max 25)
    if (cvData.experience.length >= 2) score += 25;
    else if (cvData.experience.length === 1) {
      score += 15;
      tips.push('Añadir una segunda experiencia laboral sumará puntos');
    } else {
      tips.push('Añade al menos una experiencia laboral');
    }

    // Education (max 15)
    if (cvData.education.length >= 1) score += 15;
    else tips.push('Añade tu formación académica');

    // Skills (max 10)
    if (cvData.skills.length >= 3) score += 10;
    else tips.push('Agrega al menos 3 habilidades clave');

    // Languages (max 5)
    if (cvData.languages.length >= 1) score += 5;

    return {
      percentage: Math.min(score, 100),
      tips
    };
  }, [cvData]);

  return {
    cvData,
    setCvData,
    updateCV,
    updatePersonal,
    updateSummary,
    updateDesign,
    resetToEmpty,
    loadSample,
    lastSaved,
    isSaving,
    completionStats
  };
}

import React, { useState } from 'react';
import { CVData } from '../../types/cv';
import { PersonalSection } from './PersonalSection';
import { ProfileSection } from './ProfileSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { LanguagesSection } from './LanguagesSection';
import { AdditionalSectionEditor } from './AdditionalSectionEditor';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Languages, 
  PlusSquare, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2
} from 'lucide-react';

interface EditorAccordionProps {
  cvData: CVData;
  updatePersonal: (fields: Partial<CVData['personal']>) => void;
  updateSummary: (summary: string) => void;
  updateCV: (updater: (prev: CVData) => CVData) => void;
}

type SectionKey = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'additional';

export const EditorAccordion: React.FC<EditorAccordionProps> = ({
  cvData,
  updatePersonal,
  updateSummary,
  updateCV
}) => {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    personal: true,
    summary: false,
    experience: true,
    education: false,
    skills: false,
    languages: false,
    additional: false
  });

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionsConfig = [
    {
      key: 'personal' as SectionKey,
      title: 'Información Personal',
      icon: User,
      subtitle: cvData.personal.fullName || 'Nombre, contacto y foto',
      isFilled: Boolean(cvData.personal.fullName && cvData.personal.email),
      component: <PersonalSection data={cvData.personal} onChange={updatePersonal} />
    },
    {
      key: 'summary' as SectionKey,
      title: 'Perfil Profesional',
      icon: FileText,
      subtitle: cvData.summary ? `${cvData.summary.slice(0, 40)}...` : 'Extracto de tu perfil',
      isFilled: Boolean(cvData.summary.length > 20),
      component: <ProfileSection summary={cvData.summary} onChange={updateSummary} />
    },
    {
      key: 'experience' as SectionKey,
      title: 'Experiencia Laboral',
      icon: Briefcase,
      subtitle: `${cvData.experience.length} puesto${cvData.experience.length !== 1 ? 's' : ''} registrado${cvData.experience.length !== 1 ? 's' : ''}`,
      isFilled: cvData.experience.length > 0,
      component: (
        <ExperienceSection 
          items={cvData.experience} 
          onChange={(items) => updateCV((prev) => ({ ...prev, experience: items }))} 
        />
      )
    },
    {
      key: 'education' as SectionKey,
      title: 'Educación y Formación',
      icon: GraduationCap,
      subtitle: `${cvData.education.length} título${cvData.education.length !== 1 ? 's' : ''}`,
      isFilled: cvData.education.length > 0,
      component: (
        <EducationSection 
          items={cvData.education} 
          onChange={(items) => updateCV((prev) => ({ ...prev, education: items }))} 
        />
      )
    },
    {
      key: 'skills' as SectionKey,
      title: 'Habilidades',
      icon: Wrench,
      subtitle: `${cvData.skills.length} competencia${cvData.skills.length !== 1 ? 's' : ''}`,
      isFilled: cvData.skills.length > 0,
      component: (
        <SkillsSection 
          skills={cvData.skills} 
          onChange={(skills) => updateCV((prev) => ({ ...prev, skills }))} 
        />
      )
    },
    {
      key: 'languages' as SectionKey,
      title: 'Idiomas',
      icon: Languages,
      subtitle: `${cvData.languages.length} idioma${cvData.languages.length !== 1 ? 's' : ''}`,
      isFilled: cvData.languages.length > 0,
      component: (
        <LanguagesSection 
          items={cvData.languages} 
          onChange={(languages) => updateCV((prev) => ({ ...prev, languages }))} 
        />
      )
    },
    {
      key: 'additional' as SectionKey,
      title: 'Secciones Adicionales',
      icon: PlusSquare,
      subtitle: 'Certificaciones, proyectos, cursos, premios...',
      isFilled: cvData.additionalSections.some((s) => s.enabled && s.items.length > 0),
      component: (
        <AdditionalSectionEditor 
          sections={cvData.additionalSections} 
          onChange={(sections) => updateCV((prev) => ({ ...prev, additionalSections: sections }))} 
        />
      )
    }
  ];

  return (
    <div className="space-y-3">
      {sectionsConfig.map((sec) => {
        const isOpen = openSections[sec.key];
        const Icon = sec.icon;

        return (
          <div 
            key={sec.key} 
            className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-2xs transition-all"
          >
            {/* Header */}
            <div
              onClick={() => toggleSection(sec.key)}
              className="flex items-center justify-between p-3.5 sm:p-4 cursor-pointer hover:bg-neutral-50/80 select-none transition-colors"
            >
              <div className="flex items-center gap-3 truncate">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isOpen ? 'bg-blue-50 text-blue-600' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">{sec.title}</span>
                    {sec.isFilled && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 truncate">{sec.subtitle}</p>
                </div>
              </div>

              <div className="text-neutral-400 pl-2">
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {/* Accordion body */}
            {isOpen && (
              <div className="p-4 sm:p-5 border-t border-neutral-100 bg-neutral-50/30">
                {sec.component}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

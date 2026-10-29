/**
 * Data structures for JobStep CV builder
 */

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address?: string;
  photoUrl?: string;
  linkedin?: string;
  portfolio?: string;
  website?: string;
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  city?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  city?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Básico' | 'Intermedio' | 'Avanzado' | 'Fluido' | 'Nativo';
}

export interface AdditionalItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface AdditionalSection {
  id: string;
  type: 'certifications' | 'courses' | 'projects' | 'awards' | 'references' | 'custom';
  title: string;
  items: AdditionalItem[];
  enabled: boolean;
}

export type TemplateId = 
  | 'classic' 
  | 'modern' 
  | 'minimal' 
  | 'executive' 
  | 'creative' 
  | 'corporate' 
  | 'european';

export type FontFamily = 
  | 'font-jakarta' 
  | 'font-outfit' 
  | 'font-manrope' 
  | 'font-dmsans' 
  | 'font-playfair' 
  | 'font-merriweather';

export type SpacingScale = 'compact' | 'normal' | 'spacious';
export type FontSizeScale = 'sm' | 'base' | 'lg';
export type PhotoShape = 'circle' | 'rounded' | 'square' | 'hidden';

export interface CVDesignSettings {
  template: TemplateId;
  primaryColor: string;
  secondaryColor?: string;
  fontFamily: FontFamily;
  spacing: SpacingScale;
  fontSize: FontSizeScale;
  photoShape: PhotoShape;
  showSectionIcons: boolean;
  sectionOrder: string[];
}

export interface CVData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  additionalSections: AdditionalSection[];
  design: CVDesignSettings;
}

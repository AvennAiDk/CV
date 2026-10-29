import React from 'react';
import { CVData } from '../../types/cv';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Languages as LangIcon, 
  Sparkles,
  FolderGit2
} from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const TemplateModern: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, additionalSections, design } = data;
  const primaryColor = design.primaryColor || '#2563eb';

  // Photo shape styling
  const getPhotoShapeClass = () => {
    switch (design.photoShape) {
      case 'circle': return 'rounded-full';
      case 'rounded': return 'rounded-xl';
      case 'square': return 'rounded-none';
      default: return 'rounded-xl';
    }
  };

  const getSpacingClass = () => {
    switch (design.spacing) {
      case 'compact': return 'space-y-3.5';
      case 'spacious': return 'space-y-6';
      default: return 'space-y-4.5';
    }
  };

  const getFontMultiplier = () => {
    switch (design.fontSize) {
      case 'sm': return 'text-[12.5px] leading-relaxed';
      case 'lg': return 'text-[14.5px] leading-relaxed';
      default: return 'text-[13px] leading-relaxed';
    }
  };

  return (
    <div 
      className={`w-full min-h-[297mm] bg-white text-neutral-800 ${design.fontFamily} ${getFontMultiplier()} flex flex-col md:flex-row`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Left Sidebar */}
      <div 
        className="w-full md:w-[32%] bg-neutral-900 text-white p-7 flex flex-col justify-between shrink-0"
        style={{ borderRight: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="space-y-6">
          {/* Profile photo */}
          {design.photoShape !== 'hidden' && personal.photoUrl && (
            <div className="flex justify-center mb-5">
              <div 
                className={`w-32 h-32 overflow-hidden border-2 border-white/20 shadow-md ${getPhotoShapeClass()} bg-neutral-800`}
              >
                <img 
                  src={personal.photoUrl} 
                  alt={personal.fullName || 'Foto de perfil'} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div>
            <h3 
              className="text-xs uppercase tracking-wider font-bold mb-3 pb-1 border-b border-white/15"
              style={{ color: primaryColor === '#1e3a8a' ? '#60a5fa' : primaryColor }}
            >
              Contacto
            </h3>
            <div className="space-y-2.5 text-xs text-neutral-300">
              {personal.email && (
                <div className="flex items-start gap-2.5 break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-400" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {(personal.city || personal.country) && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                  <span>{[personal.city, personal.country].filter(Boolean).join(', ')}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2.5 break-all">
                  <Linkedin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                  <span>{personal.linkedin}</span>
                </div>
              )}
              {personal.portfolio && (
                <div className="flex items-center gap-2.5 break-all">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                  <span>{personal.portfolio}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education in sidebar */}
          {education.length > 0 && (
            <div>
              <h3 
                className="text-xs uppercase tracking-wider font-bold mb-3 pb-1 border-b border-white/15"
                style={{ color: primaryColor === '#1e3a8a' ? '#60a5fa' : primaryColor }}
              >
                Educación
              </h3>
              <div className="space-y-3">
                {education.map((item) => (
                  <div key={item.id} className="text-xs">
                    <p className="font-semibold text-white leading-snug">{item.degree}</p>
                    <p className="text-neutral-300">{item.institution}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {item.startDate} — {item.current ? 'Presente' : item.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 
                className="text-xs uppercase tracking-wider font-bold mb-3 pb-1 border-b border-white/15"
                style={{ color: primaryColor === '#1e3a8a' ? '#60a5fa' : primaryColor }}
              >
                Habilidades
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="text-[11px] bg-white/10 text-neutral-200 px-2 py-0.5 rounded-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 
                className="text-xs uppercase tracking-wider font-bold mb-3 pb-1 border-b border-white/15"
                style={{ color: primaryColor === '#1e3a8a' ? '#60a5fa' : primaryColor }}
              >
                Idiomas
              </h3>
              <div className="space-y-1.5 text-xs">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-neutral-300">
                    <span>{lang.language}</span>
                    <span className="text-[11px] text-neutral-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 text-[10px] text-neutral-500 text-center">
          JobStep CV Format
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`w-full md:w-[68%] p-8 md:p-10 ${getSpacingClass()}`}>
        {/* Candidate Header */}
        <div className="pb-4 border-b border-neutral-200">
          <h1 
            className="text-2xl md:text-3xl font-extrabold tracking-tight"
            style={{ color: primaryColor }}
          >
            {personal.fullName || 'Tu Nombre y Apellidos'}
          </h1>
          <p className="text-base font-medium text-neutral-600 mt-1">
            {personal.jobTitle || 'Puesto o Profesión'}
          </p>
        </div>

        {/* Professional Summary */}
        {summary && (
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              Perfil Profesional
            </h2>
            <p className="text-neutral-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              Experiencia Laboral
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: primaryColor }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="font-bold text-neutral-900 text-sm">{exp.position}</h3>
                    <span className="text-xs font-medium text-neutral-500 tabular-nums">
                      {exp.startDate} — {exp.current ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-600 mb-1.5">
                    {exp.company} {exp.city ? `· ${exp.city}` : ''}
                  </div>
                  {exp.description && (
                    <p className="text-neutral-600 mb-1.5 leading-snug">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-3.5 space-y-1 text-xs text-neutral-700">
                      {exp.highlights.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Sections */}
        {additionalSections && additionalSections.filter(s => s.enabled && s.items.length > 0).map((sec) => (
          <div key={sec.id}>
            <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              {sec.title}
            </h2>
            <div className="space-y-2.5">
              {sec.items.map((item) => (
                <div key={item.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-semibold text-neutral-800">
                    <span>{item.title}</span>
                    {item.date && <span className="text-[11px] text-neutral-500 tabular-nums">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-neutral-600 text-[11px]">{item.subtitle}</p>}
                  {item.description && <p className="text-neutral-600 mt-0.5 leading-snug">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

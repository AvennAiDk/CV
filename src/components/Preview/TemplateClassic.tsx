import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const TemplateClassic: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, additionalSections, design } = data;
  const primaryColor = design.primaryColor || '#1e3a8a';

  const getSpacingClass = () => {
    switch (design.spacing) {
      case 'compact': return 'space-y-4';
      case 'spacious': return 'space-y-7';
      default: return 'space-y-5';
    }
  };

  const getFontMultiplier = () => {
    switch (design.fontSize) {
      case 'sm': return 'text-[12.5px]';
      case 'lg': return 'text-[14.5px]';
      default: return 'text-[13px]';
    }
  };

  return (
    <div 
      className={`w-full min-h-[297mm] bg-white text-neutral-800 ${design.fontFamily} ${getFontMultiplier()} p-10 md:p-14 ${getSpacingClass()}`}
    >
      {/* Header */}
      <div className="text-center pb-5 border-b-2" style={{ borderColor: primaryColor }}>
        {design.photoShape !== 'hidden' && personal.photoUrl && (
          <div className="flex justify-center mb-4">
            <img 
              src={personal.photoUrl} 
              alt={personal.fullName}
              className={`w-24 h-24 object-cover border border-neutral-300 shadow-sm ${
                design.photoShape === 'circle' ? 'rounded-full' : design.photoShape === 'square' ? 'rounded-none' : 'rounded-lg'
              }`}
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <h1 
          className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-neutral-900 uppercase"
          style={{ color: primaryColor }}
        >
          {personal.fullName || 'Tu Nombre y Apellidos'}
        </h1>
        <p className="text-sm font-medium tracking-wide text-neutral-600 mt-1 uppercase">
          {personal.jobTitle || 'Puesto o Profesión'}
        </p>

        {/* Contact bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-neutral-600 mt-3">
          {personal.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              {personal.phone}
            </span>
          )}
          {(personal.city || personal.country) && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              {[personal.city, personal.country].filter(Boolean).join(', ')}
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
              {personal.linkedin}
            </span>
          )}
          {personal.portfolio && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              {personal.portfolio}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 
            className="text-xs uppercase font-serif font-bold tracking-widest pb-1 mb-2 border-b border-neutral-300"
            style={{ color: primaryColor }}
          >
            Perfil Profesional
          </h2>
          <p className="text-neutral-700 leading-relaxed text-justify">
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 
            className="text-xs uppercase font-serif font-bold tracking-widest pb-1 mb-3 border-b border-neutral-300"
            style={{ color: primaryColor }}
          >
            Experiencia Laboral
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-neutral-900 text-sm">{exp.position}</span>
                  <span className="text-xs text-neutral-500 italic tabular-nums">
                    {exp.startDate} — {exp.current ? 'Presente' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-neutral-700 mb-1">
                  {exp.company} {exp.city ? `| ${exp.city}` : ''}
                </div>
                {exp.description && (
                  <p className="text-neutral-600 mb-1 leading-snug">{exp.description}</p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-neutral-700">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-relaxed">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 
            className="text-xs uppercase font-serif font-bold tracking-widest pb-1 mb-3 border-b border-neutral-300"
            style={{ color: primaryColor }}
          >
            Educación y Formación
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-neutral-900 text-sm">{edu.degree}</span>
                  <span className="text-xs text-neutral-500 italic tabular-nums">
                    {edu.startDate} — {edu.current ? 'Presente' : edu.endDate}
                  </span>
                </div>
                <div className="text-xs text-neutral-700 font-medium">{edu.institution} {edu.city ? `· ${edu.city}` : ''}</div>
                {edu.description && (
                  <p className="text-neutral-600 text-xs mt-0.5">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Languages 2-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {skills.length > 0 && (
          <div>
            <h2 
              className="text-xs uppercase font-serif font-bold tracking-widest pb-1 mb-2 border-b border-neutral-300"
              style={{ color: primaryColor }}
            >
              Habilidades Principales
            </h2>
            <p className="text-xs text-neutral-700 leading-relaxed">
              {skills.map((s) => s.name).join(' · ')}
            </p>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 
              className="text-xs uppercase font-serif font-bold tracking-widest pb-1 mb-2 border-b border-neutral-300"
              style={{ color: primaryColor }}
            >
              Idiomas
            </h2>
            <div className="space-y-1 text-xs text-neutral-700">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span>{l.language}</span>
                  <span className="italic text-neutral-500">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional sections */}
      {additionalSections && additionalSections.filter(s => s.enabled && s.items.length > 0).map((sec) => (
        <div key={sec.id}>
          <h2 
            className="text-xs uppercase font-serif font-bold tracking-widest pb-1 mb-2 border-b border-neutral-300"
            style={{ color: primaryColor }}
          >
            {sec.title}
          </h2>
          <div className="space-y-2">
            {sec.items.map((item) => (
              <div key={item.id} className="text-xs">
                <div className="flex justify-between font-semibold text-neutral-900">
                  <span>{item.title}</span>
                  {item.date && <span className="italic text-neutral-500 tabular-nums">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-neutral-600 italic text-[11px]">{item.subtitle}</p>}
                {item.description && <p className="text-neutral-600 mt-0.5">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

import React from 'react';
import { CVData } from '../../types/cv';

interface TemplateProps {
  data: CVData;
}

export const TemplateMinimal: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, additionalSections, design } = data;
  const primaryColor = design.primaryColor || '#0f172a';

  const getFontMultiplier = () => {
    switch (design.fontSize) {
      case 'sm': return 'text-[12px]';
      case 'lg': return 'text-[14px]';
      default: return 'text-[13px]';
    }
  };

  return (
    <div 
      className={`w-full min-h-[297mm] bg-white text-neutral-900 ${design.fontFamily} ${getFontMultiplier()} p-10 md:p-14`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-neutral-200">
        <div className="space-y-1">
          <h1 className="text-3xl font-light tracking-tight text-neutral-900">
            {personal.fullName || 'Tu Nombre y Apellidos'}
          </h1>
          <p className="text-sm font-medium tracking-wide uppercase" style={{ color: primaryColor }}>
            {personal.jobTitle || 'Puesto o Profesión'}
          </p>
        </div>

        {/* Contact minimal list */}
        <div className="text-right text-xs text-neutral-500 space-y-0.5">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {(personal.city || personal.country) && (
            <div>{[personal.city, personal.country].filter(Boolean).join(', ')}</div>
          )}
          {personal.linkedin && <div className="text-neutral-700">{personal.linkedin}</div>}
          {personal.portfolio && <div className="text-neutral-700">{personal.portfolio}</div>}
        </div>
      </div>

      {/* Main Grid: 2 columns minimal */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
        {/* Left Column (4 cols): Profile, Skills, Languages, Education */}
        <div className="md:col-span-4 space-y-7">
          {design.photoShape !== 'hidden' && personal.photoUrl && (
            <div className="w-28 h-28 overflow-hidden rounded-md border border-neutral-200">
              <img 
                src={personal.photoUrl} 
                alt={personal.fullName}
                className="w-full h-full object-cover grayscale contrast-125"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-3">
                Educación
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <p className="font-semibold text-neutral-900">{edu.degree}</p>
                    <p className="text-neutral-600">{edu.institution}</p>
                    <p className="text-neutral-400 text-[11px] tabular-nums mt-0.5">
                      {edu.startDate} — {edu.current ? 'Presente' : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-3">
                Competencias
              </h2>
              <div className="space-y-1.5 text-xs text-neutral-700">
                {skills.map((s) => (
                  <div key={s.id} className="flex justify-between items-center">
                    <span>{s.name}</span>
                    {s.level && <span className="text-[10px] text-neutral-400 uppercase">{s.level}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-3">
                Idiomas
              </h2>
              <div className="space-y-1 text-xs text-neutral-700">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="text-neutral-400 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (8 cols): Summary, Experience, Additional */}
        <div className="md:col-span-8 space-y-7">
          {summary && (
            <div>
              <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-2">
                Extracto
              </h2>
              <p className="text-neutral-700 text-xs md:text-sm leading-relaxed text-justify">
                {summary}
              </p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-4">
                Trayectoria Laboral
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-neutral-900 text-sm">{exp.position}</span>
                      <span className="text-[11px] text-neutral-400 tabular-nums">
                        {exp.startDate} — {exp.current ? 'Presente' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-neutral-500 font-medium mb-1.5">
                      {exp.company} {exp.city ? `· ${exp.city}` : ''}
                    </div>
                    {exp.description && (
                      <p className="text-neutral-700 mb-2 leading-relaxed">{exp.description}</p>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 pl-3 border-l border-neutral-200 text-neutral-600">
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

          {additionalSections && additionalSections.filter(s => s.enabled && s.items.length > 0).map((sec) => (
            <div key={sec.id}>
              <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-3">
                {sec.title}
              </h2>
              <div className="space-y-2.5">
                {sec.items.map((item) => (
                  <div key={item.id} className="text-xs">
                    <div className="flex justify-between font-medium text-neutral-900">
                      <span>{item.title}</span>
                      {item.date && <span className="text-neutral-400 text-[11px] tabular-nums">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-neutral-500 text-[11px]">{item.subtitle}</p>}
                    {item.description && <p className="text-neutral-600 mt-0.5">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

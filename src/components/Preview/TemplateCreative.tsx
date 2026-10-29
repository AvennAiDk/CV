import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const TemplateCreative: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, additionalSections, design } = data;
  const primaryColor = design.primaryColor || '#7c3aed';

  return (
    <div className={`w-full min-h-[297mm] bg-white text-neutral-800 ${design.fontFamily} text-[13px] relative overflow-hidden`}>
      {/* Decorative top accent gradient band */}
      <div 
        className="h-3 w-full"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="p-8 md:p-12 space-y-7">
        {/* Creative Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-neutral-100">
          {design.photoShape !== 'hidden' && personal.photoUrl && (
            <div className="relative shrink-0">
              <div 
                className="w-28 h-28 rounded-2xl overflow-hidden shadow-md rotate-[-2deg] transition-transform hover:rotate-0"
                style={{ border: `3px solid ${primaryColor}` }}
              >
                <img 
                  src={personal.photoUrl} 
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            <span 
              className="text-xs uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              Curriculum Vitae
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 mt-2">
              {personal.fullName || 'Tu Nombre y Apellidos'}
            </h1>
            <p className="text-base font-semibold text-neutral-600 mt-0.5">
              {personal.jobTitle || 'Puesto o Profesión'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-neutral-600 mt-3">
              {personal.email && (
                <span className="flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded-md">
                  <Mail className="w-3 h-3 text-neutral-400" />
                  {personal.email}
                </span>
              )}
              {personal.phone && (
                <span className="flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded-md">
                  <Phone className="w-3 h-3 text-neutral-400" />
                  {personal.phone}
                </span>
              )}
              {(personal.city || personal.country) && (
                <span className="flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded-md">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  {[personal.city, personal.country].filter(Boolean).join(', ')}
                </span>
              )}
              {personal.linkedin && (
                <span className="flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded-md">
                  <Linkedin className="w-3 h-3 text-neutral-400" />
                  {personal.linkedin}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Summary with creative quotation mark or badge */}
        {summary && (
          <div className="relative pl-4 border-l-4" style={{ borderColor: primaryColor }}>
            <p className="text-neutral-700 leading-relaxed text-justify italic">
              "{summary}"
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-neutral-900">
                Experiencia Profesional
              </h2>
            </div>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-5 border-l border-neutral-200">
                  <div 
                    className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" 
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-neutral-900 text-sm">{exp.position}</h3>
                    <span 
                      className="text-xs font-semibold px-2 py-0.5 rounded text-white tabular-nums"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {exp.startDate} — {exp.current ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-500 mb-1">
                    {exp.company} {exp.city ? `· ${exp.city}` : ''}
                  </div>
                  {exp.description && (
                    <p className="text-neutral-600 mb-1 leading-snug">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-neutral-700">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-neutral-900">
                  Formación Académica
                </h2>
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                    <p className="font-bold text-neutral-900">{edu.degree}</p>
                    <p className="text-neutral-600 font-medium">{edu.institution}</p>
                    <p className="text-neutral-400 text-[11px] tabular-nums mt-0.5">
                      {edu.startDate} — {edu.current ? 'Presente' : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {skills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <h2 className="text-sm font-extrabold uppercase tracking-wide text-neutral-900">
                    Habilidades
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span 
                      key={s.id}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                      style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <h2 className="text-sm font-extrabold uppercase tracking-wide text-neutral-900">
                    Idiomas
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {languages.map((l) => (
                    <span key={l.id} className="bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded border border-neutral-200">
                      <strong>{l.language}:</strong> {l.proficiency}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional */}
        {additionalSections && additionalSections.filter(s => s.enabled && s.items.length > 0).map((sec) => (
          <div key={sec.id}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-neutral-900">
                {sec.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sec.items.map((item) => (
                <div key={item.id} className="text-xs p-3 rounded-lg border border-neutral-200 bg-neutral-50/50">
                  <div className="flex justify-between font-bold text-neutral-900">
                    <span>{item.title}</span>
                    {item.date && <span className="text-[11px] font-normal text-neutral-500">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-neutral-500 text-[11px]">{item.subtitle}</p>}
                  {item.description && <p className="text-neutral-600 mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

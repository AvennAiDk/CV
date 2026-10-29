import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, CheckCircle2 } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const TemplateCorporate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, additionalSections, design } = data;
  const primaryColor = design.primaryColor || '#0369a1';

  return (
    <div className={`w-full min-h-[297mm] bg-white text-neutral-800 ${design.fontFamily} text-[13px] p-8 md:p-12 space-y-6`}>
      {/* Top Banner Header with grid */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 pb-6 border-b-2" style={{ borderColor: primaryColor }}>
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
            {personal.fullName || 'Tu Nombre y Apellidos'}
          </h1>
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: primaryColor }}>
            {personal.jobTitle || 'Puesto o Profesión'}
          </p>
          {personal.address && (
            <p className="text-xs text-neutral-500">{personal.address}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {design.photoShape !== 'hidden' && personal.photoUrl && (
            <img 
              src={personal.photoUrl} 
              alt={personal.fullName}
              className="w-24 h-24 object-cover rounded-md border border-neutral-300"
              referrerPolicy="no-referrer"
            />
          )}

          <div className="text-xs text-neutral-600 space-y-1 text-right">
            {personal.email && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personal.email}</span>
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personal.phone}</span>
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            )}
            {(personal.city || personal.country) && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{[personal.city, personal.country].filter(Boolean).join(', ')}</span>
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personal.linkedin}</span>
                <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Corporate Summary */}
      {summary && (
        <div>
          <div 
            className="text-xs font-bold uppercase tracking-wider text-white px-3 py-1 mb-2 inline-block rounded-xs"
            style={{ backgroundColor: primaryColor }}
          >
            Perfil Profesional
          </div>
          <p className="text-neutral-700 leading-relaxed text-justify">
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <div 
            className="text-xs font-bold uppercase tracking-wider text-white px-3 py-1 mb-3 inline-block rounded-xs"
            style={{ backgroundColor: primaryColor }}
          >
            Experiencia Laboral
          </div>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="pb-3 border-b border-neutral-100 last:border-b-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-neutral-900 text-sm">{exp.position}</h3>
                  <span className="text-xs font-semibold text-neutral-600 tabular-nums">
                    {exp.startDate} — {exp.current ? 'Presente' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-neutral-600 mb-1">
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

      {/* Education & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.length > 0 && (
          <div>
            <div 
              className="text-xs font-bold uppercase tracking-wider text-white px-3 py-1 mb-3 inline-block rounded-xs"
              style={{ backgroundColor: primaryColor }}
            >
              Educación
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <p className="font-bold text-neutral-900">{edu.degree}</p>
                  <p className="text-neutral-600">{edu.institution} {edu.city ? `· ${edu.city}` : ''}</p>
                  <p className="text-neutral-500 text-[11px] tabular-nums">
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
              <div 
                className="text-xs font-bold uppercase tracking-wider text-white px-3 py-1 mb-2 inline-block rounded-xs"
                style={{ backgroundColor: primaryColor }}
              >
                Habilidades y Competencias
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-neutral-700">
                {skills.map((s) => (
                  <div key={s.id} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <div 
                className="text-xs font-bold uppercase tracking-wider text-white px-3 py-1 mb-2 inline-block rounded-xs"
                style={{ backgroundColor: primaryColor }}
              >
                Idiomas
              </div>
              <div className="space-y-1 text-xs text-neutral-700">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="font-medium text-neutral-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional */}
      {additionalSections && additionalSections.filter(s => s.enabled && s.items.length > 0).map((sec) => (
        <div key={sec.id}>
          <div 
            className="text-xs font-bold uppercase tracking-wider text-white px-3 py-1 mb-2 inline-block rounded-xs"
            style={{ backgroundColor: primaryColor }}
          >
            {sec.title}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sec.items.map((item) => (
              <div key={item.id} className="text-xs border-l-2 pl-3" style={{ borderColor: primaryColor }}>
                <div className="flex justify-between font-bold text-neutral-900">
                  <span>{item.title}</span>
                  {item.date && <span className="text-[11px] text-neutral-500">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-neutral-600 text-[11px]">{item.subtitle}</p>}
                {item.description && <p className="text-neutral-600 mt-0.5">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

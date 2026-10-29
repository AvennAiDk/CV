import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, User } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const TemplateEuropean: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, additionalSections, design } = data;
  const primaryColor = design.primaryColor || '#0284c7';

  return (
    <div className={`w-full min-h-[297mm] bg-white text-neutral-800 ${design.fontFamily} text-[13px] p-8 md:p-12 space-y-6`}>
      {/* European Style Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-neutral-300">
        {design.photoShape !== 'hidden' && personal.photoUrl && (
          <div className="shrink-0">
            <img 
              src={personal.photoUrl} 
              alt={personal.fullName}
              className="w-28 h-32 object-cover border border-neutral-300 shadow-xs"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="flex-1 space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
            Currículum Vitae Europeo
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
            {personal.fullName || 'Tu Nombre y Apellidos'}
          </h1>
          <p className="text-sm font-semibold text-neutral-600">
            {personal.jobTitle || 'Puesto o Profesión'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-neutral-600 pt-2">
            {personal.email && (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-neutral-700">Email:</span>
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-neutral-700">Tel:</span>
                <span>{personal.phone}</span>
              </div>
            )}
            {(personal.city || personal.country) && (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-neutral-700">Residencia:</span>
                <span>{[personal.city, personal.country].filter(Boolean).join(', ')}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-neutral-700">LinkedIn:</span>
                <span>{personal.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* European Gutter Layout */}
      <div className="space-y-6">
        {/* Profile */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-xs font-bold uppercase tracking-wider text-neutral-600" style={{ color: primaryColor }}>
              Perfil Profesional
            </div>
            <div className="md:col-span-9 text-neutral-700 leading-relaxed text-justify">
              {summary}
            </div>
          </div>
        )}

        {/* Experience with Date Column */}
        {experience.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-xs font-bold uppercase tracking-wider text-neutral-600" style={{ color: primaryColor }}>
              Experiencia Laboral
            </div>
            <div className="md:col-span-9 space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-900 text-sm">{exp.position}</span>
                    <span className="text-xs font-medium text-neutral-500 tabular-nums">
                      {exp.startDate} — {exp.current ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-700">
                    {exp.company} {exp.city ? `· ${exp.city}` : ''}
                  </div>
                  {exp.description && (
                    <p className="text-neutral-600 text-xs leading-relaxed">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-neutral-700">
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

        {/* Education */}
        {education.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-xs font-bold uppercase tracking-wider text-neutral-600" style={{ color: primaryColor }}>
              Educación y Formación
            </div>
            <div className="md:col-span-9 space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-900">{edu.degree}</span>
                    <span className="text-xs text-neutral-500 tabular-nums">
                      {edu.startDate} — {edu.current ? 'Presente' : edu.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-700 font-medium">
                    {edu.institution} {edu.city ? `· ${edu.city}` : ''}
                  </div>
                  {edu.description && (
                    <p className="text-neutral-600 text-xs mt-0.5">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-xs font-bold uppercase tracking-wider text-neutral-600" style={{ color: primaryColor }}>
              Competencias
            </div>
            <div className="md:col-span-9 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s.id} className="text-xs bg-neutral-100 px-2.5 py-1 rounded text-neutral-800 border border-neutral-200">
                  {s.name} {s.level ? `(${s.level})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-xs font-bold uppercase tracking-wider text-neutral-600" style={{ color: primaryColor }}>
              Idiomas
            </div>
            <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {languages.map((l) => (
                <div key={l.id} className="border border-neutral-200 p-2 rounded bg-neutral-50">
                  <div className="font-semibold text-neutral-900">{l.language}</div>
                  <div className="text-neutral-500">{l.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional */}
        {additionalSections && additionalSections.filter(s => s.enabled && s.items.length > 0).map((sec) => (
          <div key={sec.id} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 text-xs font-bold uppercase tracking-wider text-neutral-600" style={{ color: primaryColor }}>
              {sec.title}
            </div>
            <div className="md:col-span-9 space-y-2">
              {sec.items.map((item) => (
                <div key={item.id} className="text-xs">
                  <div className="flex justify-between font-semibold text-neutral-900">
                    <span>{item.title}</span>
                    {item.date && <span className="text-neutral-500 tabular-nums">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-neutral-600 text-[11px]">{item.subtitle}</p>}
                  {item.description && <p className="text-neutral-600 mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

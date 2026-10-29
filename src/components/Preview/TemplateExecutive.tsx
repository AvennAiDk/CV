import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Shield } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const TemplateExecutive: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, additionalSections, design } = data;
  const primaryColor = design.primaryColor || '#1e3a8a';

  return (
    <div className={`w-full min-h-[297mm] bg-white text-neutral-800 ${design.fontFamily} text-[13px]`}>
      {/* Top Executive Header */}
      <div 
        className="p-8 md:p-10 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {design.photoShape !== 'hidden' && personal.photoUrl && (
            <div className="shrink-0">
              <img 
                src={personal.photoUrl} 
                alt={personal.fullName}
                className="w-28 h-28 object-cover rounded-lg border-2 border-white/30 shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {personal.fullName || 'Tu Nombre y Apellidos'}
            </h1>
            <p className="text-sm md:text-base font-medium text-white/90 mt-1 uppercase tracking-wider">
              {personal.jobTitle || 'Puesto o Especialidad'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-1.5 text-xs text-white/80 mt-4">
              {personal.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {personal.email}
                </span>
              )}
              {personal.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {personal.phone}
                </span>
              )}
              {(personal.city || personal.country) && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {[personal.city, personal.country].filter(Boolean).join(', ')}
                </span>
              )}
              {personal.linkedin && (
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5" />
                  {personal.linkedin}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-8 md:p-10 space-y-6">
        {/* Executive Summary */}
        {summary && (
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
              Resumen Ejecutivo
            </h2>
            <p className="text-neutral-800 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3 pb-1 border-b-2" style={{ borderColor: primaryColor }}>
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                Experiencia Profesional & Liderazgo
              </h2>
            </div>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-900 text-sm">{exp.position}</span>
                    <span className="text-xs font-semibold text-neutral-600 tabular-nums">
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

        {/* 2 Columns: Education + Skills/Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 pb-1 border-b" style={{ borderColor: primaryColor }}>
                <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                  Educación Superior
                </h2>
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

          <div className="space-y-5">
            {skills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
                  <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                    Áreas de Competencia
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span 
                      key={s.id}
                      className="text-xs bg-neutral-100 text-neutral-800 font-medium px-2 py-0.5 rounded border border-neutral-200"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
                  <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                    Idiomas
                  </h2>
                </div>
                <div className="space-y-1 text-xs">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between text-neutral-700">
                      <span>{l.language}</span>
                      <span className="font-medium text-neutral-500">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Sections */}
        {additionalSections && additionalSections.filter(s => s.enabled && s.items.length > 0).map((sec) => (
          <div key={sec.id}>
            <div className="flex items-center gap-2 mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                {sec.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sec.items.map((item) => (
                <div key={item.id} className="text-xs bg-neutral-50 p-2.5 rounded border border-neutral-200">
                  <div className="flex justify-between font-bold text-neutral-900">
                    <span>{item.title}</span>
                    {item.date && <span className="text-[11px] font-normal text-neutral-500">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-neutral-600 text-[11px]">{item.subtitle}</p>}
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

import React, { useRef } from 'react';
import { PersonalInfo } from '../../types/cv';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Upload, Trash2, Camera } from 'lucide-react';

interface PersonalSectionProps {
  data: PersonalInfo;
  onChange: (fields: Partial<PersonalInfo>) => void;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('La imagen seleccionada supera los 4MB. Por favor elige una imagen más ligera.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ photoUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo Upload */}
      <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300 flex items-center justify-center">
          {data.photoUrl ? (
            <img 
              src={data.photoUrl} 
              alt={data.fullName || 'Foto'} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Camera className="w-6 h-6 text-neutral-400" />
          )}
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-xs font-semibold text-neutral-800">Fotografía de Perfil (Opcional)</p>
          <p className="text-[11px] text-neutral-500">Formato JPG, PNG o WebP. Máximo 4MB.</p>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-medium px-2.5 py-1 bg-white border border-neutral-300 rounded hover:bg-neutral-100 transition-colors flex items-center gap-1.5 cursor-pointer text-neutral-700"
            >
              <Upload className="w-3 h-3" />
              Subir foto
            </button>
            {data.photoUrl && (
              <button
                type="button"
                onClick={() => onChange({ photoUrl: '' })}
                className="text-xs font-medium px-2.5 py-1 text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                Quitar
              </button>
            )}
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handlePhotoUpload} 
            className="hidden" 
          />
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Nombre y Apellidos <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Ej. Carlos Martínez López"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Puesto o Profesión <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej. Desarrollador Full Stack / Arquitecto"
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            className="w-full text-xs px-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="email"
              placeholder="carlos.martinez@email.com"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="tel"
              placeholder="+34 600 123 456"
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Ciudad
          </label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Madrid"
              value={data.city}
              onChange={(e) => onChange({ city: e.target.value })}
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            País
          </label>
          <input
            type="text"
            placeholder="España"
            value={data.country}
            onChange={(e) => onChange({ country: e.target.value })}
            className="w-full text-xs px-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Dirección (Opcional)
          </label>
          <input
            type="text"
            placeholder="Calle Mayor 45, 2ºB"
            value={data.address || ''}
            onChange={(e) => onChange({ address: e.target.value })}
            className="w-full text-xs px-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Perfil de LinkedIn
          </label>
          <div className="relative">
            <Linkedin className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="linkedin.com/in/usuario"
              value={data.linkedin || ''}
              onChange={(e) => onChange({ linkedin: e.target.value })}
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Sitio Web o Portafolio
          </label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="miporfolio.dev o github.com/usuario"
              value={data.portfolio || ''}
              onChange={(e) => onChange({ portfolio: e.target.value })}
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-neutral-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

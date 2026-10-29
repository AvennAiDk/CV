import React from 'react';
import { CVData } from '../../types/cv';
import { TemplateModern } from './TemplateModern';
import { TemplateClassic } from './TemplateClassic';
import { TemplateMinimal } from './TemplateMinimal';
import { TemplateExecutive } from './TemplateExecutive';
import { TemplateCreative } from './TemplateCreative';
import { TemplateCorporate } from './TemplateCorporate';
import { TemplateEuropean } from './TemplateEuropean';

interface CVDocumentProps {
  data: CVData;
  scale?: number;
}

export const CVDocument: React.FC<CVDocumentProps> = ({ data, scale = 1 }) => {
  const renderTemplate = () => {
    switch (data.design.template) {
      case 'modern':
        return <TemplateModern data={data} />;
      case 'classic':
        return <TemplateClassic data={data} />;
      case 'minimal':
        return <TemplateMinimal data={data} />;
      case 'executive':
        return <TemplateExecutive data={data} />;
      case 'creative':
        return <TemplateCreative data={data} />;
      case 'corporate':
        return <TemplateCorporate data={data} />;
      case 'european':
        return <TemplateEuropean data={data} />;
      default:
        return <TemplateModern data={data} />;
    }
  };

  return (
    <div 
      className="flex justify-center items-start w-full transition-transform duration-200"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center'
      }}
    >
      {/* 
        This is the actual A4 container: 210mm wide x 297mm min-height.
        Equates roughly to 794px x 1123px at standard screen 96 DPI.
      */}
      <div 
        id="cv-printable-root"
        className="a4-sheet bg-white shadow-2xl relative select-text"
        style={{
          width: '210mm',
          minHeight: '297mm',
          boxSizing: 'border-box'
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

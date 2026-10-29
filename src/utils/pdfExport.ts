import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface PDFExportOptions {
  elementId: string;
  fileName?: string;
  onProgress?: (progress: number, message: string) => void;
}

/**
 * Generates and downloads a true high-resolution multi-page or single-page A4 PDF
 */
export async function exportToPDF({
  elementId,
  fileName = 'CV_Curriculum.pdf',
  onProgress
}: PDFExportOptions): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return false;
  }

  try {
    onProgress?.(15, 'Preparando documento para renderizado...');

    // Wait slightly to ensure fonts and layout have settled
    await new Promise((resolve) => setTimeout(resolve, 150));

    onProgress?.(35, 'Capturando contenido en alta definición...');

    // A4 dimensions in mm
    const a4WidthMm = 210;
    const a4HeightMm = 297;

    // Use high scale for crisp print quality
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        // Ensure cloned element is clean and fully visible
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.margin = '0';
          clonedElement.style.boxShadow = 'none';
        }
      }
    });

    onProgress?.(70, 'Estructurando páginas en formato A4...');

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const canvasWidthPx = canvas.width;
    const canvasHeightPx = canvas.height;

    // Calculate height in mm corresponding to 210mm width
    const imgHeightMm = (canvasHeightPx * a4WidthMm) / canvasWidthPx;

    let heightLeft = imgHeightMm;
    let position = 0;
    let pageCount = 1;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, a4WidthMm, imgHeightMm, undefined, 'FAST');
    heightLeft -= a4HeightMm;

    // Subsequent pages if content overflows A4 height (with small tolerance)
    while (heightLeft > 5) {
      position = -(pageCount * a4HeightMm);
      pdf.addPage('a4', 'portrait');
      pdf.addImage(imgData, 'JPEG', 0, position, a4WidthMm, imgHeightMm, undefined, 'FAST');
      heightLeft -= a4HeightMm;
      pageCount++;
    }

    onProgress?.(95, 'Finalizando y guardando archivo...');

    // Format safe name
    const sanitizedName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(sanitizedName);

    onProgress?.(100, '¡Descarga completada!');
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

/**
 * Triggers native browser print dialog specifically styled for A4 output
 */
export function printCV(): void {
  window.print();
}

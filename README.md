# JobStep CV - Creador Profesional de Currículums

Aplicación web profesional para diseñar, personalizar y descargar currículums vitae (CV) en formato PDF de alta fidelidad, inspirada en JobStep.io.

---

## 🚀 Cómo Publicar la Aplicación Gratis

Esta aplicación es una Single Page Application (SPA) basada en React, Vite y Tailwind CSS, lo que significa que **no necesita servidores de pago ni bases de datos costosas** para funcionar. Todo el renderizado, el guardado en almacenamiento local y la generación del PDF ocurren directamente en el navegador del usuario.

### Opción 1: Enlace Público de Google AI Studio (¡Ya está activa!)
Tu aplicación ya cuenta con un despliegue gratuito automático en Google Cloud Run a través de Google AI Studio:
- **URL pública compartible:** Puedes obtenerla directamente desde el botón **"Publicar gratis"** en la barra superior de la aplicación o copiarla desde tu navegador.
- Es 100% gratuita y funciona de inmediato sin configurar nada.

---

### Opción 2: Publicar en Vercel (100% Gratis con Dominio Personalizado)
Vercel ofrece hosting ilimitado y gratuito para proyectos de Vite/React:

1. Crea una cuenta gratuita en [vercel.com](https://vercel.com).
2. Sube este código a tu cuenta de GitHub o GitLab.
3. En Vercel, haz clic en **"Add New Project"** y selecciona tu repositorio.
4. El archivo `vercel.json` ya está incluido en este proyecto para gestionar todas las rutas automáticamente.
5. Haz clic en **"Deploy"**. En 30 segundos tendrás tu app publicada en `tu-nombre.vercel.app` (y podrás vincular tu propio dominio `.com` gratis si lo tienes).

---

### Opción 3: Publicar en Netlify (Arrastrar y Soltar sin código)
Si prefieres no usar Git:

1. Ejecuta en la terminal:
   ```bash
   npm run build
   ```
   Esto generará la carpeta `dist/` con todo el sitio listo para producción.
2. Inicia sesión en [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arrastra la carpeta `dist` directamente a la pantalla.
4. ¡Listo! Netlify te dará una URL pública gratuita al instante (`tu-sitio.netlify.app`). El archivo `public/_redirects` ya está incluido para evitar errores 404 al recargar.

---

### Opción 4: Publicar en GitHub Pages
1. Sube tu código a un repositorio público en GitHub.
2. En GitHub, ve a **Settings > Pages**.
3. En "Build and deployment", selecciona **GitHub Actions**.
4. Elige el flujo predeterminado para **Static HTML / Vite** y publica gratis en `https://tu-usuario.github.io/tu-repo`.

---

## 🛠️ Tecnologías Utilizadas
- **React 19 & TypeScript**: Arquitectura modular y tipado estricto.
- **Vite 8**: Compilación ultra rápida y empaquetado optimizado para producción.
- **Tailwind CSS v4**: Diseño visual sobrio, moderno y sin dependencias pesadas.
- **jsPDF & html2canvas**: Generación real de PDF en formato A4 con resolución de impresión (2.5x scale).
- **Lucide Icons**: Iconografía profesional y funcional.
- **Local Storage API**: Persistencia automática sin necesidad de registrarse.

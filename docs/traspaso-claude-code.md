# Traspaso a Claude Code: estado de la web FNX (27/11/2026)

Leé esto entero antes de tocar nada. Resume todo lo hecho en el chat con Nadin y cómo trabajar con ella.

## Quién es y cómo trabaja
- Nadin Reus, directora de FNX (Fénix Creativo). Escribe en español rioplatense con voseo; respondele igual.
- Quiere respuestas directas pero explicadas en detalle, para aprender mientras trabajamos.
- **Antes de publicar cualquier cambio en la web, mostrale cómo queda** (capturas en celular, y en computadora si cambia algo visual) y esperá su OK explícito ("publicalo").
- Casi todo el público entra desde el celular: verificá siempre a 390 px de ancho.
- Correos separados: Estudio, marketing y diseño van a fnxestudio22@gmail.com; Salud, a fnxsalud@gmail.com.
- WhatsApp Business: 2616306508. Todos los botones pasan por `WhatsAppButton` y los mensajes viven en `src/config/site.ts`.
- La ubicación se escribe siempre "sedes en San Juan y Mendoza y trabajo en todo el país".
- FNX trabaja en branding y marketing desde 2019.

## Proyecto y publicación
- Repo: github.com/linkMKT4183/FNXestudio, rama `main` conectada a Lovable (proyecto "Fnxestudio", id 95453be4-fca9-406b-9adf-46cd5284503f).
- Stack: TanStack Start (SSR), React, Tailwind v4, shadcn/ui, vitest. Reglas del repo en `AGENTS.md`.
- No reescribas historia publicada (nada de force push). Trabajá en una rama, mostrá, y recién con el OK hacé fast-forward a `main`.
- Al subir a `main`, Lovable toma el commit en uno o dos minutos. Después hay que publicar: botón **Publish** en Lovable, o la herramienta de deploy de Lovable si está conectada. Lovable no tiene créditos de IA, pero sincroniza y publica igual.
- Verificación antes de subir: `npx tsc --noEmit`, `npx vitest run` (52 pruebas), `npx eslint` sobre los archivos tocados.
- Vista local: `npx vite dev --host 127.0.0.1 --port 5173`. `vite preview` no sirve con el build de Cloudflare.
- La insignia "Edit with Lovable" ya está oculta en la configuración del proyecto.

## Identidad visual (guía de Miro "FNX · Guía de animaciones")
- Negro #0B0B0B, grafito #1C1C1C, crema #F3EEE4, gris #A3A3A3.
- Un solo color por área: Estudio #F2552C, Consultoría #4C8DFF, Salud #3CCB7F, Noticias #FFD23F. Se aplica con `data-area` y las clases `bg-area` / `text-area`.
- Concepto "uno entre muchos": objetos apagados y uno solo encendido con neón del color del área.
- Tipografías: Anton para títulos, Montserrat para texto y Mrs Saint Delafield solo para la firma.
- Prohibido: fondos claros, emojis, avatares o personas, motivos repetidos y la grilla de cuadros.
- Curva de movimiento de la marca: `--ease-fnx: cubic-bezier(0.16,1,0.3,1)`. Todo movimiento se apaga con `prefers-reduced-motion`.

## Lo que ya está hecho y publicado
- **SEO local:**
  - 6 páginas de servicios (`estudio_.*`), /mendoza, /san-juan y Notas (4 notas).
  - Títulos y descripciones por página, JSON-LD (Service, FAQ, Breadcrumb, Article, ProfessionalService con `foundingDate` 2019) y `public/sitemap.xml`.
- **Comunicación:**
  - Inicio con un subtítulo que explica las 4 áreas y la charla de 15 minutos sin costo.
  - Mensajes de WhatsApp correctos según la página.
  - Estudio dirigido a "pymes y emprendedores, desde 2019".
- **Salud, centrada en el REPROCANN:**
  - `src/routes/salud.tsx` con normativa nacional y provincial al día (SEDRONAR, Decreto 27/2026, Resolución 1780/2025, REPRO-Mendoza, REPROVET).
  - Credencial de ejemplo (`src/components/salud/CredencialEjemplo.tsx`) y aviso de que la credencial se ve en Mi Argentina.
  - Guías en `src/data/salud-guias.ts`, con la plantilla `SaludGuiaPage`: /salud/reprocann-mendoza, /salud/reprocann-san-juan y /salud/renovar-reprocann.
- **Credencial de ejemplo:** tiene formato de tarjeta, los campos reales y los colores de FNX. Nunca copiar el escudo ni el logo del Ministerio, ni poner datos de personas reales: está marcada como EJEMPLO para que no sirva como molde de una credencial falsa.
- **Movimiento constante:**
  - Fotos con acercamiento lento (clase `fnx-cam` en `FnxImage`).
  - Entradas escalonadas con `Reveal` (variantes up, left, right y zoom, con `stagger`).
  - Tarjetas con `tarjeta-viva`, chips con luz (`chips-vivos`) y números que respiran (`paso-num`).
  - Credencial que flota (`credencial-flota`).
- **Fondo:**
  - Tela negra satinada con líneas finas, en `public/fondos/` (versión vertical y horizontal), dibujada por `.fondo-fnx::before`.
  - Los resplandores del color del área van en `::after`.
  - Se regenera con `scripts/fondo-tela.py` (numpy + Pillow).
- **Medición:**
  - PageSpeed en celular: inicio 88/100 (LCP 3,6 s) y Salud 87.
  - La imagen principal del inicio tiene `preload`.
  - Los botones de WhatsApp llevan `data-whatsapp-topic` para el seguimiento de clics de Lovable.

## Próximo trabajo pedido: animaciones, movimientos y entradas de texto
Nadin quiere mejorar las animaciones de fondo, los movimientos y las entradas de los textos. Propuesta que ya conoce, de menor a mayor impacto:
1. **Parallax:** la tela se mueve más lento que el contenido al hacer scroll.
2. **Luz que sigue el dedo o el mouse:** un brillo suave recorre los pliegues por donde pasás (en el celular, al tocar o al inclinarlo).
3. **Barrido de luz del color del área:** cada tanto cruza la tela una línea fina de luz.
4. **Tela en tiempo real con WebGL:** ondas y reflejos reales. Si el equipo es lento, se muestra la textura actual.

Recomendación: hacer primero 1 + 2 + 3 y después probar 4.

**Entradas de texto:**
- Revisar `Headline` y `Reveal` en `src/components/fnx/primitives.tsx`.
- Sumar entradas por palabra o letra con máscara y desenfoque, sin que el título tarde en verse: hoy el título del inicio con animación es lo que frena el LCP.
- Usar las skills de audit-suite: `web-animation-design` y `make-interfaces-feel-better`.
- GSAP ya está disponible como opción. Antes de sumar una librería, medí su peso.

**Siempre:**
- No tocar las animaciones existentes que a ella le gustan sin preguntar.
- Respetar "reducir movimiento".
- Volver a medir la velocidad después de cada cambio.
- Mostrar la vista previa antes de publicar.

## Pendientes que dependen de ella
- Ficha de Google (Perfil de Empresa): falta saber si tiene una oficina donde recibe gente (si no, se arma como negocio con zona de servicio, sin dirección) y qué horarios mostrar.
- Search Console: tiene que iniciar sesión con su cuenta de Google; después enviar `https://fnxestudio.com/sitemap.xml`.
- Pruebas reales: casos, testimonios con permiso y reseñas. Nunca inventarlos.
- WhatsApp Business: el número sigue vinculado al negocio "Mendocup" en Meta. Ella lo desvincula y después se conecta a FNX Estudio.
- Contenido de Instagram: aprobar la estrategia semanal, armar 3 carruseles animados y programarlos (skill `fnx-contenido` en Drive, carpeta "FNX · Skills").

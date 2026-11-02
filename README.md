# Fnxestudio

Creá el sitio web oficial de FNX (Fénix Creativo), un estudio creativo de Mendoza, Argentina. Todo el texto en español de Argentina (voseo: "escribinos", "contanos"). El sitio tiene dos partes: la web comercial para captar clientes y una sección "Marca" que presenta la identidad de marca de forma interactiva.

## Identidad visual (obligatoria en todo el sitio)
- Fondo negro #0B0B0B en todo el sitio (no hay modo claro). Cajas y tarjetas grafito #1C1C1C. Textos crema #F3EEE4. Textos secundarios gris #A3A3A3. Líneas #2E2E2E.
- Un color de acento por área, y solo uno por sección o página: FNX Estudio naranja #F2552C, FNX Salud verde #3CCB7F, FNX Noticias amarillo #FFD23F. En la home y en páginas generales el acento es naranja. Texto sobre un color de acento siempre en negro. Nunca mezclar los tres colores grandes juntos; juntos solo en etiquetas chicas.
- Tipografías de Google Fonts: Anton para titulares (MAYÚSCULAS, muy grandes, interlineado cerrado, y la última palabra o frase del titular en el color de acento); Montserrat para textos; Mrs Saint Delafield para el logo.
- Logo: solo la palabra "Fnx" en Mrs Saint Delafield, color crema. Nada debajo ni al lado. Va en el header y en el footer, y grande en el hero de la home.
- Concepto visual: "uno que se destaca entre muchos". Usar como elemento gráfico recurrente una fila de 5 formas redondeadas tipo piezas (pueden ser divs o SVG), 4 en grafito y 1 en el color de acento con un brillo suave.
- Prohibido: emojis, degradados de colores, fondos claros, imágenes de plantas u hojas de cannabis, humo o productos, fotos de stock de personas. Animaciones sutiles (fade y subida al entrar), respetando prefers-reduced-motion.
- Para lectores con TDAH: bloques cortos, un recuadro "En 10 segundos" al inicio de cada sección con el resumen en una línea, mucho aire, tarjetas que se abren o se dan vuelta al tocarlas.

## Constantes
Creá un archivo de configuración con: WHATSAPP_NUMBER = "" (vacío, lo completa la dueña) y MANUAL_URL = "https://www.canva.com/d/SYr8B-ZM5BWGkRt". Todos los botones de WhatsApp arman el link https://wa.me/NUMERO?text=MENSAJE con un mensaje precargado distinto según la página: "Hola FNX, quiero hacer crecer mi marca", "Hola FNX, necesito orientación en cannabis medicinal" o "Hola FNX, quiero recibir novedades". Si el número está vacío, el botón muestra el texto "WhatsApp próximamente" deshabilitado.

## Páginas

### 1. Home (/)
- Hero: logo Fnx grande, titular "CREAMOS MARCAS Y CONECTAMOS PERSONAS DE CONFIANZA." (la palabra CONFIANZA en naranja), bajada "Estudio creativo en Mendoza. Una empresa, tres áreas."
- Dos puertas grandes lado a lado (apiladas en celular): "Quiero hacer crecer mi marca" (naranja, va a /estudio) y "Necesito orientación en cannabis medicinal (+18)" (verde, va a /salud).
- Las tres áreas en tarjetas: FNX Estudio (Branding, producción audiovisual, tienda online, redes y estrategia), FNX Salud (Gestión del trámite REPROCANN, profesionales verificados y vinculación con ONGs), FNX Noticias (Marketing, negocios, emprendimiento y cannabis medicinal, siempre con fuentes).
- Propuesta de valor: "Conocemos el sector y tenemos la red. Pocas agencias pueden hacer las tres cosas a la vez."
- Cómo trabajamos: 3 pasos (Nos escribís por WhatsApp; Te hacemos 3 preguntas para entender qué necesitás; Te pasamos una propuesta clara). Condiciones: presupuesto firmado y 50% de anticipo; archivos editables con el 100% pago.
- CTA final de WhatsApp.

### 2. FNX Estudio (/estudio), acento naranja
- Titular "DESATAMOS TU MARCA." Bajada "Branding, contenido y estrategia para marcas de cualquier rubro."
- Servicios en tarjetas: Branding e identidad; Producción audiovisual; Tienda online; Redes y contenido; Estrategia. Sin precios.
- Bloque de frases de marca grandes que rotan: "Tu potencial necesita dirección.", "Ver la jugada antes que el mercado.", "Primero la marca. Después la pauta.", "Tu perfil es tu vidriera."
- Recurso gratuito: "Checklist de marca: 10 puntos antes de invertir en redes", con botón de WhatsApp "Pedilo gratis".
- CTA WhatsApp con mensaje de marca.

### 3. FNX Salud (/salud), acento verde
- Al entrar por primera vez, un aviso de edad a pantalla completa: "Este contenido es para mayores de 18 años." con botones "Soy mayor de 18" (guarda la elección en localStorage) y "Salir" (vuelve a la home).
- Titular "TE ACOMPAÑAMOS EN CADA PASO." Bajada "Orientación clara sobre el trámite REPROCANN, sin estigma y sin letra chica."
- Qué hacemos: Orientación en el trámite REPROCANN; Profesionales verificados (médicos y abogados que chequeamos antes de recomendarte); Vinculación con ONGs verificadas.
- Serie "REPROCANN sin vueltas": acordeón con pasos; por ahora solo el Paso 1 "La consulta médica: todo empieza con un médico con formación en cannabis medicinal." y un texto "Próximos pasos en preparación".
- Preguntas frecuentes en acordeón: "¿Por dónde empiezo?" (Escribinos y te orientamos según tu caso.), "¿Me garantizan la aprobación?" (No. La aprobación depende de la evaluación oficial; te ayudamos a presentar todo correctamente.), "¿Qué pasa con mis datos?" (Pedimos tu consentimiento y tratamos tu información con reserva.)
- Recurso: "Guía REPROCANN paso a paso", botón WhatsApp "Pedila gratis".
- En el pie de cada sección de esta página, en gris chico: "Contenido para mayores de 18 años. Uso medicinal y responsable, con indicación médica."
- Nunca imágenes de plantas, hojas, humo ni productos. Sin promesas terapéuticas.

### 4. FNX Noticias (/noticias), acento amarillo
- Titular "LO QUE PASA, CONTADO CON FUENTES."
- Grilla de tarjetas de noticias, cada una con categoría, titular, bajada, fuente con link y fecha. Filtros por categoría: Todas, Marketing, Negocios, Cannabis medicinal. Las de cannabis llevan la leyenda chica "Contenido para mayores de 18 años". Datos (usar exactamente):
  1. Marketing · "Instagram prueba videos de hasta 90 minutos" · "Se llama Features, es horizontal y por ahora tiene acceso limitado." · Publimetro, 29/10/2026 · https://www.publimetro.co/tecnologia/2026/10/29/instagram-prepara-un-cambio-que-podria-transformar-la-app-videos-de-90-minutos-nuevas-formas-de-monetizacion-y-mas-ia/
  2. Marketing · "La publicidad entra en la era del aviso personalizado" · "Con IA, una campaña puede tener cientos de versiones según quién la vea." · La Nación, 31/10/2026 · https://www.lanacion.com.ar/economia/negocios/la-publicidad-entra-en-la-era-del-aviso-personalizado-nid31102026/
  3. Negocios · "Pymes: advierten recesión en el último trimestre" · "El 80,9% de los gerentes comerciales prevé estancamiento o contracción, según Industriales Pymes Argentinos." · Noticias Argentinas, 01/10/2026 · https://noticiasargentinas.com/economia/advierten-que-el-entramado-pyme-entra-al-ultimo-trimestre-en-recesion_a6abe5a7d8419983d4254f506
  4. Negocios · "La Experiencia Endeavor Cuyo llegó a Mendoza" · "Mentorías en validación de negocio, financiamiento, IA y ventas." · Descubre.vc, 06/10/2026 · https://www.descubre.vc/noticia/mendoza-recibe-la-experiencia-endeavor-cuyo-2026-para-potenciar-emprendedores-2026-10-06
  5. Cannabis medicinal · "Expo Cannabis 2026: más de 300 marcas en La Rural" · "Del 23 al 25 de octubre, en Buenos Aires." · MDZ, 26/10/2026 · https://www.mdzol.com/sociedad/2026/10/26/expo-cannabis-2026-la-rural-junto-mas-de-300-marcas-clubes-cannabicos-y-una-industria-en-alza-1990700.html
  6. Cannabis medicinal · "El CONICET analizó más de 60 muestras en la Expo" · "Con el servicio de control de calidad de la unidad ENyS." · ENyS-CONICET, octubre 2026 · https://enys.conicet.gov.ar/expo-cannabis-2026/
  7. Cannabis medicinal · "Un mercado potencial de US$ 834 millones" · "Es una proyección del informe El Otro Blanqueo para el cannabis medicinal, no ventas reales." · Análisis Digital, 13/10/2026 · https://www.analisisdigital.com.ar/interes-general/2026/10/13/cannabis-medicinal-un-mercado-potencial-de-us-834-millones-que-la-falta-de-regulacion-mantiene-frenado
  8. Cannabis medicinal · "Prorrogan un año la intervención de ARICCAME" · "Lo dispuso el Decreto 1147/2026, del 6 de octubre." · Agenda Cannabis, 13/10/2026 · https://agendacannabis.com.ar/2026/10/13/cannabis-en-argentina-industria-en-expansion-ley-penal-congelada/
  9. Cannabis medicinal · "Cáñamo hortícola: nuevas licencias por 5 años" · "La Resolución 69/2026 de ARICCAME crea cuatro tipos de licencia." · Agenda Cannabis, 13/10/2026 · misma URL que la 8
  10. Cannabis medicinal · "El REPROCANN ahora depende de la SEDRONAR" · "El cambio llegó con el Decreto 27/2026; el sector sigue reclamando por las demoras." · Revista THC, 22/10/2026 · https://revistathc.com/reprocann-en-expo-cannabis-2026-aprovecha-para-hacer-tu-registro-con-descuento/
- Guardá las noticias en un archivo de datos separado para poder agregar más fácil.
- CTA: "Recibí las novedades por WhatsApp".

### 5. Marca (/marca): presentación interactiva de la identidad
Una página con navegación por secciones (menú de pestañas arriba y botones Anterior / Siguiente abajo, también con flechas del teclado), cada sección con su recuadro "En 10 segundos":
- Esencia: "RENACER Y TRANSFORMAR." Texto: "Fénix Creativo es el estudio de Nadin Reus en Mendoza. Une creatividad, producción audiovisual y una red de confianza en salud. Toma lo que existe y lo hace renacer con más claridad y más fuerza." Concepto: "Uno que se destaca entre muchos: cada pieza es un mundo negro donde una sola cosa se enciende en el color del área."
- Misión: "Crear marcas con carácter y conectar a las personas con profesionales y organizaciones de confianza, con claridad, responsabilidad y una mirada propia." Visión: "Ser la referencia en Argentina para las marcas que quieren destacarse y para quienes buscan información y acompañamiento confiable en salud."
- Valores como 5 tarjetas que se dan vuelta al tocarlas: Carácter (Cada pieza tiene una idea propia.), Claridad (Decimos las cosas simples y sin vueltas.), Confianza verificada (Solo trabajamos con profesionales y marcas que cumplen.), Responsabilidad (Comunicamos salud con cuidado y para adultos.), Coherencia (Lo que prometemos es lo que hacemos.)
- Personalidad: arquetipo "la Creadora que guía", con 4 barras entre opuestos: Seria–Juguetona (28%), Clásica–Moderna (74%), Discreta–Audaz (78%), Distante–Cercana (80%).
- Tono: "Una voz, tres registros" con selector Estudio / Salud / Noticias que cambia el color de acento de la sección y muestra: Estudio "Directo, con carácter, seguro." frase "Desatamos tu marca."; Salud "Cercano, claro, sin estigma, responsable." frase "Te acompañamos en cada paso."; Noticias "Informativo, preciso, con fuentes." frase "Lo que pasa, contado con fuentes." Más "Así sí" (Desatamos tu marca. / Elegís vos. / Te acompañamos en cada paso.) y "Así no" (Frases largas. / Promesas exageradas. / Adjetivos vacíos como innovador o disruptivo.)
- A quién le hablamos: 4 tarjetas que se expanden: Lucía (FNX Estudio, dueña de una pyme de Mendoza, 35 a 45 años; necesita una marca profesional, contenido constante y vender online; la frena no tener tiempo ni saber a quién delegar; mensaje "Que tu marca no pase desapercibida."), Dr. Martín (FNX Salud, médico matriculado de 40 a 55 años con formación en cannabis medicinal; necesita pacientes derivados de forma ordenada y comunicar su trabajo dentro de la norma; lo frena el estigma y el miedo a incumplir la normativa; mensaje "Te conectamos con pacientes que buscan un profesional de confianza."), Sofía (FNX Salud, paciente adulta mayor de 18; necesita hacer su trámite y encontrar un médico confiable; la frena no saber por dónde empezar y desconfiar de lo que ve en redes; mensaje "Te acompañamos en cada paso."), ONG (FNX Salud, inscripta en REPROCANN con director médico; necesita sumar pacientes de forma transparente y comunicar mejor; la frena la poca visibilidad; mensaje "Te mostramos como una opción verificada.")
- Identidad visual: el logo Fnx; paleta en muestras que copian el código hex al tocarlas (Negro #0B0B0B, Grafito #1C1C1C, Crema #F3EEE4, Gris #A3A3A3, Naranja fuego #F2552C, Verde #3CCB7F, Amarillo #FFD23F) con la regla 70/20/10; tipografías; un post de ejemplo en formato 4:5 que cambia de color con el selector de área.
- Manual de marca: tarjeta tipo portada ("Fnx" + "MANUAL DE MARCA" + "42 páginas · 11 capítulos") con un botón grande "Abrir el manual completo" que abre MANUAL_URL en pestaña nueva, y un mapa de capítulos con botones que muestran el contenido: Portada e índice (1–2); Identidad (3–13: esencia, misión y visión, valores, propuesta de valor, personalidad, tono, mensajes clave, así sí y así no, lo que nunca hacemos); Tres áreas (14–15); Personas (16–20); Logo (21–22); Color (23–25); Tipografía (26–27); Fotografía (28–30: estilo, composición, elementos gráficos); Por área (31–33); Aplicaciones (34–41: papelería, stickers, banners, redes sociales, página web, merchandising, firma de email); Cierre (42).

## Header y footer
- Header fijo con el logo Fnx a la izquierda y links: Estudio, Salud, Noticias, Marca, y un botón naranja "Escribinos". Menú hamburguesa en celular.
- Footer con el logo Fnx, "Mendoza, Argentina", los links de las páginas y "© 2026 Fénix Creativo".

## Técnico
- Totalmente responsive, pensado primero para celular.
- SEO básico: títulos y descripciones por página en español; título general "FNX · Fénix Creativo".
- Accesible: foco visible, contraste correcto, botones con texto claro.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fnxestudio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/95453be4-fca9-406b-9adf-46cd5284503f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

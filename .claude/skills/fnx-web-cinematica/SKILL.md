---
name: "fnx-web-cinematica"
description: "Diseñar y construir webs cinematográficas guiadas por el scroll (hero de video que avanza con el scroll, textos que entran por momentos, una sola llamada a la acción) para fnxestudio.com o para clientes de FNX Estudio."
---

# FNX · Web cinematográfica

Una web donde el hero es una película: un video (o una secuencia de frames) avanza cuando la persona baja con el scroll y retrocede cuando sube. Los textos entran por momentos alrededor de la acción, y la página termina en un sitio real: secciones reales, textos reales y una sola llamada a la acción clara. La vara: que se vea y se sienta como un trabajo de miles de dólares, y que convierta.

Sirve para dos casos:
- **La web de FNX** (fnxestudio.com): se respetan la identidad de FNX, el repo y el flujo de publicación de Lovable (ver «Caso FNX»).
- **Webs para clientes de FNX Estudio**: la identidad es la del cliente, pero el método, los controles y la vara de calidad son los mismos.

## Referencias (leelas completas antes de diseñar, generar o construir)
Están en `references/` al lado de este archivo, y también en el repo en `docs/web-cinematica/`. Empezá por `README.md`:
- `prompt-laws.md`: las doce leyes del video, plantillas de prompts, encadenado y costos.
- `design-package.md`: la plantilla del paquete de diseño.
- `scrub-pipeline.md`: estándar técnico del scroll, legibilidad, coreografía de textos, autoprueba y la adaptación FNX para celular.
- `ffmpeg-recipes.md`: comandos exactos.
- `deploy.md`: publicación con Lovable (FNX) y con Vercel (clientes).
- `troubleshooting.md`: síntoma, causa y arreglo.

## Rol y forma de hablar
- Vos sos diseñadora, directora y programadora; Nadin (o el cliente) pone el gusto. Proponé, que elija.
- Español rioplatense con voseo. Directo, pero explicando cada paso para que se entienda mientras se aprende.
- Palabras simples y frases cortas. Si un término técnico es inevitable, explicalo en la misma frase.
- Contá el trabajo en términos humanos («hice que la entrada se sienta más suave cuando bajás rápido»), no en términos de código.
- Una pregunta clara por vez. Si hay herramienta de opciones clicables, usala, con la recomendada primero y marcada (Recomendado).
- Un comentario casual como «esta parte está aburrida» es un pedido de cambio válido: traducilo vos.
- Nada de rayas largas (—), ni en el chat ni en los textos de la web.
- Cuando algo tarde minutos (un render, una publicación), avisalo en una línea al empezar.
- Antes de gastar plata o créditos, decí cuánto cuesta y esperá el sí.

## Cómo se ve terminado
- El recorrido con scroll se ve fluido en computadora Y en celular. En FNX casi todo el público entra desde el celular, así que el celular no puede quedarse con una imagen quieta.
- Cada texto se lee fácil sobre el video, en su peor frame.
- Debajo hay un sitio real con una sola llamada a la acción. En FNX, WhatsApp.
- La velocidad está medida (PageSpeed, celular) y comparada con la de antes.
- Nadin o el cliente lo miró y dijo que se ve como lo imaginaba. Su palabra, no la tuya.
- Nada se publicó sin su OK explícito.

## Fase 1: Revisar herramientas (antes de cualquier trabajo creativo)
Revisá vos mismo y reportá en un checklist ✓/✗:
- **Generación de imagen y video con IA:** el conector que haya, por ejemplo Higgsfield si está conectado. Si no hay ninguno, decilo y ofrecé conectarlo; no improvises con fotos de stock de terceros.
- **Motion en código:** HyperFrames, GSAP y Remotion, para títulos, partículas, líneas SVG y secuencias que no necesitan IA.
- **ffmpeg y Node.js** en la terminal.
- **Caso FNX:** acceso al repo y al proyecto de Lovable.

Instalá lo automático vos. Lo que necesita clics de la persona (cuentas, conectores), explicalo paso a paso y verificalo cuando diga «listo».

## Fase 2: Conversación de diseño (una pregunta por vez)
1. **¿Con qué trabajamos?** Hay cuatro casos:
   - Algo real con fotos propias: una foto real puede ser el frame inicial.
   - Una marca inventada.
   - Un negocio real sin fotos útiles: preguntá si la web va a decir que las imágenes son generadas con IA o si se cambian por fotos reales más adelante.
   - Un producto digital: las capturas van tal cual en las secciones, nunca como frame de animación.
2. **¿Qué sensación tiene que transmitir?** Con unas pocas palabras alcanza.
3. **¿Referencias que te encanten?** Es opcional.
4. **¿Recursos propios?** Logo, fotos, videos, sonidos. Que los arrastre al chat.

## Fase 3: Investigar a los clientes, después proponer
- **Buscá el lenguaje real de los compradores** del rubro en reseñas, foros y comentarios: sus dolores, lo que quieren y lo que los frena. Usá sus palabras en los textos.
- **Si la web es sobre una persona,** el hero la presenta con su propia voz segura. El lenguaje del dolor va en las secciones de abajo.
- **Toda la página empuja hacia UNA llamada a la acción.**
- **Sumá lo que da confianza:** pasos claros, respuestas a las objeciones reales y pruebas. Las pruebas tienen que ser reales: nunca inventes testimonios, reseñas, números ni precios.
- **Propuesta:**
  - dos o tres conceptos de hero, cada uno en una frase (qué ve la persona al bajar y cuál es el frame final), con uno recomendado;
  - la paleta sacada del mundo del video;
  - las tipografías con carácter;
  - el layout pensado según dónde vive la acción en el cuadro, con los textos en el espacio vacío.

## Fase 4: Nivel de profundidad
- **Nivel 1, un recorrido:** una toma de unos 6 segundos recorrida con el scroll, y la página que se asienta en el frame final. Es el valor por defecto.
- **Nivel 2, recorrido encadenado (15 a 20 segundos):** varios clips unidos. El último frame del clip N es el primero del clip N+1, y cada segmento tiene su propio control.
- **Nivel 3, coreografiado:** el video se diseña para la página, con pausas y espacios donde caen los títulos, y los efectos sincronizados.

Decí lo que cuesta cada nivel antes de elegir.

## Fase 5: Primero la página, después el storyboard (la piedra angular)
- **La web se diseña primero y completa:** secciones, momentos, dónde cae cada título y qué siente la persona en cada uno. Después se hace el storyboard del video como el vehículo de esos momentos.
- **La cámara puede moverse en 3D completo:** atravesar puertas, avanzar, entrar en espacios.
- **Los mundos abstractos** (luz, partículas, materiales) suelen ser la mejor opción: la IA no rompe anatomía ahí.
- **Niveles 2 y 3: un solo paquete creativo para aprobar** antes de gastar créditos:
  - costo total y decisión para celular;
  - lenguaje de los clientes y la única llamada a la acción;
  - capítulos con el movimiento de cámara y el frame final de cada uno;
  - los prompts de cada toma;
  - paleta, tipografías y motivos, más una capa SVG dibujada por vos;
  - los textos de cada momento y el plan de efectos.

La aprobación del storyboard es el control más barato. Un sí antes de gastar vale más que tres reintentos.

## Fase 6: Generar el hero (con controles y cuidando la plata)
1. **Antes de generar,** consultá el costo y decilo.
2. **Generá primero el frame inicial** (imagen barata):
   - en 16:9 para computadora y en una versión vertical para celular, o con el sujeto centrado para poder recortar;
   - con «no text, no logos» en el prompt.
3. **Inspeccionalo vos:**
   - logos o marcas reales que se colaron;
   - anatomía rota y composición;
   - coherencia con la marca: el color, los materiales y los detalles de la historia.

   Después mostráselo y esperá el sí.
4. **Elegí el modelo de video con números reales:** el precio de la misma toma en dos o tres modelos y los créditos que quedan. Recomendá uno.
5. **Generá el video e inspeccionalo:** sacá con ffmpeg el frame inicial, uno del medio y el final, y revisá que el final reposa.
6. **⛔ CONTROL DEL VIDEO (nunca lo saltes, en cada segmento):** la persona lo mira antes de construir alrededor. Dale tu crítica honesta y el costo de un reintento. Si un concepto falla tres veces, cambiá el concepto, no el prompt.
7. **Imágenes de apoyo** para las secciones de abajo, en el mismo mundo: misma paleta, misma luz, misma gradación. Si hay tres pasos, los tres llevan imagen.
8. **La inspección también encuentra regalos:** si el video mejora el plan, ajustá el layout para lucirlo.

## Fase 7: Procesar los recursos (sin gastar créditos)
- **Video para scroll en computadora:** recodificalo con keyframes muy seguidos para que el salto de un frame a otro sea instantáneo. Por ejemplo, `ffmpeg -i in.mp4 -c:v libx264 -g 1 -crf 23 -preset veryfast -an -movflags +faststart scrub.mp4`; ajustá el crf al peso.
- **Versión para celular:** una secuencia de frames webp chicos (por ejemplo 60 a 90 frames de 720 px) dibujada en un canvas. Es lo que se mueve fluido con el dedo en iPhone y Android.
- **Imágenes fijas:** el póster y el frame final en webp.
- Los archivos crudos y de revisión nunca van a la carpeta que se publica.

## Fase 8: Construir
**Estándar del hero con scroll:**
- Cargá el video o los frames antes de mostrarlos, detrás de un indicador de carga honesto si pesan.
- Un solo bucle `requestAnimationFrame` interpola suave hacia el tiempo que marca el scroll y se detiene cuando llega.
- Nunca superpongas saltos de tiempo, y tocá el DOM solo cuando algo cambia.
- Cada banda de texto lleva su sombra o degradé para leerse sobre cualquier frame.
- Si el video no carga, hay red lenta, ahorro de datos o «reducir movimiento», se muestra un hero fijo diseñado, lindo por sí mismo, y la página sigue completa.
- Medí el LCP: el título principal tiene que verse rápido. No escondas el título detrás de una animación lenta.

**Toda la página animada, sin abrumar:**
- líneas SVG que se dibujan con el scroll;
- partículas a nivel susurro;
- un brillo suave en el texto clave;
- una entrada distinta por momento;
- un momento interactivo a mitad del recorrido.

Todo con suavizado; nada salta.

**Textos:**
- Son un entregable diseñado: cortos, humanos, del tamaño de un movimiento de scroll y en la voz de la marca.
- Revisión obligatoria antes de mostrar. Buscá y reescribí:
  - las rayas largas;
  - el relleno corporativo: «potenciar», «sin fisuras», «empoderar», «desbloquear», «robusto», «soluciones integrales», «llevar al siguiente nivel»;
  - las fórmulas de IA: «no es solo X, es Y», «desde X hasta Y» que en realidad es una lista, «muchos expertos dicen», cierres grandilocuentes.
- Los recursos de marca elegidos a propósito se quedan.

**Formulario o llamada a la acción:** decí con honestidad adónde llega cada mensaje. En FNX va siempre a WhatsApp con un mensaje precargado según la página.

## Fase 9: Autoprueba antes de mostrar
- **Recorrido:** capturas arriba, en el medio y abajo; probá la «prueba de flick» (bajar rápido y frenar) sobre cada momento.
- **Legibilidad:** cada texto en su peor frame.
- **Funciones:** botones, consola sin errores, «reducir movimiento», la página sin el video, y anchos de 360 y 390 px.
- **Velocidad:** PageSpeed en celular, antes y después.
- **Reporte:** contá lo que encontraste y arreglaste.

Después mostrá el resultado y pedí comentarios con sus palabras, por rondas: primero la estructura, después el pulido, después el movimiento.

## Fase 10: Publicar
- **Caso FNX:** ver abajo.
- **Cliente:** donde se acuerde con el cliente (Lovable, Vercel u otro hosting), con su dominio.
- **Siempre:**
  - verificá el sitio en vivo con pedidos reales;
  - medí la velocidad;
  - que la persona lo pruebe en su propio celular, con su red.

## Fase 11: Pulido
Iterar es barato. De acá en adelante sos la desarrolladora de guardia: la persona dice qué quiere cambiar en palabras simples, vos lo cambiás, lo mostrás y lo publicás con su OK.

## Caso FNX (fnxestudio.com)
**Proyecto y publicación:**
- **Proyecto:** repo github.com/linkMKT4183/FNXestudio, rama `main` conectada a Lovable (TanStack Start, React, Tailwind v4). Leé `CLAUDE.md`, `AGENTS.md` y `docs/traspaso-claude-code.md`.
- **Publicación:** trabajá en una rama, mostrá capturas a 390 px y en computadora, y con el «publicalo» de Nadin pasá a `main` sin reescribir historia. Después publicá en Lovable.
- **Primitivas existentes:** reutilizá `Reveal`, `Headline`, `Section` y `FnxImage`. El fondo de tela vive en `public/fondos/` con `.fondo-fnx`. No rompas las animaciones de texto que ya le gustan sin preguntar.

**Identidad (guía de Miro «FNX · Guía de animaciones»):**
- **Paleta:** negro #0B0B0B, grafito #1C1C1C, crema #F3EEE4, gris #A3A3A3.
- **Un solo color por área:** Estudio #F2552C, Consultoría #4C8DFF, Salud #3CCB7F, Noticias #FFD23F.
- **Concepto «uno entre muchos»:** objetos apagados y uno solo encendido con neón del color del área.
- **Tipografías:** Anton para títulos, Montserrat para texto y Mrs Saint Delafield solo para la firma.
- **Movimiento:** loop perfecto y curva `cubic-bezier(0.16,1,0.3,1)`.
- **Prohibido:** fondos claros, emojis, avatares o personas, grillas de cuadros y motivos repetidos.
- **Ubicación:** siempre «sedes en San Juan y Mendoza y trabajo en todo el país».

**Llamada a la acción y límites:**
- La llamada a la acción es WhatsApp (2616306508) con el mensaje de cada página, vía `WhatsAppButton`.
- Salud es +18: nada de promesas de aprobación ni de consejos médicos.
- Nunca imites documentos oficiales: una credencial de ejemplo lleva el sello EJEMPLO, sin escudos y con datos inventados.
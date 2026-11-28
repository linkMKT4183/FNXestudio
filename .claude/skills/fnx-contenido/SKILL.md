---
name: "fnx-contenido"
description: "Sistema de contenido animado de FNX: carruseles animados, reels hablados, historias y motion graphics en código, con la marca y las reglas de Miro. Usala para cualquier pieza de FNX."
---

# FNX · Sistema de contenido animado

Una sola skill para todo el contenido de FNX: **carruseles animados, reels hablados, historias y motion graphics**. Todo se hace en código: páginas HTML que se pintan cuadro por cuadro con `window.seek(t)`, Chrome sin ventana (Playwright) que las fotografía, y ffmpeg que arma el MP4. Nada de editores de video.

Reúne el sistema de edición carrusel-fnx, la guía de animaciones de Miro y el método aprendido de varias skills de referencia, adaptado por completo a FNX. **Ningún rastro del autor original: todo es FNX.**

## 0 · Antes de empezar (siempre)

1. **Leé la guía de Miro** «FNX · Guía de animaciones» (https://miro.com/app/board/uXjVEOTa_N0=/). **Manda sobre todo lo que dice esta skill.** Fijate sobre todo en el bloque 06 (motivos usados y reservados) y en el bloque 08 (checklist).
2. **Leé el manual de Notion** «FNX · Sistema de edición animada (skill carrusel-fnx)» y la «FNX · Central de trabajo».
3. Si dos documentos se contradicen, **vale el más actualizado**.
4. Hablale a Nadin claro, en español con voseo, directo pero explicando el porqué para que aprenda. Vos ejecutás los comandos; nunca le pidas que los escriba ella.

## 1 · La marca (no se negocia)

**Concepto: «uno entre muchos».** Fondo negro, muchos objetos iguales apagados (negro y grafito) y **uno solo encendido** en el color del área.

| Color | Hex | Uso |
|---|---|---|
| Negro | #0B0B0B | fondo, 70 % |
| Grafito | #1C1C1C | cajas y objetos apagados |
| Crema | #F3EEE4 | textos y firma, 20 % |
| Gris | #A3A3A3 | textos secundarios |
| Estudio | #F2552C | color de área, 10 % |
| Consultoría | #4C8DFF | color de área, 10 % |
| Salud | #3CCB7F | color de área, 10 % |
| Noticias | #FFD23F | color de área, 10 % |

- **Un solo color de área por pieza.** El texto sobre color va siempre en negro.
- **Tipografías:** Anton para los titulares, en mayúsculas y con la última palabra en color. Montserrat para los textos. Mrs Saint Delafield solo para la firma.
- **Firma:** «Fnx» escrita a mano, arriba a la izquierda, en crema. Sola: sin nombre, sin símbolo, sin recuadro.
- **Orden fijo de la placa:** firma, etiqueta del área, titular, bajada, imagen, botón o fuente, +18 (solo Salud).
- **Objeto destacado:** metáfora 3D del mensaje, en vidrio o acrílico con bordes neón. **El neón va solo en ese objeto**, nunca en el fondo ni en los textos. Detalles tech: HUD, circuitos, partículas, niebla de luz, superficie con reflejo y luz de cine.
- **El fénix** se sugiere con fuego: una llama con forma de alas, nunca un dibujo literal de ave.
- **Ubicación:** siempre «sedes en San Juan y Mendoza y trabajo en todo el país».
- **Salud (@fnx.salud):** institucional, +18 en la imagen y en el texto. Se dice «sector regulado», nunca el nombre del sector.

### Nunca
- Plantas, hojas o consumo. El humo está prohibido solo si muestra consumo (área Salud); en Estudio se puede usar como recurso visual.
- Fondos claros.
- Emojis.
- Brillo en el fondo o en los textos.
- Avatares, personajes o personas generadas.
- Degradados decorativos.
- Verde con rojo (se ve navideño), ni verde, amarillo y rojo juntos (se ve rasta).
- Repetir un motivo ya usado (bloque 06 de Miro). Ya están usados o descartados: ajedrez, navegador 3D con la web de FNX, tarjeta de crecimiento TU MARCA igual, prismas de vidrio sueltos (rechazados), megáfonos (en conflicto). Reservados para reels: etiquetas de precio, sellos azules, flechas, lamparitas, lápices con uno naranja gastado.
- Cifras que parezcan resultados reales de FNX. Los ejemplos son ficticios, de crecimiento y rotulados «TU MARCA».
- Logos de terceros, salvo para nombrar su servicio. Música con derechos dentro del archivo.

## 2 · Formatos

| Pieza | Medida | Detalle |
|---|---|---|
| Carrusel / posteo | 1080 × 1350 (4:5), 30 fps | cada placa dura 4, 6 u 8 s en loop (compases de 120 BPM) |
| Historia | 1080 × 1920 (9:16) nativa | el diseño baja 285 px y el fondo cubre todo. Firma y etiqueta arriba (y ≈ 240-280), pie abajo (y ≈ 1630). Nunca bandas ni línea de corte |
| Reel | 1080 × 1920 (9:16) | unos 55 s si se arma con placas; el largo de la toma si es hablado |

- **Márgenes:** 72 px. Libres las esquinas de arriba a la derecha (contador 1/9) y de abajo a la derecha (botón de sonido).
- **Zona segura del reel:** nada importante en los 220 px de arriba, los 380 px de abajo ni los 140 px de la derecha.
- **Cuentas:** @fnx.estudio (IG, FB, TikTok y Threads; 3 por semana como mínimo) · FNX Consultoría · @fnx.salud (solo IG) · FNX Noticias. Cada una publica solo su área.

## 3 · Reglas de movimiento (todas las piezas)

1. **Loop perfecto.** El primer y el último cuadro son iguales. El cuadro 0 es un diseño terminado (es el PNG) y el último vuelve al reposo.
2. **Nada aparece de golpe.** Todo entra escalonado (0,05–0,3 s), con desenfoque de movimiento y un rebote suave. Curva base: cubic-bezier(.16,1,.3,1). Entradas rápidas que frenan suave; salidas al revés.
3. **La cámara nunca está quieta.** Zoom lento constante (1,00 → 1,08) u órbita. En los loops, la cámara vuelve exactamente al punto de partida.
4. **Desenfoques suaves**, tipo gaussiano. Nunca cuadriculados.
5. **Un gesto distinto por placa** y una sola idea por pantalla. Pocos elementos, mucho aire.
6. **Nada se cruza ni tapa lo importante** (caras, textos, botones).
7. **Jerarquía:** etiqueta chica → titular grande → palabra clave en el color del área.
8. **Coherencia en la serie:** mismo formato, misma curva por tipo de elemento, mismo fondo y misma paleta.
9. **Si se habla de algo animado, se muestra animado** (tarjetas con video, nunca capturas fijas).
10. **Texto dibujado por el código**, nunca una imagen de texto. Sin faltas, con tildes y voseo revisados.

**Motor (cómo se programa):** cada escena se pinta en un tiempo exacto `t`, así el render es exacto y repetible. Nada de animaciones CSS sueltas ni `requestAnimationFrame` sin control. Los colores se leen de tokens CSS (`var(--area)`, `var(--crema)`…); nunca se escriben fijos en la escena.

**Herramientas (elegí según la pieza):**

| Herramienta | Qué es | Cuándo usarla |
|---|---|---|
| **HyperFrames** (`npx hyperframes`) | escenas en HTML con atributos `data-start`, `data-duration` y `data-track-index`, más una línea de tiempo GSAP registrada en `window.__timelines["main"]`. Render determinista con Chrome sin ventana y FFmpeg | **opción por defecto** para placas de carrusel, historias, reels con placas y motion graphics. Comandos: `init`, `lint`, `check`, `snapshot`, `render`, `beats`, `audio`, `normalize-audio` |
| **GSAP** | la librería de animación: líneas de tiempo, curvas (`power`, `expo`, `sine`, `back`), escalonados (`stagger`) | todas las animaciones dentro de HyperFrames. Usar `gsap.timeline({paused:true})`: el motor la recorre cuadro por cuadro. Cargar el archivo local, no desde una CDN |
| **Remotion** (`npx remotion`) | videos hechos con componentes de React | piezas muy basadas en datos o plantillas que se repiten con contenido variable (por ejemplo, la misma placa con 20 textos distintos). Licencia gratuita para FNX mientras sea una empresa de hasta 3 personas; si crece, revisar la licencia de empresa |
| **three.js** | 3D real | el objeto destacado en vidrio o acrílico con neón, con luces de estudio, sombras y profundidad de campo. Se integra en HyperFrames |
| **FFmpeg** | armado, cortes, volumen | reels hablados, mezcla de sonido, hojas de revisión, conversiones (H.264, `-preset veryfast` salvo que se pida máxima calidad) |

**Medida en HyperFrames:** para 1080 × 1350 se fija el tamaño en el `<html>`/`<body>` y en `data-width`/`data-height` de la composición raíz. **Loop:** la línea de tiempo termina exactamente en el estado del cuadro 0 (la cámara vuelve a escala 1 y cada objeto a su lugar).

## 4 · Carrusel animado

**Estructura (de 5 a 9 placas):** portada → promesa → pasos o señales → giro → llamada a la acción.

1. **Carpeta:** un carrusel por carpeta; no se toca nada fuera de ella.
2. **BRIEF** → mostrar y **esperar el OK**. Incluye:
   - objetivo y etapa (descubrir, informar o decidir);
   - área y su color;
   - la frase única;
   - el objeto metáfora (revisar que sea nuevo en el bloque 06);
   - el mapa de placas;
   - el copy de cada placa y la leyenda.
3. **STORYBOARD** → mostrar y **esperar el OK**. Una línea por tiempo: qué entra, con qué curva y duración, la cámara y qué efecto suena.
4. **Diseño en código.**
5. **Versión fija:** hoja de PNG → revisar que se lea bien en el celular → aplicar la rúbrica.
6. **Versión animada:** comprobar que el cuadro 0 sea igual al PNG, que el loop sea perfecto y que el sonido no salte.
7. **Portada rápida:** la placa 1 arranca con 0,8 s quieta (el diseño terminado), para que Instagram la tome como portada.
8. **Historias** (si se piden): la misma serie en 9:16 nativo.
9. **Entrega** (ver punto 9).

**Llamada a la acción según la etapa:** Descubrir → «Seguinos». Informar → «Leé más en la web». Decidir → «Escribí PALABRA» al WhatsApp 261 630-6508, con un entregable de 2 o 3 partes. Nunca «seguinos para más» como gancho vacío.

## 5 · Reel hablado (Nadin a cámara)

1. **Preparar la toma:** pasar a vertical 1080 × 1920. Si viene horizontal, mirar un cuadro y rotar o recortar.
2. **Transcribir** con Whisper (faster-whisper), cargando el vocabulario de FNX: FNX, Fénix, fnxestudio.com, nombres propios.
3. **Cortar:**
   - quitar silencios y falsos inicios; si una frase se repite, **se queda el último intento**;
   - dejar unos 0,1 s de respiración en cada borde y cortar en silencios reales, nunca a mitad de palabra;
   - volver a transcribir el corte para comprobar los empalmes;
   - mostrarle el texto final y preguntar si falta o sobra algo.
4. **Plan de gráficos (sin construir)**, presentado como tabla: segundo · lo que dice · pieza · texto. Una idea por pieza, que entra en la palabra que la nombra. En los 2 primeros segundos solo el gancho; el CTA en los últimos 5 s. **Esperar el OK.**
5. **Subtítulos:**
   - trozos de 1 a 4 palabras en crema, de unos 70 px;
   - **una palabra clave por frase**, sola en su línea, en mayúsculas, más grande (unos 124 px) y en el color del área;
   - cada trozo entra subiendo, de borroso a nítido, en 0,3 s;
   - las claves se muestran antes y se espera el OK;
   - los subtítulos no van en los tramos donde hay una pieza a pantalla completa.
6. **Montar:**
   - zoom suave constante (100 → 108 % por plano, alternando acercar y alejar, anclado a la cara);
   - subtítulos y piezas encima;
   - voz limpia a **−14 LUFS**;
   - música muy por debajo de la voz.
7. **La cara es sagrada:** nada la corta ni la tapa. Si un gráfico tiene que tapar, que tape la pantalla entera.

**Piezas de motion graphics para reels** (con la identidad de FNX):
- titular de gancho (2 a 4 palabras gigantes);
- lista de **máximo 3 puntos** debajo de la barbilla;
- contador de cifras (ficticias y rotuladas TU MARCA);
- rótulo «Nadin Reus · Directora de FNX»;
- CTA final: «Comentá PALABRA», «Seguí a @fnx.estudio» o «Escribinos por WhatsApp».

**Reel armado con placas:** las placas en formato historia, una detrás de otra. La placa 1 entera y las demás desde 0,35 s. Transición: barrido tonal + microglitch + golpe grave, nunca ruido. Alta calidad (CRF 11).

## 6 · Sonido

- **Carrusel:** synthwave tecnológico a 120 BPM que sigue de placa en placa como una sola canción.
- **Reel con placas:** EDM melódico original a 126 BPM, sin voces. El giro va sin bombo y el cierre es el drop.
- **Derechos:** un tema con derechos nunca va dentro del archivo. Se usa música original generada, o la versión solo efectos y el tema se suma desde la biblioteca de Instagram.
- **Efectos por elemento:**

| Elemento | Efecto |
|---|---|
| arranque, titular del giro, remate | boom grave |
| ventana, tarjeta o ítem que aparece | pop de burbuja |
| texto que se escribe | teclado mecánico (una tecla por letra) |
| «así no» / «así sí» | buzzer / ding |
| tarjetas del cierre | notificación |
| giro | scratch + boom |
| cambio de placa | barrido tonal + microglitch + sub |

- **Mezcla:** música × 0,8 + efectos × 1,15, −14 LUFS, pico −1,5 dB. Versión solo efectos a −18 LUFS.

## 7 · Copy

- Voseo, frases cortas, sin emojis. Hablar del problema del cliente, no de FNX.
- Gancho en la primera línea o en los primeros 2 segundos.
- Leyenda corta, que retenga sin cansar y lleve a la web: redes → web → WhatsApp.
- La primera charla de 15 minutos corre por cuenta de FNX (usar cuando sume).

## 8 · Revisión antes de decir «listo»

Rúbrica: cada punto tiene que llegar a 8/10. Si no llega, se corrige y se repite. Además, el checklist de Miro (bloque 08):
1. ¿El loop es perfecto? Mirarlo 3 veces seguidas: no se tiene que notar el corte.
2. ¿Tiene la medida correcta? 4:5 para carrusel y posteo, 9:16 para reel e historia.
3. ¿Hay un solo color de área y un único objeto destacado?
4. ¿El motivo es nuevo (no figura en el bloque 06)?
5. ¿Respeta la lista Nunca, punto por punto?
6. ¿La firma está arriba a la izquierda y el titular y la bajada se leen bien?

En los reels, además:
- hoja de fotogramas: cara libre, textos legibles, nada debajo de los botones de la app;
- ningún cuadro negro (`blackdetect`);
- que no falte ninguna frase;
- volumen a −14 LUFS.

Después de entregar, **anotar el motivo usado en el bloque 06 de Miro**.

## 9 · Entrega

- **Solo el video, sin textos encima** (actualizado el 25/11). Un MP4 por placa, numerado en el orden de subida.
- Se guarda en el Drive de FNX (cuenta fnxestudio22@gmail.com), en la carpeta de la pieza, y en el acervo. El conector de Drive sube archivos de hasta unos 3 MB; los videos más grandes se entregan para descargar y Nadin los arrastra.
- Se guarda el HTML de cada escena: es la plantilla de la próxima.
- Publicar o programar en Instagram (por Metricool o Composio) **solo con el OK de Nadin** en cada pieza: imagen, texto, fecha y hora.

## 10 · Equipo

Primero se revisa y después se instala, **siempre con permiso y de a uno**. Se necesita: FFmpeg, Node.js 22 o más nuevo, Python 3.11+, Git, Chrome, Playwright, HyperFrames, GSAP, Remotion (con React) y faster-whisper o whisper-cpp (estos últimos solo para reels hablados). `npx hyperframes doctor` revisa el equipo. Nunca se instala lo que ya está. Nunca se escriben contraseñas por la persona. Para Instagram alcanza con 1080p; el 4K solo se usa si hay una GPU que lo aguante.

## 11 · Cómo trabaja Nadin

- Textos cortos y simples. Si algo no se ve, reenviarlo en texto plano.
- «ok hazlo» o «finaliza» = hacerlo completo, sin más preguntas.
- Siempre los archivos finales para descargar (en zip si son varios). Si dice que «el resto está bien», no se toca el resto.
- Primero se aprende de las referencias que manda y después se diseña.
- Objetivo de fondo: más consultas por WhatsApp, mejor imagen y constancia (3 posteos por semana como mínimo).
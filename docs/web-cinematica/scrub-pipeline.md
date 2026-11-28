> **Adaptación FNX.** Referencia de la skill `fnx-web-cinematica`. En fnxestudio.com valen además `CLAUDE.md`, `AGENTS.md` y `docs/traspaso-claude-code.md`; si algo de acá choca con esas reglas, ganan ellas.

# El pipeline del scrub y el estándar de ingeniería

Este es el estándar probado para el hero recorrido con el scroll y el piso de calidad que lo rodea. Úsalo completo, siempre. Cada regla o creó el pulido o evitó un error que realmente se publicó y se detectó.

## Adaptación FNX: el celular también se mueve

En FNX casi todo el público entra desde el celular, así que en el caso FNX el hero fijo NO es el valor por defecto para teléfonos. Las condiciones de abajo se reparten así:

- **Movimiento reducido** (`prefers-reduced-motion: reduce`): hero fijo diseñado, sin descargar nada. Igual que el original.
- **Teléfonos y tablets** (las otras cuatro condiciones): en lugar del video, una **secuencia de frames** dibujada en un `<canvas>`. El dedo mueve los frames con la misma interpolación rAF y el mismo patrón de bandas; solo cambia qué se dibuja.
  - Sacá entre 60 y 90 frames del video aprobado, en vertical o recortados a 9:16, a unos 720 px de ancho, en webp: `ffmpeg -i raw.mp4 -vf "fps=15,scale=720:-2" -c:v libwebp -q:v 70 assets/frames/f%03d.webp`. Apuntá a menos de 3 MB en total.
  - Precargá los frames detrás del mismo anillo de progreso honesto; mientras tanto se ve el póster.
  - En cada tick: `const i = Math.round(shown * (frames.length - 1)); if (i !== lastI) { ctx.drawImage(frames[i], …); lastI = i; }`. Dibujá solo cuando cambia el índice.
  - Si los frames no llegan en 20 segundos, o la conexión pide ahorrar datos (`navigator.connection?.saveData`), queda el hero fijo diseñado.
- Verificá en un teléfono real y medí con PageSpeed en celular antes y después.

**El título del hero tiene que verse rápido.** En fnxestudio.com el LCP del inicio dependía del título animado. La banda uno abre asentada (ver la coreografía) y su primera aparición no puede tardar.

**La paleta de FNX es una excepción declarada.** Esta guía prohíbe por defecto el look "casi negro con un acento cálido". En FNX es el mundo propio de la marca (negro #0B0B0B con un solo color por área: naranja, azul, verde o amarillo), así que vale la excepción que la misma guía describe: tonos tomados del metraje, un elemento distintivo propio y nada de layout de plantilla.

## La estructura del hero

Un hero alto y fijado que contiene un escenario sticky a pantalla completa. El progreso del scroll a través de la región fijada va de 0 a 1, y ese progreso maneja el tiempo del video. La página se asienta exactamente cuando el video llega a su final compuesto en reposo, y ahí empieza el sitio web real.

**Dimensiona el hero en distancia de scroll (vh), no en segundos.** Una toma única de 6 segundos de Nivel 1 quiere unos 400vh de hero. Un recorrido encadenado de 18 segundos necesita unos 1000vh, para que cada momento tenga espacio. Quedarse corto con un recorrido largo hace que cada texto pase como un destello por bien ajustadas que estén las bandas; los números de ritmo están en la sección de bandas de texto más abajo.

## Descarga el video como Blob (la regla del Range)

Muchos hosts no tienen, sin avisar, soporte de descarga parcial (HTTP Range). Sin él, cada salto se queda en cero y el scrub no hace nada en el sitio en vivo aunque funcione perfecto en local. Descarga el archivo completo como Blob (el video completo guardado en memoria) y reproduce la URL del objeto; funciona en todos lados.

Para un clip chico (menos de unos 8 MB) la forma simple está bien:

```js
const res = await fetch('assets/hero-scrub.mp4');
const blob = await res.blob();
video.src = URL.createObjectURL(blob);
```

Pon el póster con JavaScript al mismo tiempo, dentro del mismo camino de código que decide si cargar el video. Así los teléfonos y los visitantes con movimiento reducido, que reciben el hero fijo, nunca descargan ninguno de los dos archivos.

### El Blob en streaming con un anillo de carga (cualquier video de más de unos 8 MB)

Un `await fetch().blob()` a secas sobre un video encadenado pesado congela en silencio la primera impresión de la página: no pasa nada visible hasta que llega el archivo completo. Por encima de unos 8 MB, descárgalo en streaming. La página es completamente usable al instante, el póster aparece primero, un anillo de progreso honesto se llena mientras llega el Blob, y la página está completa si el video nunca llega.

El elemento video se entrega con `preload="none"` y sin `src`. El anillo es un círculo SVG de radio 20 (circunferencia de unos 126), manejado por una sola variable CSS:

```html
<video id="hero" preload="none" muted playsinline aria-hidden="true" tabindex="-1"></video>
<svg class="ring" viewBox="0 0 48 48" aria-hidden="true">
  <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="3"
          stroke-dasharray="126" style="stroke-dashoffset:var(--ld,126)"/>
</svg>
```

```js
const VIDEO_URL = 'assets/hero-scrub.mp4';
const VIDEO_BYTES = 14476000;   // hardcode the real byte size: the fallback when Content-Length is missing
const ring = document.querySelector('.ring');
const posterLayer = document.querySelector('.poster');

// 1. The poster wins the bandwidth race by design: paint it first,
//    and start the blob fetch only once the poster is in (or has failed).
posterLayer.style.backgroundImage = "url('assets/hero-poster.jpg')";
let started = false;
function startBlobFetch() {
  if (started) return;
  started = true;
  loadHeroBlob().catch(failVideo);
}
const posterImg = new Image();
posterImg.onload = startBlobFetch;
posterImg.onerror = startBlobFetch;
posterImg.src = 'assets/hero-poster.jpg';
setTimeout(startBlobFetch, 4000);   // safety: a hung poster never blocks the video forever

async function loadHeroBlob() {
  const ctrl = new AbortController();
  let watchdog = setTimeout(() => ctrl.abort(), 20000);
  // priority:'low' makes the blob yield to critical resources
  const res = await fetch(VIDEO_URL, { priority: 'low', signal: ctrl.signal });
  const total = Number(res.headers.get('Content-Length')) || VIDEO_BYTES;
  const reader = res.body.getReader();
  const chunks = [];
  let got = 0, lastRing = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    clearTimeout(watchdog);                        // re-arm on every chunk:
    watchdog = setTimeout(() => ctrl.abort(), 20000);   // 20s with no progress aborts the stream
    chunks.push(value);
    got += value.length;
    const frac = Math.min(1, got / total);
    const now = performance.now();
    if (now - lastRing > 100 || frac === 1) {      // throttled to 100ms, but the terminal
      lastRing = now;                              // write always lands so the ring completes
      ring.style.setProperty('--ld', Math.round(126 * (1 - frac)));
    }
  }
  clearTimeout(watchdog);
  ring.style.setProperty('--ld', 0);
  video.src = URL.createObjectURL(new Blob(chunks));
  video.load();
  video.addEventListener('canplay', () => {
    requestSeek(heroProgress() * video.duration);  // land on the current scroll position
    stage.classList.add('video-ready');            // CSS fades the video in over the poster
  }, { once: true });
}

function failVideo() {
  ring.replaceWith(makeScrollChevron());  // an honest scroll cue, never a stuck ring
  stage.classList.add('video-failed');    // still-image fallbacks carry the full journey
}
```

El watchdog importa: sin él, un stream colgado congela el anillo para siempre, lo que es peor que no tener anillo. Con él, una pausa de 20 segundos aborta hacia el respaldo de imagen fija y el sitio simplemente funciona como un sitio fijo.

El intercambio que compra este patrón: incluso un recorrido encadenado que pesa una docena de MB llega en silencio detrás del anillo durante algunos segundos, mientras la página en sí es usable casi al instante.

## Interpola el tiempo mostrado (un bucle rAF que descansa)

Nunca escribas la posición del scroll directo en `currentTime`; acércate a ella suavemente. El bucle debe quedar inactivo cuando converge y cuando el hero está fuera de pantalla. Los bucles que corren libres desde que carga la página gastan batería y delatan una construcción amateur.

```js
let target = 0;      // 0..1, set by the scroll handler
let shown = 0;       // what we are displaying
let rafId = null;
let lastTick = 0;

function tick(now) {
  const dt = Math.min(100, now - (lastTick || now));   // ms since last frame, capped
  lastTick = now;
  const k = 0.16;    // smoothing per 60fps frame; a starting point, tune by feel while scrubbing
  shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667));
  if (Math.abs(target - shown) < 0.0005) {
    shown = target;
    rafId = null;
    lastTick = 0;                     // converged: rest
  } else {
    rafId = requestAnimationFrame(tick);
  }
  requestSeek(shown * video.duration);
  updateCaptions(shown);
}

function onScroll() {
  target = heroProgress();            // 0..1 through the pinned hero
  if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
}
```

La línea con `Math.pow` es lo que hace que la sensación sea independiente del frame rate: el exponente normaliza el suavizado a una referencia de 60fps, así que cada tasa de refresco converge a la misma velocidad. Una constante simple por frame (`shown += (target - shown) * 0.18`) converge el doble de rápido en una pantalla de 120Hz que en una de 60Hz, y el sitio se siente distinto en cada máquina.

Sigue `heroOnScreen` con un IntersectionObserver para que el bucle nunca corra mientras el hero quedó atrás en el scroll.

## Controla los saltos (el patrón a prueba de bloqueos)

Nunca escribas `currentTime` mientras un salto anterior todavía está en curso. Los saltos sin control se acumulan, y esa es la diferencia entre fluido y a los tirones en Chrome. Agrupa hacia el objetivo más nuevo, emite exactamente un salto de seguimiento cuando termine el salto, y resetea la bandera de ocupado ante un error para que el control nunca pueda bloquearse:

```js
let seekBusy = false;
let pendingTime = null;

function requestSeek(t) {
  if (!video.duration) return;
  if (seekBusy) { pendingTime = t; return; }   // coalesce: keep only newest
  seekBusy = true;
  video.currentTime = t;
}

video.addEventListener('seeked', () => {
  seekBusy = false;
  if (pendingTime !== null) {
    const t = pendingTime;
    pendingTime = null;
    requestSeek(t);                            // exactly one follow-up
  }
});

video.addEventListener('error', () => {        // the deadlock escape
  seekBusy = false;
  pendingTime = null;
});
```

Bajo estrés este patrón produce una finalización por salto y cero superposiciones. Si el scrub todavía se siente áspero con el control puesto, el intervalo de keyframes del video es demasiado largo: recodifica con `-g 8` (ver `ffmpeg-recipes.md`).

## Escribe en el DOM solo cuando algo cambia

Las escrituras al DOM en cada frame son la otra mitad de los tirones. Controla todo por diferencias:

- Textos, scrims y clases de estado: calcula el estado deseado, compáralo con un valor guardado, y toca el DOM solo cuando difiere. Nunca alternes una clase en cada frame.
- Cualquier texto que se actualice con el scroll (contadores, lecturas de profundidad, etiquetas de progreso): limita a unos 10Hz Y escribe solo cuando el texto realmente cambió.

```js
let lastLabel = '';
let lastLabelAt = 0;

function updateLabel(text, now) {
  if (now - lastLabelAt < 100) return;   // ~10Hz
  if (text === lastLabel) return;        // only on change
  lastLabel = text;
  lastLabelAt = now;
  labelEl.textContent = text;
}
```

Promueve el video a su propia capa de composición (`will-change: transform` o `transform: translateZ(0)` en el elemento video) para que sus repintados nunca arrastren al resto de la página.

## El patrón de bandas de texto (dosificado en distancia de scroll)

Cada texto es dueño de una banda de progreso de scroll, por ejemplo `[0.12, 0.30]`. Los textos viven en el espacio negativo del metraje, planeado desde la fase de concepto, y el carril de la acción queda libre. Nada salta.

Dosifica cada banda en vh (alturas de viewport de scroll), nunca en segundos, porque un sitio con scroll se lee a flicks. El estándar:

- **Cada momento tiene una meseta de visibilidad completa de aproximadamente 80 a 130vh**, con rampas suavizadas de unos 20vh en cada borde. Puntos de partida, validados con la prueba de flick de abajo. La meseta es la mayor parte de la banda; las rampas son el borde.
- **Calcula las rampas en unidades de progreso.** Para una banda `[a, b]`: `const f = Math.min(0.02, (b - a) / 3)`. En un rango de scroll de 900vh (rango de scroll = altura del hero menos los 100vh del viewport), 0.02 de progreso son 18vh.
- **La opacidad** usa smoothstep en ambos bordes:

```js
const smoothstep = (p, e0, e1) => {
  const t = Math.min(1, Math.max(0, (p - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
const f = Math.min(0.02, (b - a) / 3);
const opacity = smoothstep(p, a, a + f) * (1 - smoothstep(p, b - f, b));
```

La primera banda se salta la rampa de entrada y la última se salta la de salida, para que el recorrido empiece y termine con el texto ya asentado.

- **El progreso de armado del texto** (la variable `--k` sobre la que corre la sección de coreografía de abajo) se asienta a unos 20vh dentro de la banda, dejando la meseta larga completamente asentada:

```js
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const k = clamp((p - a) / (ramp || Math.min(0.025, (b - a) * 0.35)), 0, 1);
```

`ramp` es el ajuste opcional `data-ramp` de la banda, descrito en la sección de coreografía. Aplica todo con escrituras controladas por diferencias, como cualquier otro toque al DOM manejado por el scroll.

**La prueba de flick (cómo se valida un mapa de momentos):** simula pasos de rueda de 120px (un flick normal), 240px y 360px (un doble flick agresivo). Cada momento tiene que seguir legible durante 5 a 6 flicks normales, y ningún momento puede poder saltearse ni siquiera con pasos de 360px. Arrastrar lento no prueba nada; los visitantes reales hacen flicks. Si un texto falla la prueba, júntalo con uno vecino. Nunca achiques las rampas para meter a la fuerza un momento que falla.

El arnés es un pequeño bucle que se corre en la página con la herramienta de navegador (o pegado en la consola), un tamaño de paso por corrida:

```js
// flick(120, 12), then flick(240, 8), then flick(360, 6). Start from the top each run.
async function flick(step, count) {
  for (let i = 0; i < count; i++) {
    window.scrollBy(0, step);
    await new Promise(r => setTimeout(r, 400));   // a beat between flicks, like a real reader
    const bands = [...document.querySelectorAll('.band')]
      .map((b, n) => n + ':' + getComputedStyle(b).opacity);
    console.log('y=' + Math.round(scrollY), bands.join('  '));
  }
}
```

Lee las opacidades registradas entre pasos. Una banda que nunca llega a opacidad completa en ningún punto de la corrida de 360px es un momento que se puede saltear. Una banda que mantiene opacidad completa durante menos de 5 pasos consecutivos de 120px es demasiado corta para leerse.

## El sistema de legibilidad (texto sobre metraje en vivo)

Ley 10 en `prompt-laws.md`: un video en vivo detrás de la tipografía es un fondo en movimiento que no controlas frame a frame. Cada banda de texto del hero lleva las cuatro capas de abajo, y luego pasa la auditoría.

**1. El scrim base global.** Un oscurecimiento radial suave (un scrim es una capa oscura translúcida) sobre todo el video, siempre activo, para que ningún frame quede nunca crudo detrás de la página:

```css
.scrim{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 120% 90% at 50% 45%,rgba(10,10,18,0) 35%,rgba(10,10,18,.62) 100%)}
```

**2. El scrim por banda.** El `::before` de cada banda lleva un scrim radial que sigue la opacidad manejada por JS de la banda y se intensifica con la variable de progreso `--k` de la banda, así que el metraje se atenúa exactamente mientras está el texto de esa banda y en ningún otro momento. Atenuar, nunca aplanar: el degradado se apaga al 76 por ciento para que las esquinas sigan vivas. La forma que funciona:

```css
.band::before{content:"";position:absolute;inset:-4%;pointer-events:none;opacity:calc(.25 + .75*var(--k,1));background:radial-gradient(ellipse 74% 62% at 50% 50%,rgba(5,5,10,.66) 0%,rgba(5,5,10,.44) 46%,rgba(5,5,10,0) 76%)}
```

Ajusta el alfa máximo por banda contra los frames reales de esa banda. El rango probado: 0.62 para momentos tranquilos hasta 0.72 para el gancho. Estos alfas máximos son también las constantes a mover cuando el usuario pide que el metraje se vea más brillante.

**La variante de dos lados para composiciones con la acción centrada.** El radial centrado único de arriba asume que el sujeto está descentrado con el texto flanqueándolo. Cuando el sujeto está centrado y hay columnas de texto a AMBOS lados (un pedido natural), nunca estires un solo scrim a lo largo del medio. Usa dos: un pseudo-elemento anclado en la columna izquierda y otro en la derecha, cada uno una elipse centrada en su propia columna, con el carril central completamente libre para que el sujeto siga brillante. La banda de asentamiento, donde las columnas convergen, lleva en cambio una única elipse centrada arriba. Esta variante no es un compromiso: una construcción real midió un contraste de 7.17 a 1 en el peor píxel con ella.

**3. El token de sombra de texto.** Tres capas (un borde ajustado, un brillo medio, una caída amplia), aplicadas a cada banda del hero y apagadas en los botones, donde una etiqueta con sombra se lee como suciedad:

```css
:root{--tshadow:0 1px 2px rgba(5,5,10,.95),0 3px 12px rgba(5,5,10,.78),0 10px 44px rgba(5,5,10,.8)}
.band{text-shadow:var(--tshadow)}
.band .btn{text-shadow:none}
```

**4. El scrim de chip para texto chico.** Las líneas de HUD, lecturas y etiquetas chicas sobre el metraje no llevan el radial grande. Llevan un chip, una pequeña píldora de fondo desenfocada:

```css
.chip{background:rgba(8,8,15,.55);border:1px solid rgba(96,96,126,.3);border-radius:10px;backdrop-filter:blur(10px);text-shadow:0 1px 3px rgba(5,5,10,.85)}
```

**La auditoría del peor frame (lo que hace honesto al sistema).** Extrae los frames de cada banda, muestrea en canvas los píxeles bajo la zona del texto CON el scrim aplicado, y exige un contraste en el peor píxel de al menos 3.5:1 para cada banda. Las bandas bien ajustadas quedan muy por encima de ese piso. Ajusta los alfas del scrim contra el peor frame, nunca contra el promedio. El frame promedio miente; el peor frame es el que un visitante va a estar leyendo a mitad de camino.

**El método preferido, cuando existe un navegador controlable** (el camino de Chrome headless en `troubleshooting.md`): inyecta `visibility: hidden` en los spans de texto divididos, haz una captura de la página real compuesta en esa posición del scroll, y encuentra el píxel más claro dentro de la caja del texto. Esto mide cada capa de scrim y la caída radial exactamente como las ve el visitante, y es conservador, porque ocultar los glifos también quita su sombra de texto. El procedimiento de frames más cálculo de abajo es el respaldo cuando no se puede manejar ningún navegador.

El procedimiento, concretamente:

1. Convierte el rango de cada banda a tiempo de video (`time = progress * duration`) y extrae tres o cuatro frames a lo largo de él con ffmpeg: `ffmpeg -ss <t> -i assets/hero-scrub.mp4 -frames:v 1 review/band2-a.png`.
2. Para cada frame, compón el scrim de la banda en su alfa máximo sobre la zona del texto y encuentra el peor píxel. Para texto claro es el píxel más claro que queda. Este fragmento hace todo el paso:

```js
// auditFrame('audit/band2-a.png', {x:420,y:300,w:600,h:200}, 0.66, [244,242,236])
// zone is the text's pixel box in the frame, alpha is the band scrim's peak, textColor is RGB
async function auditFrame(src, zone, scrimAlpha, textColor) {
  const img = await createImageBitmap(await (await fetch(src)).blob());
  const c = new OffscreenCanvas(img.width, img.height).getContext('2d');
  c.drawImage(img, 0, 0);
  const d = c.getImageData(zone.x, zone.y, zone.w, zone.h).data;
  const lum = ([r, g, b]) => {
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const scrim = [5, 5, 10];                      // the scrim's base color
  let worst = 0;
  for (let i = 0; i < d.length; i += 4) {
    const px = [0, 1, 2].map(j => d[i + j] * (1 - scrimAlpha) + scrim[j] * scrimAlpha);
    worst = Math.max(worst, lum(px));            // lightest pixel, the worst case for light text
  }
  const lt = lum(textColor);
  const hi = Math.max(lt, worst), lo = Math.min(lt, worst);
  return (hi + 0.05) / (lo + 0.05);              // must be at least 3.5
}
```

Córrelo con la herramienta de navegador sobre la página en vista previa. Si la descarga desde `review/` está bloqueada, copia los frames a `assets/audit/` para la auditoría y borra esa carpeta antes de publicar nada.

3. El ratio devuelto de cada banda tiene que ser de al menos 3.5:1. Una banda que falla recibe un alfa máximo más profundo en su scrim, y luego se vuelve a auditar contra el mismo peor frame.

## Coreografía del texto (una personalidad de entrada por momento)

**El principio del eco:** cada momento del hero tiene su propia entrada, y la entrada hace eco de lo que está haciendo el metraje en ese momento. Las palabras bajan flotando mientras algo cae. Una palabra entra de golpe cuando cae un impacto. Los caracteres se dispersan y se arman mientras se junta la tinta. Entrada y metraje se leen como un solo evento, que es lo que hace que la página se sienta dirigida en lugar de decorada.

La ingeniería es la parte fija, para cada entrada, incluidas las que inventes: todos los efectos son solo `transform` y `opacity`, recorridos con el scroll a partir de la propiedad personalizada `--k` de la banda (progreso de armado de 0 a 1, escrito por el bucle de control y controlado por diferencias en 0.008 para que las bandas convergidas no cuesten nada), y totalmente reversibles (haz scroll hacia arriba y se desarman; la rampa de carga única de la banda uno es la única excepción diseñada).

**La primera banda abre asentada, caracteres incluidos.** El patrón de bandas de arriba ya se salta la rampa de opacidad de entrada de la banda uno, pero eso solo no alcanza: con el scroll en cero el `--k` de la banda sigue en 0, así que sus caracteres quedan sin armar y el hero abre con metraje sin palabras hasta que el usuario hace scroll. Dale a la banda uno una rampa de armado única basada en tiempo al cargar, que luego pasa el control al scroll: maneja su entrada con `k = max(scrollK, loadK)`, donde `loadK` va suavemente de 0 a 1 durante los primeros momentos después de que aparece la página. Cuando `loadK` llega a 1, el max mantiene armada la banda uno, que es lo correcto para el momento de apertura: no hay nada arriba a lo que volver con el scroll. Cada banda posterior sigue siendo puramente manejada por el scroll y reversible.

**La división, hecha una vez al cargar.** Divide el texto del titular en spans de palabras y caracteres con JS usando un generador pseudoaleatorio con semilla, para que los desplazamientos "aleatorios" sean idénticos en cada carga:

```js
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}
```

Envuelve un span visualmente oculto con la frase completa para los lectores de pantalla, más una copia visual con `aria-hidden="true"` construida con spans de palabra `.w` que contienen spans de carácter `.c`. Asigna a cada span sus propiedades personalizadas (`--th`, `--jx`, `--jy`, `--jr`) desde el generador con semilla al momento de dividir.

**El menú (ejemplos trabajados, cada uno nombrado con el momento del metraje del que hace eco):**

**(a) Dispersión.** Entrada volando por carácter desde desplazamientos aleatorios con semilla; hace eco de tinta que se junta, partículas que se arman, escombros que se asientan. Cada `.c` recibe `--th` (un umbral aleatorio, de 0 a 0.55) y valores de variación `--jx`/`--jy`/`--jr`:

```css
.c{--kc:clamp(0,(var(--k,0) - var(--th,0))*2.6,1);opacity:var(--kc);
   transform:translate(calc((1 - var(--kc))*var(--jx,0px)),calc((1 - var(--kc))*var(--jy,0px)))
             rotate(calc((1 - var(--kc))*var(--jr,0deg)))}
```

**(b) Alineación en grilla.** Los caracteres se deslizan horizontalmente a su lugar en orden de lectura. El mismo CSS que la dispersión con variación solo horizontal, pero el umbral es ordenado en vez de aleatorio: `--th: charIndex / total * spread + rng() * 0.06`, así que el valor de spread controla cuánto dura el escalonado.

**(c) De desenfocado a nítido.** La entrada para el momento tranquilo; hace eco de niebla que se disipa o de foco que llega. Dos copias apiladas del texto que se funden solo por opacidad. La copia blanda lleva un `filter: blur(10px)` ESTÁTICO; nunca animes `filter` en sí, no es amigable con el compositor. La copia nítida aparece con `--k`, la blanda desaparece.

**(d) Golpe de palabra con sobrepaso.** Hace eco de un impacto que cae. Pop a nivel palabra (`--kc`) y un asentamiento más lento (`--ks`); la palabra escala más allá de 1 y vuelve suavemente:

```css
.w{--kc:clamp(0,(var(--k,0) - var(--th,0))*3,1);
   --ks:clamp(0,(var(--k,0) - var(--th,0) - var(--sd,.1))*var(--ss,3.2),1);
   opacity:var(--kc);
   transform:scale(calc(0.6 + (0.4 + var(--ov,.12))*var(--kc) - var(--ov,.12)*var(--ks)))}
.w.em{--ov:0.24;--sd:0.16;--ss:2.6}
```

Las palabras enfatizadas (`.em`) reciben el sobrepaso más grande con el asentamiento más tardío y lento, así que quedan suspendidas en el sobrepaso un instante más.

**(e) Subida palabra por palabra hacia un asentamiento escalonado.** La entrada de final probada, que coincide con la llegada del metraje al reposo. Las palabras del titular suben en orden de lectura (`--th` por palabra), luego el subtítulo aparece con `--ks: clamp(0, (var(--k) - 0.66) * 4, 1)`, luego la fila del CTA con `--kb: clamp(0, (var(--k) - 0.78) * 5, 1)`. Tres llegadas, una banda.

**(f) Caída flotando.** Hace eco de una caída o un vertido. Cada palabra empieza por encima de su lugar de reposo y baja flotando a su lugar:

```css
.w{--kc:clamp(0,(var(--k,0) - var(--th,0))*2.8,1);opacity:var(--kc);
   transform:translateY(calc((1 - var(--kc))*-24px))}
```

**(g) Acercamiento desde la profundidad.** Hace eco de un túnel o un avance hacia adelante. La línea empieza un poco más chica y crece a su lugar como si se acercara a la cámara: `transform: scale(calc(0.82 + 0.18 * var(--kc)))` con la opacidad siguiendo a `--kc`. Apila debajo una copia blanda con desenfoque estático (el patrón de desenfocado a nítido) cuando el acercamiento también debe enfocarse.

**(h) Mitades que se separan.** Hace eco de pliegues que se abren o cortinas que se corren. Divide el titular en dos mitades; cada una empieza tirada hacia la línea central y se desliza hacia afuera hasta reposar a medida que sube `--kc`, con signos opuestos de `--jx` por mitad.

**(i) Tejido.** Hace eco de hilos que se cruzan o hebras que se entrelazan. Los caracteres llegan alternando desde arriba y desde abajo: el CSS de dispersión con variación solo vertical y signos de `--jy` alternando según el índice del carácter.

**Este menú son ejemplos, no un conjunto cerrado.** Inventar una entrada nueva que encaje con este metraje es el trabajo. Toma el momento sobre el que está la banda, pregúntate qué está haciendo físicamente el metraje, y construye la entrada que le haga lo mismo a las palabras. Cada invento mantiene la parte fija: solo transform y opacity, recorrido a partir del `--k` de la banda, totalmente reversible al hacer scroll hacia arriba (la rampa de carga única de la banda uno es la única excepción diseñada).

**El patrón de control (ajusta un momento sin tocar la matemática de las bandas):** cada banda acepta dos atributos HTML opcionales. `data-ramp` sobrescribe la ventana de armado por defecto (el valor por defecto es `Math.min(0.025, bandLength * 0.35)` de progreso; `data-ramp="0.036"` saborea un armado alrededor de un 50 por ciento más largo). `data-spread` define el spread del escalonado de caracteres para las entradas de dispersión y grilla. La sensación de cualquier momento se ajusta desde su markup, y el bucle de control nunca cambia.

## La condición del hero fijo (cinco condiciones, en CSS Y JS)

Algunos visitantes reciben un hero de imagen fija compuesta en lugar del scrub. Las cinco condiciones, y tienen que coincidir EXACTAMENTE en las media queries de CSS y en la decisión de JavaScript, o un lado carga recursos que el otro oculta:

1. Teléfonos: `(max-width: 720px)`
2. Tablets en vertical: `(orientation: portrait) and (max-width: 1024px)`
3. Puntero grueso en vertical: `(orientation: portrait) and (pointer: coarse)`
4. Teléfonos en horizontal: `(orientation: landscape) and (pointer: coarse) and (max-height: 560px)` (un teléfono de costado pasa todas las comprobaciones de ancho pero no tiene espacio para el recorrido)
5. Movimiento reducido: `(prefers-reduced-motion: reduce)`

**La condición se decide en vivo, no una vez al cargar.** Las media queries de CSS se re-evalúan en cada rotación, redimensión y cambio de preferencia. Una comprobación de JS de una sola vez deja un hero en blanco de varios viewports en el momento en que una tablet gira de vertical a horizontal, una ventana acoplada se maximiza más allá de 720px, o se desactiva el movimiento reducido a mitad de la sesión: el CSS vuelve a mostrar el escenario del scrub, pero del lado de JS no existe ni póster, ni video, ni listener de scroll. Conecta el evento change de las cinco queries a una función que activa y desactiva el scrub:

```js
const GATES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)'
];
let scrubOn = false;
function enableScrub(){
  if (scrubOn) return; scrubOn = true;
  initHeroOnce();                       // wrap the poster paint and the startBlobFetch flow from the Blob loader section above in one run-once function; this call is that wrapper
  addEventListener('scroll', onScroll, {passive:true});
  bands.forEach(b => { b.op = -1; b.k = -1 });   // reset caches so stale pinned styles get rewritten
  unpinFinalStates();                   // undo whatever pinToFinalStates applied, so lines, counters, and holds go back to being scroll-driven
  updateCaptions(heroProgress());
  onScroll();                           // re-seek the video to the current scroll position; without this the frame sits stale until the user scrolls
}
function disableScrub(){
  if (!scrubOn) return; scrubOn = false;
  removeEventListener('scroll', onScroll);
  if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null }
}
function applyHeroMode(){
  if (GATES.some(q => matchMedia(q).matches)) disableScrub();
  else enableScrub();
}
const MQLS = GATES.map(q => matchMedia(q));   // keep the query lists referenced; unreferenced ones have historically lost their listeners in old browsers
MQLS.forEach(m => m.addEventListener('change', applyHeroMode));
applyHeroMode();
```

Las cinco cadenas tienen que ser idénticas carácter por carácter en ambos lugares, y el póster y la descarga del Blob siguen viviendo SOLO dentro del camino controlado.

Una protección relacionada para pantallas capaces de scrub que simplemente son bajas (una ventana de escritorio poco alta, no un teléfono): mantén el scrub pero oculta los pequeños elementos superpuestos manejados por el scroll que tenga la página (indicadores, lecturas, tickers), que no tienen espacio. Un ejemplo con los nombres de clase de una construcción; usa los tuyos:

```css
@media (max-height:560px){.cue,.hud,.feed{display:none}}
```

El hero fijo es un layout diseñado, no una disculpa de respaldo: el póster o el frame final compuesto con los textos visibles. La decisión para móvil se toma de forma consciente en cada proyecto. El hero fijo es el valor por defecto. Considera un scrub en móvil con recorte de cobertura solo cuando se cumplan las tres cosas: el video codificado es chico (menos de unos 8 MB), la composición sigue leyéndose al recortarla a vertical (el carril de la acción sobrevive al recorte), y el resultado está verificado en un teléfono real. Cuando falle cualquiera de las tres, publica el hero fijo con orgullo.

## Completo sin el video

La página tiene que estar completa y bonita si el video nunca carga. Conecta el evento `error` del video para ocultar el elemento video muerto sobre el fondo del póster. Cada texto, cada sección y la llamada a la acción tienen que funcionar con una imagen fija detrás. Prueba este estado a propósito renombrando el archivo del video y cargando la página.

## El sistema de movimiento alrededor del hero

- **Nada salta.** Cada aparición, hover y cambio de estado se suaviza. Define dos curvas de easing como tokens y úsalas en todos lados. Incluso la página misma aparece suavemente.
- **Las entradas son coreografía.** Un IntersectionObserver agrega una clase `.in`; los hijos llegan en secuencia con pasos de escalonado de 60 a 150ms. Los estados inicial y final de la entrada tienen que llevar como prefijo la clase del contenedor (`.card .part`, `.card.in .part`) para que ganen en la cascada; si no, una regla posterior puede cancelar la animación en silencio. Y cuando termina la entrada, RETIRA los delays escalonados: la regla de limpieza que pone en cero `transition-delay` tiene que igualar o superar la especificidad de las reglas de delay nth-child que retira (`:nth-child` cuenta como una clase), o en silencio nunca se aplica y cada hover sobre los hermanos posteriores se retrasa por el escalonado para siempre. Comprueba el retiro haciendo hover sobre el segundo y el tercer ítem después de que termine la entrada.
- **Nunca pongas un estilo dinámico en un elemento que también tiene una animación de entrada con `forwards`.** El valor final de la animación gana para siempre. Entrada en el padre, estilo dinámico en un hijo.
- **Un elemento vivo por sección** a nivel susurro después de su entrada: un ciclo lento o un pulso de brillo suave, de cuatro segundos o más. Dales delays negativos a las animaciones en bucle (como `-1.2s`) para que estén a mitad de ciclo en el primer pintado. Pausa las que están fuera de pantalla limitando las reglas de animación a una clase que alterna un IntersectionObserver, y pausa todo en pestañas ocultas con una clase del body. `animation-play-state` no es una propiedad heredada, así que ponerla en un contenedor en silencio nunca llega a los elementos anidados ni a los pseudo-elementos. El patrón que no puede fallar: `body.paused *, body.paused *::before, body.paused *::after { animation-play-state: paused !important }`, alternado en `visibilitychange`.
- **Un momento interactivo diseñado por sitio.** Diseñado, no decorativo; la forma probada tiene su propia sección más abajo.
- **Anima solo `transform` y `opacity`.** Para los pulsos de brillo, pon la sombra en un pseudo-elemento a máxima intensidad y anima su opacidad.
- **El texto enmascarado necesita espacio para los descendentes:** cualquier revelado con `overflow: hidden` lleva espacio para respirar con padding/margen negativo en em, o a la g, la y y la p se les cortan las colas.
- **Nunca sobrescribas `el.style.transition` en JavaScript.** Alterna una clase que declare la transición combinada completa.

## El único momento interactivo (la forma probada)

Uno por sitio, acorde al tema, realizado a mitad del recorrido. La forma que funcionó una y otra vez: una acción que refleja la propia historia del producto. Un mantener presionado que deja asentarse un aroma. Un mantener presionado que tira de un hilo y cose una costura. El visitante no solo lee la única idea de la marca; la realiza.

La mecánica que hace que se sienta diseñado en lugar de un truco:

- El progreso crece mientras el visitante mantiene presionado.
- Soltar antes de tiempo hace bajar el progreso suavemente; nunca salta a cero.
- Completarlo ilumina el contenido de la sección en secuencia, para que la acción del visitante gane algo real.
- El movimiento reducido recibe el estado final instantáneo, sin necesidad de mantener presionado.

Mantener presionado es un ejemplo, no una ley. Cualquier interacción funciona si representa la única idea de la marca.

## Desbordamiento y movimiento reducido

- `overflow-x: clip` en `html` Y en `body`, con `hidden` declarado primero como respaldo. `hidden` solo todavía permite que el código desplace la página de costado, y un solo link de ancla puede dejar toda la página corrida.
- El movimiento reducido se respeta POR COMPLETO: elimina animaciones y transiciones en los elementos y en `::before`/`::after`, pon en cero cada `transition-delay`, muestra cada elemento coreografiado en su estado final terminado, y vuelve a aplicar los transforms de posición por breakpoint (un `transform: none !important` general puede tirar fuera de pantalla un elemento posicionado para móvil). El video no se carga en absoluto (es una de las cinco condiciones del hero fijo).
- El movimiento reducido se respeta EN VIVO, en AMBAS direcciones. Escucha el evento change de la media query. Al activarse, fija cada elemento dibujado con el scroll en su estado final dibujado y detén los controles de JS: las líneas que se dibujan solas terminan, los contadores saltan a su objetivo, las interacciones de mantener presionado se completan. Al desactivarse, vuelve a activar el scrub con la misma función de condición que usan las cinco queries, para que se reseteen las cachés y se recalculen los textos en lugar de quedar fijados. Y deshaz todo lo que aplicó pinToFinalStates: quita las clases fijadas o los estilos inline de las líneas dibujadas, los contadores y las interacciones de mantener presionado, para que los controles del scroll vuelvan a manejarlos. Reactivar el hero dejando el resto de la página fijado es el medio arreglo que parece hecho y no lo está.

```js
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => {
  if (e.matches) pinToFinalStates();   // lines drawn, counters at target, holds done, drives stopped
  else applyHeroMode();                // motion is back: re-arm the scrub, never leave the pins behind
});
```

## Dirección de diseño (qué significa caro)

El piso de ingeniería evita que el sitio se rompa. Esta vara evita que parezca hecho por IA:

- **Comprométete con UNA dirección tomada del mundo del tema** y deja que maneje la paleta, la tipografía, el movimiento y las imágenes juntos, para que la página y el metraje se lean como un solo mundo.
- **Inventa un elemento distintivo** único para este sitio y gasta ahí el presupuesto de audacia. Todo lo demás se queda tranquilo para que se lea el distintivo. Después prueba su volumen: si se quitara el distintivo, ¿la página cambiaría de forma notable? Si apenas cambiaría, no es un distintivo. Gasta el presupuesto de audacia en algo cuya ausencia se notaría.
- **Ningún par de secciones vecinas comparte el mismo esqueleto de layout.** Si dos vecinas abren ambas con antetítulo, titular y bajada sobre la misma grilla, cambia la forma de una. Un visitante nunca debería sentir la misma plantilla estampada dos veces seguidas.
- **Prohíbe los looks que gritan "esto lo hizo una IA",** salvo que el usuario pida uno explícitamente: lienzo crema con una serif y acento terracota, casi negro con verde ácido, casi negro con un acento ámbar cálido y una serif de alto contraste (el siguiente default en cuanto alguien dice oscuro, rico o cinematográfico), y el brutalismo de bordes finos. Una excepción: están prohibidos como recursos por defecto, no como temas. Cuando uno de ellos realmente ES el mundo material propio del tema (un estudio de cerámica realmente vive en crema y terracota), comprometerse con el mundo del tema gana. Gánatelo: toma los tonos del propio metraje, inventa el elemento distintivo, y mantente lejos del layout de plantilla de catálogo, para que la página se lea como el mundo de esta marca y no como el look por defecto. Di la desviación en voz alta.
- **El acento aparece en dosis raras:** la llamada a la acción, los estados de foco, y uno o dos momentos de énfasis. Un acento que está en todos lados no es un acento.
- **El lienzo nunca es `#000` ni `#fff` puro.** Tíñelo hacia la gradación de color del metraje.
- **Haz de la página un solo ambiente:** una capa de fondo fija detrás de todo (una deriva lenta, grano o un brillo suave en el mundo del metraje), con un ciclo de 60 segundos o más, para que hacer scroll se sienta como moverse por un lugar en lugar de pasar por secciones apiladas.

## El piso de calidad (todo, siempre)

- Tipografías recortadas a solo los pesos en uso, con `preconnect`. Tipografía de display con carácter real, una de cuerpo tranquila, una mono para etiquetas chicas. Nunca Inter ni Roboto como display.
- Dimensiona los bloques de texto en unidades `ch` sobre el propio elemento de texto, nunca sobre un contenedor. Un `ch` se resuelve contra la tipografía que hereda el elemento, no contra la de display que hay adentro, así que el límite en `ch` de un contenedor se mide en la tipografía equivocada. Los contenedores llevan `px` o `min()`. Una construcción real limitó un bloque de asentamiento con el `ch` de la tipografía de cuerpo y el titular se partió en tres líneas.
- Contraste real sobre el lienzo: calcúlalo, no lo adivines. 4.5:1 para el texto de cuerpo, 3:1 para el texto grande y los bordes de interfaz. Los colores de línea fina normalmente fallan para bordes interactivos; dales a esos su propio valor más fuerte.
- Landmarks semánticos: `<nav>`, `<main id="main" tabindex="-1">`, `<footer>`, un link para saltar a `#main`, una jerarquía de encabezados real, y `aria-hidden="true"` en las decoraciones.
- El video de scrub es decorativo, así que trátalo como tal: `aria-hidden="true"` en el elemento video, sin atributo `controls`, y mantenlo fuera del orden de tabulación (`tabindex="-1"` en el video, o `inert` en la capa decorativa del escenario sticky) para que los usuarios de lector de pantalla y de teclado lleguen a los textos y al contenido.
- `:focus-visible` con estilo en el color de acento. Áreas táctiles de al menos 44px bajo `(pointer: coarse)`, agregadas sin cambiar el layout: `@media (pointer:coarse){ .btn { min-height:44px; display:inline-flex; align-items:center; justify-content:center } }`. Nunca cambies el tipo de display de un elemento sin volver a declarar su alineación; un `display:inline-flex` a secas alinea a la izquierda las etiquetas de los botones y achica las filas de ancho completo al tamaño de su texto.
- `<title>` real, meta description, `theme-color`, y un favicon SVG inline con la marca.
- `og:image` y `og:url` necesitan URLs absolutas, que no existen hasta la publicación. Deja un comentario bien marcado `<!-- DEPLOY STEP -->` y actualízalas con la URL en vivo al momento de publicar (ver `deploy.md`).
- Las decoraciones nunca chocan con el contenido: los elementos con posición absoluta tienen espacio reservado y se ocultan en pantallas bajas con una media query de `max-height`.
- Las filas de texto se alinean por la línea base (`align-items: baseline`), no como cajas centradas.

## El checklist de autoprueba (córrelo antes de mostrarle algo al usuario)

Audita de forma adversarial. Demuéstralo, no lo asumas:

1. Haz capturas del sitio construido en tamaño de computadora y en anchos de teléfono (375px de ancho como mínimo; revisa 1280x800, 1440x900, 375x812, 375x667).
2. Prueba cada botón y cada link. Envía el formulario y confirma su estado de respuesta.
3. Recorre el hero con el scroll arriba, en el medio y abajo. Después hazlo rápido. Busca tirones, especialmente en Chrome.
4. Corre la prueba de flick sobre el mapa de momentos: pasos de rueda de 120px, 240px y 360px. Cada texto legible durante 5 a 6 flicks normales, ningún momento salteable con 360px.
5. Corre la auditoría de legibilidad del peor frame: el peor píxel bajo el texto de cada banda, con el scrim aplicado, con contraste de 3.5:1 o mejor.
6. Demuestra que cada entrada realmente se reproduce (el orden de la cascada puede matarlas en silencio).
7. Intenta forzar la página de costado: links de ancla, decoraciones anchas, anchos angostos.
8. Córrela con movimiento reducido activado: estados finales visibles, ninguna petición del video. Después activa el movimiento reducido CON la página abierta, no solo antes de cargarla: cada elemento dibujado con el scroll se fija en su estado final y los controles de JS se detienen.
9. Cárgala sin el video: la página sigue completa sobre el póster.
10. Revisa la consola del navegador en tamaños de computadora y de teléfono: cero errores.
11. Revisa las colas de las letras (g, y, p) en cada texto enmascarado o recortado al 100 por ciento de zoom.
12. **La pasada con ojos nuevos, al final.** Deja el checklist y mira la página como un visitante nuevo sin ningún contexto. ¿Cada elemento tiene su lugar, o algo flota sin explicación? ¿Algún elemento paralelo es desigual: un paso sin imagen, una tarjeta con estilo distinto al de sus hermanas? ¿La página se lee como premium y hecha a medida para esta marca, o algún tramo se lee como relleno? Arregla lo que detecte el ojo nuevo antes de que el usuario lo vea. Es un acto distinto de auditar, y detecta lo que las auditorías no pueden.

**Cuando existe un navegador controlable, corre las comprobaciones reales, no aproximaciones.** El camino de Chrome headless de `troubleshooting.md` da control total de un navegador real, y cuatro de las comprobaciones de arriba solo se pueden probar de verdad así: la emulación táctil hace que `(pointer: coarse)` realmente coincida, la única prueba verdadera de tres de las cinco condiciones del hero fijo; la emulación de media cambia `prefers-reduced-motion` en vivo a mitad de la sesión, la única prueba verdadera del requisito de ambas direcciones del paso 8; bloquear la URL del video con `Network.setBlockedURLs` prueba el estado completo sin video sin renombrar ningún archivo; y un clic real del mouse presionando y soltando, con una pausa entre medio, prueba el momento de mantener presionado tal como lo realiza un visitante.

Si el entorno permite sumar revisores independientes (un segundo agente, un par de ojos nuevos), apúntalos también a la construcción terminada. El checklist demuestra lo que pensaste revisar; los adversarios encuentran lo que no pensaste.

Reporta lo que encontraste y lo que arreglaste. La última revisión del usuario es suya, pero nunca debería ser él quien encuentre tus errores.

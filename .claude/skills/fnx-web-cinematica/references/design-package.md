> **Adaptación FNX.** Referencia de la skill `fnx-web-cinematica`. En fnxestudio.com valen además `CLAUDE.md`, `AGENTS.md` y `docs/traspaso-claude-code.md`; si algo de acá choca con esas reglas, ganan ellas.

# El paquete de diseño

El único entregable del Ciclo del Director Creativo de la Fase 5. Un documento que contiene cada decisión creativa, escrito completo ANTES de cualquier generación, y consumido por la construcción en la Fase 8. Quien lo tome no debería necesitar nada más para construir la página correcta.

Dos reglas lo rigen:

- **Cada línea de texto del paquete se publica tal cual.** El paquete es donde se escribe; la construcción es donde se conecta. Las pasadas de construcción conectan exactamente las líneas escritas y nunca las parafrasean.
- **Los números son puntos de partida.** Los rangos de bandas y los números de meseta de aquí son puntos de partida etiquetados. La prueba de flick de `scrub-pipeline.md` los valida después, y los rangos se mueven si la prueba lo indica.

El Nivel 1 lleva el mismo paquete, recortado: menos bandas, mismas secciones.

## 1. La premisa de la marca

Un párrafo corto construido sobre UNA palabra o idea real del mundo del tema, y todo el sitio enseña y vende esa única idea. Cada sección, el momento interactivo y la línea de cierre la sirven. Si una sección no sirve a la premisa, no pertenece a la página.

## 2. La paleta como tokens CSS

Tomada del mundo del metraje, para que la página y el video se lean como un solo lugar. Antes de generar, el paquete nombra la dirección de la paleta a partir del mundo del storyboard; los valores exactos de los tokens se terminan de definir a partir del metraje aprobado después del control del video. Roles con nombre, listos para pegar en la construcción:

```css
:root{
  --canvas:#___;        /* page background, tinted toward the footage's grade, never pure black or white */
  --panel:#___;         /* cards and raised surfaces */
  --accent:#___;        /* the CTA and rare emphasis */
  --accent-hover:#___;  /* the accent's hover state */
  --accent-muted:#___;  /* the accent at whisper level: borders, glows, particles */
  --text-secondary:#___;
  --text-primary:#___;
}
```

## 3. El trío tipográfico

Una tipografía de display fresca, una de cuerpo tranquila, y una mono para etiquetas pequeñas. Nunca Inter ni Roboto como display. Elige tipografías del propio mundo de la marca en lugar de un default habitual. Nombra cada tipografía y los pesos exactos en uso.

## 4. El mapa de bandas

Una tabla, una fila por banda del hero:

| Banda | Rango (punto de partida) | Momento del metraje | Texto (tal cual) | Entrada |
|---|---|---|---|---|
| 1 | 0.00 a 0.14 | lo que está haciendo el video | "Las palabras exactas." | una entrada con nombre |
| 2 | 0.16 a 0.32 | ... | "..." | ... |

- **Rango:** un punto de partida etiquetado en progreso de scroll, validado después con la prueba de flick.
- **Momento del metraje:** lo que muestra el video mientras esta banda está activa, para que el layout pueda mantener libre el carril de la acción.
- **Texto:** las palabras finales exactas, en el registro de la marca.
- **Entrada:** una entrada con nombre por banda, que hace eco del momento del metraje (el principio del eco en `scrub-pipeline.md`).

## 5. El bloque de texto del hero fijo

El texto compuesto para los visitantes que reciben el hero fijo (teléfonos, movimiento reducido): titular, subtítulo y CTA, escritos para ir sobre el póster o el frame final sin un recorrido detrás.

## 6. El esquema de debajo del hero

Las secciones después del asentamiento, en orden, cada una con su texto tal cual. Cada sección embuda hacia UN ancla de llamada a la acción. El esquema incluye:

- El único momento interactivo y en qué sección vive.
- Las preguntas frecuentes, respondiendo las objeciones reales encontradas en la investigación, con las propias palabras de los compradores.
- El texto de las citas o testimonios.
- Los microtextos del formulario: etiquetas, texto de ejemplo, texto del botón y el estado de éxito, más la elección de manejo del formulario en un sitio estático (estado de éxito solo con JS, link mailto, un servicio gratuito de formularios, o ningún formulario; las opciones están en la Fase 8 de la skill).
- El pie de página, con la aclaración de marca ficticia cuando la marca es inventada.

## 7. El plan de la capa vectorial

Los elementos SVG que vas a dibujar a mano (motivos, líneas que se dibujan solas, divisores), las partículas a nivel susurro, y dónde vive cada uno en la página. Todo respeta el movimiento reducido: estados finales visibles, animaciones detenidas.

## 8. La lista de ingeniería

Nombra el estándar completo para que la construcción no pueda recordarlo a medias: la descarga como Blob con el anillo de carga, la interpolación normalizada por dt, los saltos controlados, las escrituras al DOM solo con cambios, el ritmo de bandas con la prueba de flick, el sistema de legibilidad de cuatro capas, las cinco condiciones del hero fijo mantenidas en vivo con listeners de cambio, completo sin video, y el piso de calidad, todo en `scrub-pipeline.md`, más el estándar de sitio animado completo de la Fase 8 de la skill.

## 9. La línea del control de textos

Cierra el paquete con el control, dicho para que la construcción lo herede: cada línea visible de arriba se publica tal cual, y la página construida debe pasar el control grep de la Fase 9 (cero rayas largas, cero palabras de catálogo, más la revisión del texto del cuerpo buscando señales de IA) antes de que nadie la vea. Los recursos de marca deliberados escritos en este paquete (un trío diseñado, un golpe en staccato planeado) son oficio y se quedan; la revisión busca lo que se coló sin invitación.

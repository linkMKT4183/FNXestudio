> **Adaptación FNX.** Referencia de la skill `fnx-web-cinematica`. En fnxestudio.com valen además `CLAUDE.md`, `AGENTS.md` y `docs/traspaso-claude-code.md`; si algo de acá choca con esas reglas, ganan ellas.

# Las leyes del video del hero y la construcción de prompts

Diseña cada toma con estas leyes ANTES de generar. Predicen qué conceptos salen bien al primer intento y cuáles queman créditos. Cada una salió de una construcción real que tuvo éxito gracias a ella o que falló sin ella.

## Las doce leyes

1. **El movimiento coincide con el scroll.** Bajar con el scroll tiene que leerse como bajar, abrirse o llegar: un vertido, un descenso, un desarmado, un acercamiento. Pregúntale a cada concepto: "cuando el visitante baja con el scroll, ¿este movimiento se siente como bajar?" Un sujeto que vuela HACIA ARRIBA mientras el visitante baja pelea contra la página y siempre pierde.

2. **Un sujeto, un movimiento continuo, sin cortes.** Un solo sujeto hace un solo recorrido. No le pidas al video con IA que convierta una cosa en otra distinta: las transformaciones entre dos sujetos son la toma más difícil del video con IA y queman dinero. Si el usuario insiste en una, esconde el cambio dentro de un destello o un momento de nube, mantén una trayectoria ininterrumpida (misma dirección, misma posición, misma velocidad a ambos lados del cambio), y espera re-intentos.

3. **Fija la trayectoria, libera el cuerpo.** La trayectoria se mantiene rígida, pero el sujeto sobre ella tiene que seguir vivo: movimiento natural, ondulación, pequeños ajustes. La escena también necesita vida: vapor que flota, nubes que pasan, luz que cambia. Nunca estabilices una toma congelando al sujeto. Un sujeto congelado sobre una trayectoria limpia se lee como metraje muerto.

4. **Planifica el final primero.** El frame final es donde la página se queda en reposo, así que escríbelo explícitamente en el prompt como una llegada compuesta y satisfactoria: la taza asentada en la barra, el producto armado, el destino alcanzado. Un final incómodo hace un sitio web incómodo. Si el final es una presentación del producto, compónla con un margen generoso arriba y abajo de todo el producto: el header del sitio va encima de la parte superior del cuadro, y el recorte de cobertura se come los bordes en pantallas más anchas o más bajas. Un producto con la parte de arriba cortada se lee como un accidente; apretado contra la navegación se lee recargado. La alternativa que esquiva el problema por completo: un final de textura a sangre completa sin nada recortable es seguro para el texto en cualquier pantalla. Verifícalo mirando el frame final con el header simulado encima, en una ventana ancha y en una baja, antes de aprobar.

5. **Elige sujetos que perdonen.** Fluidos, niebla, vapor, luz, tela y siluetas lejanas se renderizan bellamente. Cualquier cosa cuya anatomía exacta todo espectador conoce de cerca (controles, teclados, manos, animales conocidos en detalle) mostrará sus errores al instante. Mantén el detalle riesgoso lejos, simple y en movimiento.

6. **Prefiere un eje de movimiento vertical.** Un recorrido recto de arriba abajo coincide uno a uno con el eje del scroll, así que la revelación se mueve con la página en ambas direcciones. No es obligatorio, pero cuando dos conceptos están empatados, quédate con el vertical.

7. **Compón para el layout.** Decide durante el diseño del concepto dónde está la acción en el cuadro, y deja espacio negativo intencional para que vivan los textos y la historia de la página. El carril de la acción queda libre; las palabras lo flanquean.

8. **Vende los cruces de límites.** Cuando la cámara atraviesa una superficie (entrar al agua, atravesar niebla, pasar un vidrio), escribe en el prompt el momento físico de la lente: una salpicadura, gotas en la lente, un instante de desenfoque. Un cruce limpio de un límite se lee falso; el desorden es el realismo.

9. **Si el hero muestra un producto, ponle marca o encuádralo cerca.** Un objeto genérico sin marca a distancia se lee como un provisorio. O aplicas la marca con edición de imagen antes de animar, o escribes el final para que llegue lo bastante cerca como para que el diseño del objeto lo sostenga.

10. **El texto sobre metraje se gana su legibilidad.** Un video en vivo detrás de la tipografía es un fondo en movimiento que no controlas frame a frame. Así que cada banda de texto lleva un sistema de legibilidad: un scrim local (un degradado oscuro suave detrás de las palabras) que se intensifica solo mientras esa banda está activa, una sombra de texto real, y una comprobación de contraste contra el PEOR frame de esa banda, nunca el promedio. Ubica cada banda en la región más calma de sus frames. Si una línea no se puede leer de un vistazo en el momento más cargado de su banda, falla. El sistema que funciona, con código y la auditoría, está en `scrub-pipeline.md`.

11. **Dosifica el texto en distancia de scroll, no en segundos.** Un sitio con scroll se lee a flicks, no se reproduce a 24 frames por segundo. Dale a cada momento de texto una meseta larga de visibilidad completa (la mayor parte de su banda, lo suficiente para sobrevivir varios flicks normales de scroll) con rampas cortas y suavizadas en los bordes, para que un lector nunca vea un texto aparecer y desaparecer entre dos flicks y nunca tenga que frenar en seco para alcanzar una línea. Prueba el mapa de momentos haciendo flicks como un visitante real, no arrastrando lento. Los números exactos y la prueba de flick están en `scrub-pipeline.md`.

12. **Las protecciones permanentes:** escribe "no text, no logos, no lettering anywhere" en cada prompt de imagen y de video. Rechaza las sugerencias de presets del generador cuando tienes una toma diseñada. Y nunca construyas el sitio alrededor de un metraje que el usuario no aprobó: el andamiaje silencioso durante la espera de un render está bien, pero nada se muestra ni se termina hasta que el video pase su control.

## Construcción de prompts

### Plantilla del frame inicial (imagen, 16:9, 2k, unos 2 créditos)

Compón la imagen como el frame uno del movimiento: el sujeto ubicado para que el recorrido pueda empezar.

```
[SUBJECT] at [POSITION IN FRAME], composed as the first moment of a motion
that will [ONE-SENTENCE JOURNEY]. [LIGHTING: source, direction, mood].
[PALETTE: the three to five brand colors described as materials and light,
not hex codes]. [ATMOSPHERE: the ambient life the scene carries]. Intentional
negative space at [WHERE THE CAPTIONS WILL LIVE]. Cinematic, photorealistic,
16:9. No text, no logos, no lettering anywhere.
```

**La trampa al describir el espacio negativo: nunca nombres el espacio vacío como oscuridad o vacío.** Cuando reserves lugar para los textos, describe la escena como un mundo continuo que llena el cuadro de borde a borde, con la región calma como parte de ese mundo: sombra suave, profundidad que se aleja, una superficie lisa. Pide "generous empty darkness left and right" y el modelo pinta paneles laterales negros literales, lo que cuesta un re-intento. La descripción de borde a borde sale bien al primer intento.

La misma trampa tiene un caso de simetría. Cuando la composición necesita un sujeto centrado, "centrado" solo no alcanza. Di que el sujeto parte el cuadro por la mitad, justo en el centro, a la misma distancia del borde izquierdo que del derecho. Describe ambas mitades con un tratamiento idéntico, y prohíbe explícitamente objetos, piezas de máquinas y reflejos brillantes a cualquiera de los lados. Una construcción real necesitó tres intentos antes de que esta descripción lograra la toma.

Si el usuario entregó una foto real del producto, esa foto puede ser el frame inicial en su lugar. Revisa primero su resolución y composición, y confirma que el espacio negativo funcione para el layout.

Cuando el sujeto es una persona real (el dueño, el chef, el creador), su foto entra como imagen de referencia en lugar de frame inicial: genera el frame inicial con un modelo que acepte referencias de personaje, repite en el prompt sus detalles reconocibles (pelo, anteojos, ropa), e inspecciona el parecido del resultado del mismo modo que inspeccionas las marcas registradas. El parecido es un detalle de coherencia de marca; una cara que casi se parece hace fallar todo el sitio. Y una regla dura antes de generar cualquier cara: usa solo una foto del propio usuario o de una persona que aceptó aparecer en el sitio. Si la foto es de cualquier otra persona, detente y pregunta antes de generar.

### Plantilla del video (imagen a video, 1080p, 6 segundos, modo estándar, sin audio; unos 54 créditos en el modelo más caro, mucho menos en uno de precio medio)

```
One continuous shot, no cuts. [SUBJECT] [VERB OF THE JOURNEY: pours, descends,
approaches, assembles] from [START STATE] to [END STATE] along [THE EXPLICIT
TRAJECTORY: straight down the center of frame, a slow forward push, etc].
The [SUBJECT] stays alive throughout: [SMALL NATURAL MOTION: ripple, sway,
micro-adjustments]. The scene stays alive: [AMBIENT LIFE: drifting steam,
shifting light, streaking cloud]. [IF A BOUNDARY IS CROSSED: the physical
lens moment, e.g. a splash and droplets on the lens with a beat of blur].
The shot ends at rest: [THE COMPOSED FINAL FRAME, fully described: what sits
where, what the light does, why it feels arrived]. No text or lettering
anywhere.
```

Genera en 1080p, no en 4K. La versión web se recodifica y comprime de todos modos, y el 4K solo multiplica el costo.

## La receta de encadenado (Nivel 2: un recorrido de scroll de 15 a 20 segundos)

Un recorrido largo construido con segmentos de 6 segundos que se unen de forma invisible:

1. Genera el segmento 1 a partir del frame inicial. Pásale la inspección completa y el ⛔ CONTROL DEL VIDEO a él solo.
2. Extrae con ffmpeg el frame final del segmento aprobado como un PNG de calidad completa (comando exacto en `ffmpeg-recipes.md`; los jpg de calidad de revisión no alcanzan para encadenar).
3. Sube ese PNG al generador (con Higgsfield es así; con otro conector, el paso equivalente). Este es el puente de un archivo local a un `start_image`, y tiene tres pasos: llama a `media_upload`, que devuelve una URL PUT prefirmada (una dirección de subida temporal). Luego haz PUT de los bytes crudos del PNG a esa URL, por ejemplo `curl -X PUT --upload-file final.png "<presigned-url>"`. Luego llama a `media_confirm` para registrar la subida. El id de medio confirmado es lo que pasas como `start_image` en la llamada de imagen a video del siguiente segmento.
4. Escribe el prompt del siguiente segmento para que el movimiento CONTINÚE: misma dirección, misma velocidad, misma iluminación, retomando exactamente donde descansó el segmento anterior. La unión es invisible solo si el vector de movimiento nunca se rompe. Caso especial que aparece seguido: cuando un segmento termina en un frame casi vacío o casi negro (por ejemplo, un único punto de luz), el prompt del siguiente segmento debe describir explícitamente qué crece a partir de ese frame. Haz eso y la unión desaparece.
5. Pasa cada segmento por su control por separado. Un segmento rechazado es un re-intento individual barato, no rehacer todo el recorrido.
6. Une los segmentos aprobados en un solo archivo con la concatenación de una sola codificación de `ffmpeg-recipes.md`: mete los segmentos CRUDOS en un solo filtro y codifica exactamente una vez con la configuración de scrub. Una sola codificación significa que las uniones no pueden desfasarse. El respaldo, cuando no hay crudos disponibles, es codificar cada segmento con configuraciones IDÉNTICAS y unirlos con el demuxer concat; los parámetros idénticos son lo que mantiene invisible ese camino en las uniones, y los desparejos fallan en cada unión.
7. El archivo unido es el único video de scrub que usa la página. La página nunca sabe que eran segmentos.

Solo el segmento final necesita el final compuesto en reposo (ley 4). Los segmentos del medio deben terminar en pleno movimiento para que el siguiente lo continúe.

**La ley de la costura: la identidad de la textura no se traslada.** Cada generación re-imagina la textura fina a partir de su frame inicial. La posición se traslada; el tejido exacto, el grano o la piel no. Así que una unión de reposo a reposo sobre una textura hiperespecífica se ve como un corte visible aunque el vector de movimiento sea perfecto. Haz el storyboard de cada costura para que caiga dentro del movimiento, o dentro de un momento que justifique un refresco de textura: un barrido por la lente, un instante de desenfoque, un momento de oscuridad, un cambio de luz. Nunca juntes dos estados de reposo sobre una textura específica. Si una cadena ya está generada y una costura se nota igual, el rescate es la unión con fundido de `ffmpeg-recipes.md`.

**Qué mundos se encadenan de forma confiable:** los mundos abstractos (luz pura, partículas, atmósfera) son los campeones de confiabilidad al encadenar. Sin anatomía que un prompt de continuación pueda arruinar, una cadena de tres segmentos puede salir bien al primer intento en cada segmento. Cuando un concepto de Nivel 2 está en duda, esta es una buena razón para ir a lo abstracto.

## Rechazar presets

A veces el generador relaciona tu prompt con un patrón y te ofrece un preset de la casa en lugar de generar tu toma. Recházalo y vuelve a intentar con tu prompt literal. Tu toma diseñada cumple las leyes y está compuesta para tu layout; un preset no hace ninguna de las dos cosas.

## Consulta de costos

Antes de CUALQUIER generación, consulta el precio exacto de la llamada exacta que planeas con `get_cost: true`. Es gratis. Dile al usuario cada precio en palabras simples antes de que se mueva: el precio del frame inicial antes del frame ("La imagen inicial cuesta unos 2 créditos, la hago ahora"), luego el menú de modelos de video con precios reales una vez aprobado el frame, antes de que se mueva ningún crédito de video. El paso barato primero, la decisión grande después, cada número real.

**El modelo de video es una elección real, y la hace el usuario.** El conector ofrece varios modelos de video, y la diferencia de precio con parámetros idénticos (misma duración, misma resolución, mismo modo) se midió en alrededor de cinco a uno entre el modelo más caro y uno de precio medio. Ambos extremos son de primer nivel de verdad al momento de escribir esto: los rankings independientes ponen al valor por defecto probado en lo más alto por calidad general y fidelidad al prompt, y a la alternativa de precio medio entre los mejores en física y movimiento cinematográfico. Así que consulta el precio de la MISMA toma planeada en los dos o tres mejores modelos de video. Descubre la oferta actual con el catálogo de modelos del conector; `get_cost` es gratis en todos. Luego presenta los números reales con la disyuntiva honesta: el valor por defecto probado es con el que se ajustaron estas leyes y compra el techo más alto; el modelo de precio medio es legítimo y convierte un saldo chico o de prueba de una sola toma en muchas, lo que cambia el control del video de algo que asusta a una decisión creativa normal. Su dinero, su elección, tomada antes de gastar nada.

Con los valores por defecto probados, una imagen de hero cuesta unos 2 créditos y un video de hero unos 54, que es el tope del rango de video, y una prueba gratis cubre aproximadamente un pipeline de hero más un re-intento, más con un modelo de video más barato. Para un recorrido encadenado, consulta el precio de toda la cadena y presenta el total completo de entrada, por segmento.

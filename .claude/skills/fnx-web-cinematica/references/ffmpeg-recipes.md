> **Adaptación FNX.** Referencia de la skill `fnx-web-cinematica`. En fnxestudio.com valen además `CLAUDE.md`, `AGENTS.md` y `docs/traspaso-claude-code.md`; si algo de acá choca con esas reglas, ganan ellas.

# Recetas de ffmpeg

Comandos exactos para cada paso de procesamiento. Estos parámetros son valores por defecto probados; el intervalo de keyframes en particular es la diferencia entre un scrub fluido y uno a los tirones.

## Disciplina de carpetas

Primero, la carpeta del proyecto en sí: crea una carpeta con nombre para el sitio (el nombre de la marca funciona bien) en una ubicación acordada con el usuario, con `index.html` y `assets/` adentro, y dile al usuario dónde está. Las generaciones crudas y las copias de revisión viven FUERA de esa carpeta de publicación (por ejemplo en `review/` al lado de la carpeta del proyecto, o un nivel más arriba). Solo los archivos procesados entran en `assets/`. Nunca nada en la carpeta de publicación que no deba publicarse.

## La codificación para scrub (la que más importa)

Recodifica el video crudo aprobado con un intervalo corto de keyframes, o el scrub va a ir a los tirones porque el navegador solo puede saltar con precisión a los keyframes:

```
ffmpeg -i raw.mp4 -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

- `-g 8 -keyint_min 8`: un keyframe cada 8 frames, para que cada posición del scroll salte limpio.
- `-crf 18`: calidad visualmente limpia.
- `-movflags +faststart`: los metadatos pasan al principio para que la reproducción y el uso como Blob empiecen de inmediato.
- `-an`: quita el audio; un video de scrub nunca lo necesita.
- Apunta a unos 4 a 8 MB para un clip de 6 segundos en 1080p. Si queda muy por encima, sube `-crf` hacia 20 a 22 y vuelve a revisar la calidad.

### La bifurcación de compresión según el tipo de metraje

El metraje se divide en dos familias, y se comprimen de formas opuestas:

**El detalle cargado enmascara los artefactos.** El metraje que llena el cuadro de detalle cargado (partículas, tela o textura a cuadro completo) esconde los artefactos de compresión dentro del detalle, así que el crf puede empujarse fuerte. El detalle cargado a cuadro completo tolera crf 25 a 26 con una reducción a unos 1700px de ancho (`-vf scale=1728:-2`); puntos de partida, no objetivos. La textura a cuadro completo es el metraje más denso de todos y puede necesitar un ancho más chico o un crf todavía más alto.

**Los degradados suaves son lo opuesto.** Hacen bandas en lugar de enmascarar (el banding son escalones visibles a lo largo de lo que debería ser una rampa de color suave). Empuja fuerte el crf en un clip con muchos degradados y los frames calmos se rompen primero, así que revisa específicamente los frames de degradado calmo.

**El método es siempre el mismo:** empieza desde los puntos de partida de arriba, mueve UNA variable a la vez (primero crf, después el ancho), y revisa a ojo los peores frames haciendo scrub, no pausando. Los artefactos que sobreviven a un frame congelado desaparecen en movimiento en el metraje cargado. Presupuesta el tamaño más o menos en proporción a la duración: un clip de 6 segundos quiere más o menos un tercio del tamaño de un máster de 18 segundos. Agrega una reducción de tamaño antes de sacrificar nunca la densidad de keyframes, y mantén idénticas todas las demás opciones de scrub (`-preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an`).

## El recorte del final (cuando el feedback del control es "que termine antes")

El arreglo más barato de un final no es un re-intento. Cuando una toma es fuerte hasta que el sujeto vuelve a moverse cerca del final, corta el crudo en el último frame estable. La página relaciona el scroll con el progreso, no con los segundos, así que un clip más corto no cuesta nada en ningún otro lado. Extrae frames candidatos alrededor del segundo objetivo, elige el que mejor reposa (márgenes, cara, composición), y luego recorta y codifica para scrub en una sola pasada:

```
ffmpeg -i raw.mp4 -t 4.3 -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

Vuelve a sacar el póster y el frame final después, y vuelve a verificar el nuevo final con el header simulado encima, porque el frame recortado es ahora la composición de reposo de la página. Recurre a un re-intento a precio completo solo cuando no existe ningún frame estable.

## La comprobación de reposo del final (objetiva, un comando)

Si el final realmente reposa no tiene que ser una cuestión de criterio. Mide el movimiento por frame: compara cada frame contra el anterior y lee el brillo promedio de la diferencia, que es una curva de movimiento:

```
ffmpeg -i raw.mp4 -vf "tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG" -f null -
```

Cada frame imprime una línea `YAVG`; más alto significa más cambio desde el frame anterior. Lee la cola de la curva: una llegada sube y vuelve a bajar cerca de su nivel inicial; una deriva se mantiene alta hasta el final. Un comando reemplaza al ojo, y decide si hace falta o no el recorte del final de arriba.

## Póster (primer frame) y frame final

```
ffmpeg -i assets/hero-scrub.mp4 -frames:v 1 -q:v 2 assets/hero-poster.jpg
ffmpeg -sseof -0.1 -i assets/hero-scrub.mp4 -update 1 -frames:v 1 -q:v 2 assets/hero-ending.jpg
```

El frame final es un recurso de diseño gratis y perfectamente alineado con la marca. Reutilízalo en una sección inferior.

## Extracción de frames para inspección (antes del control del video)

Saca el frame inicial, uno del medio y el final del video CRUDO y míralos tú mismo: anatomía, transiciones, si el final realmente reposa. Para un clip de 6 segundos:

```
ffmpeg -ss 0 -i raw.mp4 -frames:v 1 -q:v 2 review/frame-start.jpg
ffmpeg -ss 3 -i raw.mp4 -frames:v 1 -q:v 2 review/frame-mid.jpg
ffmpeg -sseof -0.1 -i raw.mp4 -update 1 -frames:v 1 -q:v 2 review/frame-end.jpg
```

## La captura de frame para encadenar (calidad completa, nunca calidad de revisión)

El frame que se convierte en el `start_image` del siguiente segmento tiene que ser un PNG de calidad completa. Los jpg de revisión `-q:v 2` de arriba son solo para tus ojos; encadenar desde uno mete la compresión en todos los segmentos siguientes:

```
ffmpeg -sseof -0.1 -i seg.mp4 -update 1 -frames:v 1 -q:v 1 final.png
```

Este PNG es lo que subes con `media_upload` y `media_confirm` (el puente está explicado en `prompt-laws.md`), y el id de medio confirmado se convierte en el `start_image` del siguiente segmento.

## Concatenación de segmentos (recorridos encadenados de Nivel 2)

**Preferido: concatena los crudos y codifica exactamente una vez.** Mete los segmentos CRUDOS en un solo filtro y aplica la codificación de scrub una vez al resultado unido. Una sola codificación significa que las uniones no pueden desfasarse, porque no hay nada que emparejar:

```
ffmpeg -i seg1-raw.mp4 -i seg2-raw.mp4 -i seg3-raw.mp4 -filter_complex "[0:v][1:v][2:v]concat=n=3:v=1:a=0[v]" -map "[v]" -c:v libx264 -crf 25 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

Define `-crf` según la bifurcación de compresión de arriba: 18 como punto de partida normal, valores más fuertes (más una reducción de tamaño) para metraje cargado de partículas o textura, más suaves para metraje con muchos degradados. El `-crf 25` del ejemplo muestra el valor para metraje cargado.

**Respaldo cuando no hay crudos disponibles:** codifica cada segmento con parámetros IDÉNTICOS (la codificación de scrub de arriba: mismo códec, resolución, frame rate, formato de píxel, `-g 8`), y luego concatena sin pérdida con el demuxer concat:

`concat-list.txt`:
```
file 'seg1-scrub.mp4'
file 'seg2-scrub.mp4'
file 'seg3-scrub.mp4'
```

```
ffmpeg -f concat -safe 0 -i concat-list.txt -c copy assets/hero-scrub.mp4
```

Si una unión con el demuxer falla al reproducirse, los parámetros de los segmentos no eran realmente idénticos: vuelve a correr la codificación de scrub en cada segmento desde su crudo con el mismo comando exacto, y concatena otra vez. No tapes una unión fallida recodificando el archivo concatenado a menor calidad. Y si todavía tienes los crudos, usa el camino de una sola codificación; hace imposible todo este tipo de falla.

## El rescate con fundido (cuando una unión encadenada se nota)

Cuando una cadena ya generada muestra un corte visible en una unión aunque el movimiento continúe (normalmente textura re-imaginada en la costura; la ley de la costura está en `prompt-laws.md`), reemplaza la concatenación seca por un fundido corto en cada unión usando `xfade`. Un cuarto de segundo es el punto de partida probado. Un visitante que hace scroll lo lee como que la superficie cambia, no como un corte.

El offset es la duración de la primera entrada menos la duración del fundido. Dos segmentos de 6 segundos con un fundido de 0.25 segundos:

```
ffmpeg -i seg1-raw.mp4 -i seg2-raw.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.25:offset=5.75[v]" -map "[v]" -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

Para tres segmentos, encadena los xfade. Cada offset posterior es la duración unida hasta ese momento menos el fundido (6 + 6 - 0.25 - 0.25 = 11.5):

```
ffmpeg -i seg1-raw.mp4 -i seg2-raw.mp4 -i seg3-raw.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.25:offset=5.75[a];[a][2:v]xfade=transition=fade:duration=0.25:offset=11.5[v]" -map "[v]" -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

Define `-crf` y cualquier reducción de tamaño según la bifurcación de compresión de arriba. Sigue siendo una sola codificación, así que las uniones no pueden desfasarse. Cada fundido recorta el total en su duración; la página no lo nota, porque todo funciona con progreso, no con segundos. Verifica haciendo scrub de ida y vuelta sobre cada unión, no mirándolo a velocidad normal. Un sitio con scroll se lee a velocidad de scrub, y ahí es donde una costura se nota o desaparece.

## Tamaño de imágenes para web

Redimensiona las imágenes de apoyo a unos 1920px de ancho con UNA pasada limpia de compresión. Muchos hosts recomprimen las imágenes del lado del servidor, así que súbelas grandes y limpias y deja que la pasada del host sea el único paso con pérdida (los videos pasan por los hosts sin tocarse):

```
ffmpeg -i raw-still.png -vf scale=1920:-2 -q:v 2 assets/section-name.jpg
```

`-q:v 2` es calidad JPEG casi transparente. `-2` mantiene par la altura, algo que algunos codificadores exigen. Las capturas de pantalla y otras imágenes de interfaz con bordes nítidos se quedan en PNG o WebP sin pérdida; la pasada a JPEG es para imágenes fotográficas.

## Verifica después de cada codificación

Reproduce o extrae frames del resultado antes de usarlo. Una falla silenciosa de codificación detectada ahora es gratis; detectada después de publicar es una re-publicación.

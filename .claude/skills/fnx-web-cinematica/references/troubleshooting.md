> **Adaptación FNX.** Referencia de la skill `fnx-web-cinematica`. En fnxestudio.com valen además `CLAUDE.md`, `AGENTS.md` y `docs/traspaso-claude-code.md`; si algo de acá choca con esas reglas, ganan ellas.

# Solución de problemas: síntoma → causa → arreglo

Cada entrada ocurrió en una construcción real. Revisa aquí antes de inventar un diagnóstico.

## Generación

| Síntoma | Causa | Arreglo |
|---|---|---|
| El generador sugiere un preset en lugar de generar | Relacionó tu prompt con un estilo de la casa | Recházalo y vuelve a intentar con tu prompt literal; tu toma diseñada le gana a un estilo de la casa |
| Aparece un logo o una marca real en la imagen generada | La IA coló una marca registrada | Arréglalo con una edición de imagen barata antes de animar; nunca animes un frame con una marca registrada |
| La transformación "parece dos videos separados" | La trayectoria se rompió en el cambio | Un vector ininterrumpido a través de la transición (misma dirección, posición, velocidad), o mejor, elige un concepto de un solo sujeto |
| El sujeto se ve congelado o sin vida | El prompt lo sobreestabilizó para proteger la trayectoria | Fija la trayectoria, libera el cuerpo: mantén la trayectoria rígida pero exige movimiento natural en el sujeto y vida ambiental en la escena |
| Un cruce de límite (entrar al agua, atravesar un vidrio) se ve falso | El paso fue demasiado limpio | Escribe en el prompt el momento físico de la lente: salpicadura, gotas en la lente, un instante de desenfoque |
| El producto del hero se lee como un provisorio | Objeto genérico sin marca a distancia | Aplica la marca con edición de imagen antes de animar, o escribe el final para que llegue lo bastante cerca como para que el diseño lo sostenga |
| Tres videos fallidos con un mismo concepto | Problema de concepto, no de prompt | Deja de iterar el prompt y cambia el concepto; las leyes predicen qué conceptos salen bien al primer intento |
| La toma es fuerte pero el final no reposa (el sujeto vuelve a moverse cerca del final) | El modelo se pasó de la llegada compuesta y siguió animando | No vuelvas a generar primero. Recorta el crudo en el último frame estable y codifica para scrub en una sola pasada (receta en `ffmpeg-recipes.md`); la página funciona con progreso, no con segundos, así que un clip más corto no cuesta nada |
| El recorrido encadenado falla en una unión de segmentos | Los parámetros de codificación de los segmentos no eran idénticos, o el vector de movimiento se rompió entre segmentos | Recodifica cada segmento con el mismo comando de scrub exacto y vuelve a concatenar; si el movimiento en sí salta, el prompt del siguiente segmento no continuó la dirección y la velocidad del anterior |
| Un corte visible donde se juntan dos segmentos encadenados, aunque el movimiento continúa | Cada generación re-imagina la textura fina a partir de su frame inicial, así que una unión de reposo a reposo sobre una textura específica (tejido, grano, piel) se ve como un corte | La próxima vez, haz el storyboard de cada costura dentro del movimiento o de un momento de refresco de textura (la ley de la costura en `prompt-laws.md`); para la cadena que ya tienes, usa la unión con fundido de `ffmpeg-recipes.md` |
| Un trabajo vuelve marcado como nsfw en una toma abstracta inocente | El filtro de seguridad malinterpretó un lenguaje sensorial abstracto (formas brillantes, líquido que fluye alrededor de una forma) | Verifica primero el saldo: los trabajos marcados no se cobran. Luego vuelve a generar desde el mismo frame inicial con el prompt reescrito en palabras simples de fotografía comercial de producto: nombra el producto al principio, describe objetos y no sensaciones, mantén el mismo diseño de toma |

## El hero con scroll

| Síntoma | Causa | Arreglo |
|---|---|---|
| El scrub no hace nada en el sitio en vivo pero funciona en local | El host no tiene soporte de descarga parcial (Range), así que los saltos se quedan en cero | Descarga el video como Blob y reproduce la URL del objeto (ver `scrub-pipeline.md`); funciona en todos lados |
| El scroll se siente a los tirones en la parte superior e inferior del hero, peor en Chrome | Saltos sin control que se acumulan más escrituras al DOM en cada frame | Control de saltos y escrituras solo con cambios (ver `scrub-pipeline.md`) |
| Sigue a los tirones después del control de saltos y de escrituras | El intervalo de keyframes del video es demasiado largo | Recodifica con `-g 8 -keyint_min 8` (ver `ffmpeg-recipes.md`) |
| El scrub se congela para siempre a mitad del scroll | La bandera de salto ocupado quedó bloqueada (un salto dio error y nunca disparó `seeked`) | Resetea la bandera y limpia el objetivo pendiente en el handler de `error` del video; el patrón a prueba de bloqueos está en `scrub-pipeline.md` |
| Los teléfonos descargan el video o el póster que nunca muestran | Póster puesto en el HTML, o la carga del video no está detrás de la condición del hero fijo | Pon el póster con JavaScript dentro del mismo camino controlado que carga el video |
| El hero fijo aparece en computadora, o el video carga en teléfonos | Las cinco condiciones difieren entre CSS y JS | Haz que las cinco media queries coincidan EXACTAMENTE en ambos (ver `scrub-pipeline.md`) |
| La página queda rota cuando el video no carga | No hay camino de error | Oculta el video muerto sobre el fondo del póster en `error`; la página tiene que estar completa sin el video |
| Las capturas del sitio en funcionamiento muestran el póster o un escenario en blanco donde debería estar el video con scrub, pero el sitio funciona en un navegador real | La capa de composición promovida del video no se compone en las capturas del navegador integrado | Verifica el comportamiento del scrub a través del DOM en lugar de los píxeles: revisa las variables `--k` de las bandas, las opacidades y transforms de las palabras, y `currentTime` en varias posiciones del scroll, o míralo en una ventana de navegador real. Una captura en blanco de una capa promovida no es un sitio roto |
| La página se ve completamente muerta en la vista previa: el póster nunca se pone, cada banda de texto en opacidad 0, el video nunca salta, y el panel indica que está oculto | Un panel de vista previa oculto o no mostrado deja de componer, así que `requestAnimationFrame` nunca se dispara. Todo en el hero con scroll lo maneja ese bucle, así que el DOM también se congela. El consejo de revisar el DOM de la fila de arriba no sirve aquí, porque el propio DOM está congelado | Deja de usar el panel y maneja en modo headless el propio Chrome instalado en la máquina; la receta completa está justo debajo de esta tabla |
| El hero queda en blanco (sin póster, sin textos) después de rotar el dispositivo o redimensionar la ventana | JS decidió fijo o scrub una sola vez al cargar mientras las condiciones de CSS seguían vivas | Activa y desactiva el scrub con listeners de cambio en las cinco condiciones; el patrón de condición en vivo está en `scrub-pipeline.md` |
| Hacer doble clic en `index.html` muestra el hero fijo y el video nunca carga | Los navegadores bloquean `fetch` en URLs file://, así que el cargador Blob cae al respaldo por diseño | Ese estado es el respaldo diseñado y tiene que verse completo. Para la vista previa completa con scrub, sirve la carpeta con cualquier comando de una línea (`npx http-server`, `python -m http.server`) y abre localhost; el host en vivo sirve el scrub normalmente |

### La receta de Chrome headless (cuando el panel de vista previa está muerto)

Cuando el propio panel de vista previa está oculto o roto, verifica a través del Chrome instalado en la máquina, manejado en modo headless por el protocolo DevTools (el canal de control remoto que trae cada Chrome). No necesita instalaciones ni paquetes:

1. Lanza Chrome con `--headless=new --disable-gpu --remote-debugging-port=9222 --user-data-dir=<a temp folder> --hide-scrollbars`.
2. Desde Node (la versión 22 en adelante trae un WebSocket global, así que esto no necesita dependencias): haz GET a `http://127.0.0.1:9222/json/list`, toma el `webSocketDebuggerUrl` del objetivo y conéctate a él.
3. Por ese socket, maneja la página con comandos del protocolo: `Page.navigate`, `Page.captureScreenshot`, `Runtime.evaluate`, `Emulation.setDeviceMetricsOverride`, `Emulation.setTouchEmulationEnabled`, `Emulation.setEmulatedMedia`, `Network.setBlockedURLs` e `Input.dispatchMouseEvent`.

Un detalle: `Emulation.setTouchEmulationEnabled` rechaza un `maxTouchPoints` de 0. Envía siempre 5 y controla el comportamiento con la bandera `enabled`.

Más allá del rescate, este camino hace posibles las comprobaciones genuinas de la autoprueba (emulación táctil real, cambios de media en vivo, bloqueo de URL, clics reales del mouse); están listadas con el checklist en `scrub-pipeline.md`.

## La página

| Síntoma | Causa | Arreglo |
|---|---|---|
| Una animación de entrada nunca se reproduce, el elemento simplemente aparece | Una regla posterior le ganó en la cascada al estado inicial de la animación | Prefija los estados inicial y final con la clase del contenedor (`.card .part`, `.card.in .part`) y comprueba que cada entrada se reproduzca |
| Los hovers del 2º y 3º ítem de una grilla escalonada responden tarde incluso después de que terminó la entrada | La regla de limpieza que pone en cero el `transition-delay` escalonado tiene menor especificidad que las reglas de delay nth-child que retira (`:nth-child` cuenta como una clase), así que en silencio nunca se aplica | Haz que el selector de limpieza iguale o supere a las reglas de delay (repite el nth-child en él) o pon `!important` al delay de `0s`, y compruébalo haciendo hover sobre los hermanos posteriores |
| Un estilo manejado por el scroll deja de responder después de su entrada | `animation-fill-mode: forwards` lo sobrescribe para siempre | Animación de entrada en el padre, estilo dinámico en un hijo |
| Un bucle de fondo parpadea o salta cuando empieza | Delay positivo en la animación | Delays negativos (como `-1.2s`) para que cada bucle esté a mitad de ciclo en el primer pintado |
| Se cortan las colas de las letras (g, y, p) | Texto enmascarado o recortado sin espacio para respirar | Padding en em con márgenes negativos equivalentes en la máscara (ver `scrub-pipeline.md`) |
| La página se puede arrastrar o desplazar de costado | `overflow-x: hidden` solo, o una decoración que sobresale del borde | `overflow-x: clip` en `html` Y en `body`, con `hidden` primero como respaldo |
| Los hovers empiezan a saltar después de que corre un script | JavaScript sobrescribió `el.style.transition` | Alterna una clase que declare la transición combinada completa |
| Un elemento en móvil queda fuera de pantalla con movimiento reducido activado | Un `transform: none !important` general borró su transform de posición | Vuelve a aplicar los transforms de posición por breakpoint dentro del bloque de movimiento reducido |
| Una marquesina muestra un hueco en el punto de bucle | La pista es más corta que la pantalla más ancha soportada | Duplica los ítems hasta que cada pista supere unos 2560px |
| Las animaciones corren mientras la pestaña está oculta o la sección está fuera de pantalla | Bucles libres | Limita las reglas de animación a una clase que alterna un IntersectionObserver; en `visibilitychange` alterna una clase del body con `body.paused *, body.paused *::before, body.paused *::after { animation-play-state: paused !important }`; los bucles rAF descansan cuando convergen |
| Una pausa escrita en un contenedor nunca pausa realmente las animaciones de adentro | `animation-play-state` no es una propiedad heredada, así que un valor puesto en un padre (o `inherit` en una regla anidada) nunca llega a los elementos anidados ni a los pseudo-elementos | El patrón de clase del body de arriba; alcanza directamente a cada elemento y pseudo-elemento |

## Publicación

En fnxestudio.com: si el sitio no muestra el cambio, revisá que Lovable haya tomado el último commit de `main` y que se haya publicado; después recarga forzada.

| Síntoma | Causa | Arreglo |
|---|---|---|
| El sitio en vivo muestra un 404 | Se publicó desde la carpeta de arriba, así que `index.html` quedó un nivel más abajo | Publica desde DENTRO de la carpeta de publicación, donde están `index.html` y `assets/` |
| Las imágenes se ven blandas en el sitio en vivo pero nítidas en local | El host redimensiona y recomprime las imágenes del lado del servidor | Súbelas más grandes y limpias (unos 1920px de ancho, una pasada de alta calidad) para que la pasada del host sea el único paso con pérdida |
| Las vistas previas de links no muestran imagen o muestran la URL equivocada | Las etiquetas og todavía tienen el provisorio | Actualiza `og:image` y `og:url` con la URL absoluta en vivo en el comentario `<!-- DEPLOY STEP -->` y vuelve a publicar |
| El sitio en vivo sigue mostrando la versión vieja después de volver a publicar | Caché | Recarga forzada, o verifica contra un texto que sepas que cambió |
| Aparecen videos crudos o archivos de revisión en el sitio en vivo | Estaban dentro de la carpeta de publicación cuando se publicó | Mantén los crudos y las copias de revisión FUERA de la carpeta de publicación, siempre |
| Los caracteres especiales se vuelven símbolos raros después de un buscar y reemplazar por script (las flechas y los ordinales se convierten en mojibake) | Un comando de shell leyó el archivo UTF-8 con la codificación por defecto equivocada y escribió el daño de vuelta | Nunca actualices archivos del sitio con lectura y escritura simple de shell: usa la herramienta de edición para el ajuste de og y cualquier cambio de texto, o lee y escribe con UTF-8 explícito. Recuperación si ya ocurrió: lee el archivo dañado como UTF-8, codifica ese texto a bytes Windows-1252, decodifica esos bytes como UTF-8, guarda como UTF-8, verifica los caracteres, vuelve a publicar |

## Configuración

Vercel y GoDaddy aplican a webs de clientes que se publiquen ahí; fnxestudio.com se publica con Lovable (ver `deploy.md`).

| Síntoma | Causa | Arreglo |
|---|---|---|
| `npx vercel login` no abre el navegador | El entorno no pudo lanzar el navegador | La CLI muestra un link en la terminal: pásaselo al usuario para que lo abra él, y confirma después con `npx vercel whoami` |
| El sitio se ve congelado o roto en el panel de vista previa lateral de la app | El panel integrado tiene problemas con las páginas de video con scroll | Abre el link de localhost en un navegador real; esa es la vista previa real |
| Los comandos de Vercel fallan en Windows | `npx` en lugar de `npx.cmd` | Windows usa `npx.cmd vercel ...` |
| El inicio de sesión de Vercel parece no llevar a ningún lado | La autorización se abrió en un navegador distinto al que el usuario usa normalmente | Avísale de antemano y haz que revise sus otros navegadores |
| Vercel sigue mostrando el dominio como inválido mucho después de cargar el DNS | Quedó el registro A "Parked" de GoDaddy, o un valor mal pegado, o un registro AAAA que apunta a otro lado | Revisa con el usuario la pantalla de DNS de GoDaddy: un solo registro A en `@` con el valor de Vercel, el CNAME `www` con el valor de Vercel, ningún AAAA en `@`. Si todo está bien y sigue trabado, quita el dominio del proyecto y vuelve a agregarlo |
| El dominio abre la página de "estacionado" de GoDaddy | El DNS todavía no se propagó, o el registro Parked sigue ahí | Espera unos minutos y recarga forzada; si persiste, borra el registro Parked en GoDaddy |
| Alguien sugiere cambiar los servidores de nombres de GoDaddy | No hace falta y rompe el correo que tenga el usuario en GoDaddy | Usa solo los registros A y CNAME; no toques nameservers ni MX |
| Faltan las herramientas de Higgsfield justo después de conectar | Un conector recién agregado a veces carga recién en el siguiente arranque de la app | Cierra Claude Code por completo, vuelve a abrirlo, vuelve al mismo chat y verifica de nuevo |
| El conector de Higgsfield indica que necesita autenticación | El inicio de sesión no se completó al agregarlo | Termínalo en el panel de conectores: el navegador se abre en Higgsfield para autorizar una vez, y luego vuelve a verificar con una consulta de saldo |
| Las herramientas de Higgsfield están pero las llamadas fallan | Conector agregado pero no autorizado, o sin créditos | Vuelve a correr el flujo de inicio de sesión; verifica con una consulta de saldo, que debería devolver números reales |
| El usuario dice que un paso de configuración está listo pero el siguiente paso falla | Se tomó "listo" como verificación | Nunca lo es; vuelve a revisar el sistema tú mismo después de cada paso antes de avanzar |
| ffmpeg o Node.js no se instalan en una Mac | Homebrew no está instalado, así que los comandos brew no pueden correr, y la seguridad de macOS muchas veces bloquea un binario descargado | Haz que el usuario instale Homebrew primero: el único comando de brew.sh, pegado en Terminal, que le pide la contraseña de su Mac. Luego vuelve a correr las instalaciones y verifica |
| Claude se salta el checklist de configuración y salta directo a preguntas de marca o diseño | El zip de la skill nunca se extrajo ni se leyó completo (común cuando el zip se arrastró al chat: la carpeta del proyecto queda vacía y los archivos de la skill nunca entraron a la conversación) | Extrae el zip en el espacio de trabajo del proyecto, lee SKILL.md y cada referencia de principio a fin, y vuelve a empezar en la Fase 1. El mensaje del checklist es siempre lo primero que ve el usuario |
| Los comandos de Vercel piden iniciar sesión otra vez a mitad de una sesión larga | La sesión de la CLI expiró | Vuelve a correr `npx vercel login` una vez. Los archivos y el sitio en vivo nunca se ven afectados |

**La regla de los dos cuelgues (la regla del subsistema, para cualquier herramienta):** un segundo cuelgue consecutivo en la misma herramienta o subsistema significa que está caído. Deja de reintentar, nómbralo en voz alta y reinicia. Nunca hagas una tercera llamada a un subsistema colgado. Esto es distinto de un render lento: un trabajo que reporta progreso está funcionando, tarde lo que tarde; una llamada que se cuelga sin ninguna respuesta es la que cubre esta regla.

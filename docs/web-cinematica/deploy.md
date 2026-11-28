> **Adaptación FNX.** Referencia de la skill `fnx-web-cinematica`. En fnxestudio.com valen además `CLAUDE.md`, `AGENTS.md` y `docs/traspaso-claude-code.md`; si algo de acá choca con esas reglas, ganan ellas.

# Publicación

Hay dos casos: la web de FNX, que se publica con Lovable, y las webs de clientes, que van donde se acuerde con cada cliente (Lovable, Vercel con un dominio propio, u otro hosting).

## Antes de gastar: la charla de costos honestos
Siempre antes de que se mueva la plata:
- **Generación con IA:**
  - Consultá el precio exacto de cada imagen y cada video antes de generar; los conectores suelen tener una consulta gratis, como `get_cost`.
  - Presentá el total en palabras simples: imagen, video según el modelo, e imágenes de apoyo.
  - Si hay que elegir modelo, mostrá los números reales y recomendá uno.
- **Hosting y dominio:**
  - **fnxestudio.com:** ya están resueltos con Lovable y el dominio de FNX.
  - **Webs de clientes:** el dominio es un pago anual y la renovación suele salir más cara que el primer año. El hosting depende de lo elegido. El plan gratis de Vercel es para uso personal y no comercial, así que una web de un cliente que paga va en un plan pago; revisá precios y condiciones vigentes en la web de cada proveedor.

## Caso FNX: fnxestudio.com con Lovable
1. **Rama de trabajo:** nunca se edita `main` directo. Creá una rama, construí ahí y verificá con `npx tsc --noEmit`, `npx vitest run` y `npx eslint` sobre los archivos tocados.
2. **Vista previa:** corré `npx vite dev --host 127.0.0.1 --port 5173` y sacá capturas a 390 px y en computadora. Mandáselas a Nadin y esperá su "publicalo".
3. **Subir:** con el OK, hacé fast-forward de la rama a `main` y subí sin forzar (`git push origin main`). Nunca reescribas historia publicada.
4. **Esperar a Lovable:** el commit aparece en uno o dos minutos. Confirmá que el último commit del proyecto coincide con el tuyo.
5. **Publicar:** botón **Publish** en Lovable, o la herramienta de deploy del conector de Lovable si está disponible.
6. **Verificar en vivo:**
   - Abrí la página publicada y buscá un texto que sepas que cambió.
   - Pedí directamente la URL de cada recurso nuevo (video, frames, texturas).
   - Revisá que la consola no tenga errores.
7. **Velocidad:** medí con PageSpeed Insights en celular y comparalo con la medición anterior. Solo mediciones reales.
8. **Prueba de Nadin:** que la mire en su propio celular, con su red.

## Caso cliente: Vercel con dominio propio
Si el cliente lo elige, el flujo probado es:
1. **Conectar Vercel:** `npx vercel login`, una sola vez. La persona inicia sesión en el navegador; confirmá con `npx vercel whoami`.
2. **Definir la dirección:** el dominio del cliente o una dirección gratis `nombre.vercel.app` para empezar.
   - Actualizá `og:image` y `og:url` con la URL absoluta. Usá la herramienta de edición, nunca un reemplazo por shell que pueda romper los acentos.
3. **Publicar desde DENTRO de la carpeta de publicación:** `npx vercel deploy --prod --yes --name nombre-del-proyecto`.
4. **Conectar el dominio:**
   - Agregalo con `npx vercel domains add dominio.com` (y `www.dominio.com`).
   - Leé los registros exactos con `npx vercel domains inspect dominio.com` y guiá al cliente para cargarlos en su proveedor de dominio.
   - En esos registros: borrar el registro A "estacionado", cargar el A en `@` y el CNAME en `www`, y no tocar servidores de nombres ni MX.
   - Verificá hasta que figure como válido. El candado HTTPS llega solo unos minutos después.
5. **Verificar, medir y probar:** igual que en el caso FNX.

## Iterar es barato
Cada cambio es: rama, vista previa, OK, publicar, verificar. Después de publicar, si el sitio muestra la versión vieja, es caché: hacé una recarga forzada o revisá un texto que sepas que cambió.

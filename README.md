# Feedback Audio

Aplicación web estática para grabar notas de voz desde el navegador y enviarlas a un alumno mediante un enlace personalizado.

🌐 **Aplicación:** https://ikeraranabirt.github.io/feedback-audio/

La interfaz está disponible en **euskera** (EUS) y **castellano** (ES). El idioma elegido también es el de la página que verá el alumno.

---

## Cómo se usa

1. *(Opcional)* Escribe el nombre del profesor, el del alumno y el módulo.
2. Pulsa **Grabar**, concede permiso al micrófono y graba el mensaje. Pulsa **Detener** al terminar y escucha la vista previa.
3. Pulsa **Subir audio**. Si la subida es correcta, se habilitan los botones de resultado.
4. Pulsa **Ver resultado** para abrir la página tal y como la verá el alumno, o **Copiar enlace para el alumno** para enviarlo por correo, mensaje o plataforma educativa.
5. Si necesitas grabar otro audio, pulsa **Reiniciar y grabar otro audio**: se vacían el formulario y la grabación.

Si cambias los datos del formulario después de subir el audio, el enlace se actualiza automáticamente. Al empezar una nueva grabación, el enlace anterior se desactiva.

---

## Qué ve el alumno

La página [`audio.html`](audio.html) muestra un reproductor con la nota de voz y, según los datos introducidos:

| Datos rellenados | Contenido de la página |
|---|---|
| Alumno | Saludo con su nombre |
| Profesor (y módulo) | Mensaje del profesor, con el módulo si se ha indicado |
| Ninguno | Solo el reproductor |

---

## Funcionamiento técnico

No hay servidor ni paso de compilación: son archivos HTML, CSS y JavaScript que se sirven tal cual (por ejemplo, con GitHub Pages).

1. [`js/recorder.js`](js/recorder.js) graba con `MediaRecorder` y sube el audio a [Cloudinary](https://cloudinary.com/) mediante una subida sin firmar (`upload_preset`). Cloudinary devuelve la URL del audio.
2. [`js/generator.js`](js/generator.js) construye el enlace a `audio.html` con los parámetros de la URL: `audioUrl`, `lang` y, si se han rellenado, `nombre`, `alumno` y `modulo`.
3. [`js/audio.js`](js/audio.js) lee esos parámetros, muestra los textos correspondientes y carga el audio en un reproductor `<audio>`. Solo acepta URLs `https` de `res.cloudinary.com` de la cuenta configurada.

El audio no se guarda en el repositorio: vive en Cloudinary y el enlace contiene su URL.

### Estructura

```text
├── index.html        # Interfaz del profesor: formulario, grabador y resultado
├── audio.html        # Página que abre el alumno
├── css/styles.css    # Estilos
└── js/
    ├── i18n.js       # Traducciones EUS/ES y función aplicarIdioma()
    ├── recorder.js   # Grabación y subida a Cloudinary
    ├── generator.js  # Generación del enlace, copiar, ver resultado y reiniciar
    └── audio.js      # Lógica de la página del alumno
```

---

## Configuración

Los valores de Cloudinary están en [`js/recorder.js`](js/recorder.js):

```js
const CLOUD_NAME = "jvgd0byu";
const UPLOAD_PRESET = "ahots-oharrak";
```

Si usas tu propia cuenta:

1. Crea en Cloudinary un *upload preset* de tipo **unsigned**.
2. Cambia `CLOUD_NAME` y `UPLOAD_PRESET` en `js/recorder.js`.
3. Actualiza la ruta `/<cloud_name>/video/upload/` que valida [`js/audio.js`](js/audio.js).

## Ejecución en local

El acceso al micrófono requiere `https` o `localhost`. Sirve la carpeta con cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8000
```

y abre http://localhost:8000.

## Añadir un idioma o un texto

Todos los textos están en [`js/i18n.js`](js/i18n.js). Los elementos HTML usan `data-i18n` (texto) o `data-i18n-placeholder`. Para añadir un texto, define la misma clave en `eu` y `es`.

## Limitaciones

- Cualquiera que tenga el enlace puede escuchar el audio.
- El navegador debe soportar `MediaRecorder` y se debe conceder permiso al micrófono.
- Los datos personales viajan en la URL del enlace, no se guardan en ningún servidor propio.

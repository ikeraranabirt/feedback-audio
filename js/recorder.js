const grabar =
  document.getElementById("grabar");

const detener =
  document.getElementById("detener");

const estadoGrabacion =
  document.getElementById("estadoGrabacion");

const audioPreview =
  document.getElementById("audioPreview");

const subirAudio =
  document.getElementById("subirAudio");

const CLOUD_NAME = "jvgd0byu";

const UPLOAD_PRESET = "ahots-oharrak";

let mediaRecorder = null;

let streamActual = null;

let fragmentosAudio = [];

let previewUrl = null;


/*
 * Guardamos aquí el Blob de la grabación.
 *
 * Más adelante utilizaremos esta variable
 * para subir el audio a Cloudinary.
 */
window.audioGrabadoBlob = null;


/**
 * Inicia una nueva grabación.
 */
async function iniciarGrabacion() {

  try {

    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia ||
      !window.MediaRecorder
    ) {

      estadoGrabacion.textContent =
        "Nabigatzaileak ezin du audioa grabatu.";

      return;
    }


    /*
     * Pedimos permiso para utilizar
     * el micrófono.
     */
    streamActual =
      await navigator.mediaDevices.getUserMedia({
        audio: true
      });


    /*
     * Limpiamos cualquier grabación anterior.
     */
    fragmentosAudio = [];

    window.audioGrabadoBlob = null;


    if (previewUrl) {

      URL.revokeObjectURL(
        previewUrl
      );

      previewUrl = null;
    }


    audioPreview.hidden =
      true;

    audioPreview.removeAttribute(
      "src"
    );


    /*
     * Creamos la grabadora utilizando
     * el stream del micrófono.
     */
    mediaRecorder =
      new MediaRecorder(
        streamActual
      );


    /*
     * Cada fragmento generado por
     * MediaRecorder se almacena aquí.
     */
    mediaRecorder.addEventListener(
      "dataavailable",
      function (event) {

        if (event.data.size > 0) {

          fragmentosAudio.push(
            event.data
          );

        }

      }
    );


    /*
     * Cuando detenemos la grabación,
     * construimos un Blob de audio.
     */
    mediaRecorder.addEventListener(
      "stop",
      function () {

        const mimeType =
          mediaRecorder.mimeType ||
          "audio/webm";


        window.audioGrabadoBlob =
          new Blob(
            fragmentosAudio,
            {
              type: mimeType
            }
          );


        previewUrl =
          URL.createObjectURL(
            window.audioGrabadoBlob
          );


        audioPreview.src =
          previewUrl;

        audioPreview.hidden =
          false;
        subirAudio.disabled = false;

        estadoGrabacion.textContent =
          "Grabazioa amaitu da. Entzun dezakezu.";

        

        /*
         * Liberamos el micrófono.
         */
        streamActual
          .getTracks()
          .forEach(
            track => track.stop()
          );


        streamActual = null;

      }
    );


    mediaRecorder.start();


    grabar.disabled =
      true;

    detener.disabled =
      false;


    estadoGrabacion.textContent =
      "🔴 Grabatzen...";

  } catch (error) {

    console.error(
      "Errorea audioa grabatzean:",
      error
    );


    estadoGrabacion.textContent =
      "Ezin izan da mikrofonoa erabili.";


    grabar.disabled =
      false;

    detener.disabled =
      true;


    if (streamActual) {

      streamActual
        .getTracks()
        .forEach(
          track => track.stop()
        );

      streamActual = null;

    }

  }

}


/**
 * Detiene la grabación actual.
 */
function detenerGrabacion() {

  if (
    !mediaRecorder ||
    mediaRecorder.state !== "recording"
  ) {

    return;
  }


  mediaRecorder.stop();


  grabar.disabled =
    false;

  detener.disabled =
    true;

}


/*
 * Eventos de los botones.
 */
grabar.addEventListener(
  "click",
  iniciarGrabacion
);


detener.addEventListener(
  "click",
  detenerGrabacion
);

async function subirGrabacion() {

  if (!window.audioGrabadoBlob) {
    return;
  }


  subirAudio.disabled =
    true;


  estadoGrabacion.textContent =
    "Audioa igotzen...";


  const formData =
    new FormData();


  formData.append(
    "file",
    window.audioGrabadoBlob
  );


  formData.append(
    "upload_preset",
    UPLOAD_PRESET
  );


  try {

    const response =
      await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData
        }
      );


    if (!response.ok) {

      throw new Error(
        "Errorea Cloudinary-ra igotzean"
      );

    }


    const data =
      await response.json();


    window.audioUrl =
      data.secure_url;


    console.log(
      "Audioaren URL:",
      window.audioUrl
    );


    estadoGrabacion.textContent =
      "✅ Audioa behar bezala igo da.";

  } catch (error) {

    console.error(
      error
    );


    estadoGrabacion.textContent =
      "❌ Ezin izan da audioa igo.";


    subirAudio.disabled =
      false;

  }

}


subirAudio.addEventListener(
  "click",
  subirGrabacion
);
const translations = {

  eu: {

    generatorTitle:
      "Ahots-ohar sortzailea",

    generatorIntro:
      "Sartu datuak, grabatu audioa eta igo.",

    teacherName:
      "Irakaslearen izena",

    teacherPlaceholder:
      "Adib. Iker",

    studentName:
      "Ikaslearen izena",

    studentPlaceholder:
      "Adib. Ane",

    module:
      "Modulua",

    modulePlaceholder:
      "Adib. DWEC",

    recorderTitle:
      "Ahots-oharra grabatu",

    record:
      "🎙 Grabatu",

    stop:
      "⏹ Gelditu",

    uploadAudio:
      "☁ Audioa igo",

    statusReady:
      "Grabatzeko prest.",

    statusRecording:
      "🔴 Grabatzen...",

    statusRecorded:
      "Grabazioa amaitu da. Entzun dezakezu.",

    statusUploading:
      "Audioa igotzen...",

    statusUploaded:
      "✅ Audioa behar bezala igo da.",

    statusUploadError:
      "❌ Ezin izan da audioa igo.",

    statusUnsupported:
      "Nabigatzaileak ezin du audioa grabatu.",

    statusMicError:
      "Ezin izan da mikrofonoa erabili.",

    resultTitle:
      "Emaitza",

    resultHelp:
      "Audioa igo ondoren, emaitza egiaztatu edo ikaslearentzako esteka kopiatu ahal izango duzu.",

    viewResult:
      "Emaitza ikusi",

    copyStudentLink:
      "Ikaslearentzako esteka kopiatu",

    copied:
      "Esteka arbelean kopiatu da.",

    reset:
      "Berrezarri eta beste audio bat grabatu",

    greeting:
      alumno => `Kaixo ${alumno}:`,

    teacherMessage:
      (nombre, modulo) =>
        `${nombre}, zure ${modulo} irakaslea ahots-ohar bat bidali dizu...`,

    teacherMessageNoModule:
      nombre =>
        `${nombre}, zure irakaslea ahots-ohar bat bidali dizu...`,

    listenHere:
      "Entzun hemen.",

    audioError:
      "Ezin izan da audioa aurkitu."

  },


  es: {

    generatorTitle:
      "Generador de notas de voz",

    generatorIntro:
      "Introduce los datos, graba el audio y súbelo.",

    teacherName:
      "Nombre del profesor",

    teacherPlaceholder:
      "Ej. Iker",

    studentName:
      "Nombre del alumno",

    studentPlaceholder:
      "Ej. Ane",

    module:
      "Módulo",

    modulePlaceholder:
      "Ej. DWEC",

    recorderTitle:
      "Grabar nota de voz",

    record:
      "🎙 Grabar",

    stop:
      "⏹ Detener",

    uploadAudio:
      "☁ Subir audio",

    statusReady:
      "Listo para grabar.",

    statusRecording:
      "🔴 Grabando...",

    statusRecorded:
      "Grabación terminada. Puedes escucharla.",

    statusUploading:
      "Subiendo audio...",

    statusUploaded:
      "✅ Audio subido correctamente.",

    statusUploadError:
      "❌ No se ha podido subir el audio.",

    statusUnsupported:
      "El navegador no puede grabar audio.",

    statusMicError:
      "No se ha podido usar el micrófono.",

    resultTitle:
      "Resultado",

    resultHelp:
      "Tras subir el audio, podrás comprobar el resultado o copiar el enlace que enviarás al alumno.",

    viewResult:
      "Ver resultado",

    copyStudentLink:
      "Copiar enlace para el alumno",

    copied:
      "Enlace copiado al portapapeles.",

    reset:
      "Reiniciar y grabar otro audio",

    greeting:
      alumno => `Hola ${alumno}:`,

    teacherMessage:
      (nombre, modulo) =>
        `${nombre}, tu profesor de ${modulo}, te ha enviado una nota de voz...`,

    teacherMessageNoModule:
      nombre =>
        `${nombre}, tu profesor, te ha enviado una nota de voz...`,

    listenHere:
      "Escúchala aquí.",

    audioError:
      "No se ha podido encontrar el audio."

  }

};


/**
 * Traduce los elementos de una página
 * que utilicen los atributos data-i18n.
 */
function aplicarIdioma(lang) {

  const idioma =
    translations[lang] ? lang : "eu";

  document.documentElement.lang =
    idioma;

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.dataset.i18n;

      const value =
        translations[idioma][key];

      if (typeof value === "string") {
        element.textContent = value;
      }

    });


  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {

      const key =
        element.dataset.i18nPlaceholder;

      const value =
        translations[idioma][key];

      if (typeof value === "string") {
        element.placeholder = value;
      }

    });

}
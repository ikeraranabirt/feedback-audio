const translations = {

  eu: {

    generatorTitle:
      "Ahots-oharren sortzailea",

    generatorIntro:
      "Sartu datuak eta Vocaroo grabazioaren esteka.",

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

    vocarooLink:
      "Vocaroo esteka",

    generateLink:
      "Esteka sortu",

    resultTitle:
      "Emaitza",

    resultHelp:
      "Sortu esteka lehenik. Ondoren emaitza egiaztatu edo ikaslearentzako esteka kopiatu ahal izango duzu.",

    viewResult:
      "Emaitza ikusi",

    copyStudentLink:
      "Ikaslearentzako esteka kopiatu",

    copied:
      "Esteka arbelean kopiatu da.",

    invalidVocaroo:
      "Sartu baliozko Vocaroo esteka bat.",

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
      "Introduce los datos y el enlace de la grabación de Vocaroo.",

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

    vocarooLink:
      "Enlace de Vocaroo",

    generateLink:
      "Generar enlace",

    resultTitle:
      "Resultado",

    resultHelp:
      "Genera primero el enlace. Después podrás comprobar el resultado o copiar el enlace que enviarás al alumno.",

    viewResult:
      "Ver resultado",

    copyStudentLink:
      "Copiar enlace para el alumno",

    copied:
      "Enlace copiado al portapapeles.",

    invalidVocaroo:
      "Introduce un enlace válido de Vocaroo.",

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
import { I18n } from 'i18n'
import path from 'node:path'


const i18n = new I18n({
  locales: ['en', 'es'],
  directory: path.join(import.meta.dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true, //busca cambio en los ficheros json de las carpetas locales y los recarga si hay cambios
  syncFiles: true, //sincroniza la informacion de las localizaciones entre los distintos ficheros de las localizaciones
})

export default i18n
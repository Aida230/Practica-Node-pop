export function chanceLocale(req, res, next) {
  const locale = req.params.locale

  //poner una cooie en la respuesta
  res.cookie('nodepop-locale', locale, {
    maxAge: 1000 * 60 *60 * 24 * 30 // 30 days de cookie
  })
  //redirigir a la la misma página en la que estaba
  res.redirect('back')
}
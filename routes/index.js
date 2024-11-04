import { Router } from 'express'
const router = Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('header', { title: 'NODEPOP' })
})

export default router

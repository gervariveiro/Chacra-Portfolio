const {Router} = require('express');
const router = Router();


router.get('/', (request, response) => {
  response.render('nuevo_admin');
})

module.exports = router;
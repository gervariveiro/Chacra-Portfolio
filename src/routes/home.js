const {Router} = require('express');
const router = Router();


router.get('/', (request, response) => {
  response.render('home');
})

module.exports = router;
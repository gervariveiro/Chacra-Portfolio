const {Router} = require('express');
const router = Router();


router.get('/', (request, response) => {
  response.render('turismo');
})

module.exports = router;
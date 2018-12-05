var express = require('express');
var router = express.Router();

/* GET home page. */
//entra na rota /
router.get('/', function(req, res, next) {
  //acessa o arquivo index dentro da pasta view
  // passa os dados dinâmicos de title para o template ejs
  res.render('index', { title: 'World of technology' });
});

module.exports = router;

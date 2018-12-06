var express = require('express');
var router = express.Router();
var pessoas = [];
var BANCO_ARQUIVO = "/tmp/bancoArquivo.js";

/* GET home page. */
router.get('/', function(request, response, next) {
  dados = { title: 'Node.js com framework express' };
  carregarBase(function read(err, data) {
    if(err) {
      console.log(err);
      dados['pessoas'] = [];
    }
    else{
      dados['pessoas'] = JSON.parse(data);
    }

    response.render('index', dados)
  });
});

router.post('/cadastrar-pessoa', function(request, response, next) {
  carregarBase(function read(err, data) {
    if(err) {
      console.log(err);
      return;
    }

    pessoas = JSON.parse(data);

    var hash = {
      nome: request.body.nome,
      sobrenome: request.body.sobrenome,
      cpf: request.body.cpf,
      telefone: request.body.telefone,
      endereco: request.body.endereco
   }

   salvarBase(hash)
   response.render('index', { title: 'cadastrar-pessoa', pessoas: pessoas });
  });
});

// function auxiliars
var carregarBase = function(callback){
  var fs = require('fs');
  fs.readFile(BANCO_ARQUIVO, callback);
}

var salvarBase = function(hash){
  pessoas.push(hash);
  var fs = require('fs');
  fs.writeFile(BANCO_ARQUIVO, JSON.stringify(pessoas), function(err) {
    if(err) {
      console.log(err);
    }
  });
}

module.exports = router;

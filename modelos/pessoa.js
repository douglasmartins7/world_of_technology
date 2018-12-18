var App = require('../config/app')

var Pessoa = function(){
    //atributos
    this.nome = "";
    this.sobrenome = "";
    this.cpf = "";
    this.telefone = "";
    this.endereco = "";

    //metodo estatico precisa criar o objeto
    this.salvar = function(callback, cpfAlteracao){
        var nomeInstancia       = this.nome;
        var sobrenomeInstancia  = this.sobrenome;
        var cpfInstancia        = this.cpf;
        var telefoneInstancia   = this.telefone;
        var enderecoInstancia   = this.endereco;

        Pessoa.todos(function(pessoas) {
            if(pessoas == []) {
                console.log("Pessoas não encontrada na base de dados");
                //se deu tudo certo eu executo o meu callback
                callback.call();
            }
            else{
                if(cpfAlteracao == undefined){
                    var hash = {
                        nome: nomeInstancia,
                        sobrenome: sobrenomeInstancia,
                        cpf: cpfInstancia,
                        telefone: telefoneInstancia,
                        endereco: enderecoInstancia
                    }

                    pessoas.push(hash);
                    Pessoa.salvarTodos(pessoas);
                }
                else{
                    for(var i=0; i<pessoas.length; i++){
                        if(pessoas[i].cpf == cpfAlteracao){

                            pessoas[i].nome = nomeInstancia;
                            pessoas[i].sobrenome = sobrenomeInstancia;
                            pessoas[i].cpf = cpfInstancia;
                            pessoas[i].telefone = telefoneInstancia;
                            pessoas[i].endereco = enderecoInstancia;

                            Pessoa.salvarTodos(pessoas);
                            break;
                        }
                    }
                }
                callback.call();
            }
        });
    }

    this.excluir = function(callback){
        var cpfInstancia = this.cpf
        //função de callback       
        Pessoa.todos(function(pessoas) {
            if(pessoas == []) {
                console.log("Pessoas não encontrada na base de dados");
            }
            else{
                var pessoasRestantes = [];
                for(var i=0; i<pessoas.length; i++){
                    if(pessoas[i].cpf != cpfInstancia){
                        pessoasRestantes.push(pessoas[i]);
                    }
                }

               Pessoa.salvarTodos(pessoasRestantes);
               pessoas = pessoasRestantes;
            }

            callback.call(null, pessoas)
        });
    }
}

//metodo estatico ou de classe não precisa criar o objeto
Pessoa.buscar = function(cpf, callback){
    Pessoa.todos(function(pessoas) {
        if(pessoas == []) {
            console.log("Pessoa não encontrada em nossa base de dados");
            callback.call(null, null);
        }
        else{
            var pessoa = null;
            for(var i=0; i<pessoas.length; i++){
                if(pessoas[i].cpf == cpf){
                    pessoa = pessoas[i];
                    break;
                }
            }
        
            callback.call(null, pessoa);
        }
    });
}

Pessoa.buscarPorNome = function(nome, callback){
    Pessoa.todos(function(pessoas){
        if(pessoas == []) {
            console.log("Pessoa não encontrada em nossa base de dados");
            callback.call(null, pessoas);
        }
        else{
            var dadosPesquisados = [];
            if(nome == ""){
                dadosPesquisados = pessoas;
            }
            else{
                for(var i=0; i<pessoas.length; i++){
                    var reg = new RegExp(nome, "i");
                    if(pessoas[i].nome.match(reg) != null){
                        dadosPesquisados.push(pessoas[i]);
                    }
                }
        
            }
            callback.call(null, dadosPesquisados);
        }
    });
}

Pessoa.salvarTodos = function(pessoas){
  var fs = require('fs');
  fs.writeFile(App.BANCO_ARQUIVO, JSON.stringify(pessoas), function(err) {
    if(err) {
      console.log(err);
    }
  });
}

Pessoa.todos = function(callback){
    var fs = require('fs');
    fs.readFile(App.BANCO_ARQUIVO, function(err, data) {
     pessoas = [];
      if(err) {
        console.log(err);
      }
      else{
        pessoas = JSON.parse(data);
      }

      callback.call(null, pessoas);
    });
}

module.exports = Pessoa;
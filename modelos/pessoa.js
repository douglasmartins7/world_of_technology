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
        var query = "";
        if(cpfAlteracao == undefined){
            query = "insert into heroku_d8abcfe5bca8446.pessoas(cpf, nome, sobrenome, telefone, endereco)values('" + this.cpf  + "', '" + this.nome  + "' ,'" + this.sobrenome + "', '" + this.telefone  + "', '" + this.endereco + "')";
        }
        else{
            query = "update heroku_d8abcfe5bca8446.pessoas set cpf='" + this.cpf  + "', nome='" + this.nome +"', sobrenome='" + this.sobrenome +"', telefone='" + this.telefone +"', endereco='" + this.endereco +"' where cpf='" + this.cpf +"' ";
        }

        console.log(query);

        App.db.cnn.exec(query, function(dadosRetornadosDaTabela, erro) {
            if(erro){
                console.log("Erro ao executar a query (" +  query + ")");
                callback.call();
            }else{
                callback.call();
            }
        });
    }

    this.excluir = function(callback){
        var query = "delete from heroku_d8abcfe5bca8446.pessoas where cpf='" + this.cpf  + "' ";
        console.log(query);

        App.db.cnn.exec(query, function(dadosRetornadosDaTabela, erro) {
            if(erro){
                console.log("Erro ao executar a query (" +  query + ")");
                callback.call();
            }else{
                callback.call();
            }
        });
    }
}

//metodo estatico ou de classe não precisa criar o objeto
Pessoa.buscar = function(cpf, callback){
    var query = "SELECT * FROM heroku_d8abcfe5bca8446.pessoas where cpf = '" + cpf + "' ";
    App.db.cnn.exec(query, function(dadosRetornadosDaTabela, erro) {
        if(erro){
            console.log("Erro ao executar a query (" +  query + ")");
            callback.call(null, null);
        }
        else{
            if(dadosRetornadosDaTabela.length > 0){
                callback.call(null, dadosRetornadosDaTabela[0]);
            }
            else{
                callback.call(null, null);
            }
        }
    });
}

Pessoa.buscarPorNome = function(nome, callback){
    var query = "SELECT * FROM heroku_d8abcfe5bca8446.pessoas where nome like '%" + nome + "%' ";
    App.db.cnn.exec(query, function(dadosRetornadosDaTabela, erro) {
        if(erro){
            console.log("Erro ao executar a query (" +  query + ")");
            callback.call(null, []);
        }else{
            callback.call(null, dadosRetornadosDaTabela);
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
    var query = "SELECT * FROM heroku_d8abcfe5bca8446.pessoas ";
    App.db.cnn.exec(query, function(dadosRetornadosDaTabela, erro) {
        if(erro){
            console.log("Erro ao executar a query (" +  query + ")");
            callback.call(null, []);
        }else{
            callback.call(null, dadosRetornadosDaTabela);
        }
    });
}

module.exports = Pessoa;
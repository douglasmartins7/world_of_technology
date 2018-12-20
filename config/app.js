mysql = require('mysql');
//        user : passwo or void @ connection database ip or host/ database
//mysql://root:@localhost/teste
connectionString = process.env.DATABASE_URL || 'mysql://root:@localhost/teste';

db = {}
db.cnn = {};
db.cnn.exec = function(query, callback) {
    var connection = mysql.createConnection(connectionString);
    connection.query(query, function(err, rows) {
        callback(rows, err);
        connection.end();
    });
};

var App = {
    BANCO_ARQUIVO: "dados/bancoArquivo.js",
    db: db
}

module.exports = App;


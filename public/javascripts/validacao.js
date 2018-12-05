function validacao(){
    nome = $("#nome").val();
   // var sobrenome = $("#sobrenome").val();
    var cpf = $("#cpf").val();
   // var telefone = $("#telefone").val();
   // var endereco = $("#endereco").val();

    if(nome == ""){
        alert("Por favor digite seu nome")
        $("nome").focus();
        return false;
    }

    if(cpf == ""){
        alert("Por favor digite seu cpf")
        $("cpf").focus();
        return false ; 
    }

    return true
}

    
    /* seria para salvar apenas no front
    var html = "<tr id='linha-" + cpf + "' style='opacity:0.0'>";
    html += "<td>" + nome + "</td>";
    html += "<td>" + sobrenome + "</td>";
    html += "<td>" + cpf + "</td>";
    html += "<td>" + telefone + "</td>";
    html += "<td>" + endereco + "</td>";
    html += "</tr>"
    
    document.getElementById("registros").innerHTML += html;
    

    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";

    document.getElementById("formCadastro").style = "display:none";
    document.getElementById("mostraForm").style = "display:none";
    
    var index = 0;
    var interval = setInterval(function(){
        document.getElementById("linha-" + cpf).style = "opacity:0" + index
        index += 1;
        if(index += 1){
            clearInterval(interval);
        }
    }, 50)
    
function mostrarFormulario(){
    document.getElementById("mostraForm").style = "display:none";
    document.getElementById("formCadastro").style = "display:none";
}

function alterarFilho(){
    document.getElementById("registro").childNodes[2].childNodes[0].childNodes[0].innerHtml = "danilo"
}

function alterarPai(){
    document.getElementById("registros").parentNode.innerHtml += "teste"
}
*/
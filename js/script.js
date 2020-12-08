

var opcao = document.querySelector(".energia__opcao");

opcao.addEventListener("click",function(){
    var valor = document.querySelector(".energia__preco");

    if(opcao.value == "Gasolina") valor.value = 3.20;
    else
        valor.value = 1.75;

})

var botao = document.querySelector(".energia__finalizar");

botao.addEventListener("click",function(event){
    event.preventDefault();

    var escolha = document.querySelector(".energia__escolha");
     
    var pedido = montaPedido(escolha);
    
    var gasolinaPreco = document.querySelector(".tipo--gasolina p");
    var etanolPreco = document.querySelector(".tipo--etanol p");

    if(pedido.tipo == "Gasolina"){
        var erros = conferePedido(pedido,parseFloat(gasolinaPreco.textContent));
        
    }else{
        var erros = conferePedido(pedido,parseFloat(etanolPreco.textContent));
    }

    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML = "";
    
    if(erros.length > 0){
        exibeMensagemErro(erros);
        return;
    }

    
    document.querySelector(".energia__registro").classList.remove("invisible");

    if(pedido.tipo == "Gasolina"){
        gasolina.textContent -= pedido.quantidade;
    }else{
        etanol.textContent -= pedido.quantidade;
    }

    
    mudaCor(gasolina,gasolina.textContent);
    mudaCor(etanol,etanol.textContent);
    

    var total = calcularPedido(pedido.preco,pedido.quantidade);
    pedido.total = total;
    
    var resultado = document.querySelector(".energia__total p");
    var resultados = parseFloat(resultado.textContent) + total;
    resultado.textContent = resultados.toFixed(4);
    
    var table = document.querySelector(".energia__tabela");
    table.appendChild(criaTabela(pedido));

    
    var scrol = document.querySelector(".energia__pedidos");
    scrol.scrollTop = scrol.scrollHeight;
    
})

function montaPedido(pedido){
    var pedido = {
        tipo: opcao.value,
        preco: pedido.querySelector(".energia__preco").value,
        quantidade: pedido.querySelector(".energia__qtde").value,
        total: calcularPedido(pedido.preco,pedido.quantidade)
    }
    return pedido;
}

function calcularPedido(preco,quantidade){
    const total = preco*quantidade;

    return total;
}

function conferePedido(pedido,combustivel){
    var erros =[];
    
    if(combustivel < pedido.quantidade) erros.push("Quantidade maior que o estoque");

    if(pedido.quantidade <= 0) erros.push("Erro. Quantidade inválida");

    var quantidade = pedido.quantidade;
    var virgula = new RegExp(",") ;

    if(virgula.test(quantidade)) erros.push("Erro. Troque a vírgula pelo ponto final para separar");
    
    return erros;
}

function exibeMensagemErro(erros){
    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML = "";
    
    erros.forEach(erro => {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function criaTabela(pedido){
    
    var tr = document.createElement("tr");
    tr.classList.add("energia__linha");
    
    var hora = new Date();
    
    tr.appendChild(criaTd(hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds(), "pedido__hora"));
    tr.appendChild(criaTd(pedido.tipo,"pedido__tipo"));
    tr.appendChild(criaTd(pedido.quantidade,"pedido__quantidade"));
    tr.appendChild(criaTd(pedido.total,"pedido__total"));

    return tr;
}

function criaTd(valor, classe){
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = valor;
    
    return td;
}

function mudaCor(tipo, valor){
    if(valor >= 500){
        tipo.classList.remove("laranja","vermelho");
        tipo.classList.add("verde");
    }else{
        if(valor >= 100 && valor < 500  ){
            tipo.classList.remove("verde","vermelho");
            tipo.classList.add("laranja");
        }else{
            tipo.classList.remove("verde","laranja");
            tipo.classList.add("vermelha");
        }
    }
}
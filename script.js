let lojaAberta = false;

let quantidades = [0,0,0,0,0,0,0,0,0];

let precos = [
    94.99,
    57.90,
    22.90,
    23.90,
    23.90,
    25.90,
    26.90,
    12.00,
    16.00
];

let nomesCombos = [
    "Família KURXIS",
    "Duplo KURXIS",
    "Xis Salada",
    "Xis Frango",
    "Xis Calabresa",
    "Xis Calafrango",
    "Xis Fricassê de Frango",
    "Fruk 2L",
    "Coca-Cola 1,5L"
];


// HORÁRIO DA LOJA
function lojaEstaAbertaAgora(){

    const agora = new Date(
        new Date().toLocaleString("en-US", {
            timeZone:"America/Sao_Paulo"
        })
    );

    const hora = agora.getHours();

    return hora >= 19 && hora < 24;
}



// ADICIONAR PRODUTO
function adicionar(index){

    quantidades[index]++;

    document.getElementById("qtd-" + index).innerText =
        quantidades[index];

    calcularTotal();
}



// REMOVER PRODUTO
function remover(index){

    if(quantidades[index] > 0){

        quantidades[index]--;

        document.getElementById("qtd-" + index).innerText =
            quantidades[index];

        calcularTotal();

    }

}



// CALCULAR TOTAL
function calcularTotal(){

    let subtotal = 0;


    for(let i = 0; i < quantidades.length; i++){

        subtotal += quantidades[i] * precos[i];

    }


    let taxaEntrega = 0;

    const bairro = document.getElementById("bairro");


    if(bairro && bairro.value !== ""){

        taxaEntrega = parseFloat(bairro.value);

    }


    let total = subtotal + taxaEntrega;


    document.getElementById("total").innerText =
        total.toFixed(2).replace(".", ",");

}



// STATUS LOJA
function atualizarStatusLoja(){

    lojaAberta = lojaEstaAbertaAgora();

    const status = document.getElementById("status-loja");


    if(lojaAberta){

        status.className = "status aberto";

        status.innerText =
            "🟢 Aberto agora - pedidos liberados";

    }else{

        status.className = "status fechado";

        status.innerText =
            "🔴 Loja fechada • abre todos os dias das 19h às 00h";

    }

}



function toggleLoja(){

    lojaAberta = !lojaAberta;

    atualizarStatusLoja();

}



// ENVIAR PEDIDO
function enviarPedido(){


    atualizarStatusLoja();


    if(!lojaAberta){

        alert("A loja está fechada no momento. Funcionamos das 19h às 00h.");

        return;

    }



    const rua = document.getElementById("rua");

    const numero = document.getElementById("numero");

    const bairro = document.getElementById("bairro");

    const observacao = document.getElementById("observacao");



    let mensagem = "🍔 PEDIDO - KURXIS\n\n";

    let temPedido = false;

    let subtotal = 0;



    for(let i = 0; i < quantidades.length; i++){


        if(quantidades[i] > 0){


            if(i === 0){

                const sabor = document.getElementById("sabor-0");


                if(sabor.value === ""){

                    alert("Escolha o sabor do Família KURXIS.");

                    return;

                }


                mensagem +=
                    "Sabor Família: " +
                    sabor.value +
                    "\n";

            }



            if(i === 1){

                const sabor = document.getElementById("sabor-1");


                if(sabor.value === ""){

                    alert("Escolha o sabor do Duplo KURXIS.");

                    return;

                }


                mensagem +=
                    "Sabor Duplo: " +
                    sabor.value +
                    "\n";

            }



            mensagem +=
                quantidades[i] +
                "x " +
                nomesCombos[i] +
                " - R$ " +
                (quantidades[i] * precos[i])
                .toFixed(2)
                .replace(".", ",") +
                "\n\n";



            subtotal += quantidades[i] * precos[i];

            temPedido = true;

        }

    }



    if(!temPedido){

        alert("Adicione pelo menos um item ao pedido.");

        return;

    }



    if(subtotal < 25){

        alert("Pedido mínimo de R$ 25,00.");

        return;

    }



    if(rua.value.trim() === ""){

        alert("Digite o nome da rua.");

        return;

    }



    if(numero.value.trim() === ""){

        alert("Digite o número da casa.");

        return;

    }



    if(bairro.value === ""){

        alert("Selecione o bairro.");

        return;

    }



    mensagem +=
        "📍 INFORMAÇÕES\n";


    mensagem +=
        "Rua: " +
        rua.value +
        "\n";


    mensagem +=
        "Número: " +
        numero.value +
        "\n";


    mensagem +=
        "Bairro: " +
        bairro.options[bairro.selectedIndex].text +
        "\n";


    mensagem +=
        "Pagamento: Pix\n";



    if(observacao.value.trim() !== ""){

        mensagem +=
            "\n📝 OBSERVAÇÃO\n";


        mensagem +=
            observacao.value +
            "\n";

    }



    mensagem +=
        "\n💰 TOTAL: R$ " +
        document.getElementById("total").innerText;



    window.open(

        "https://wa.me/5548984401356?text=" +
        encodeURIComponent(mensagem),

        "_blank"

    );

}



// INICIALIZAÇÃO

atualizarStatusLoja();

calcularTotal();

setInterval(atualizarStatusLoja,60000);

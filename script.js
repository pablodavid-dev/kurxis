/* ============================
   CONFIGURAÇÃO INICIAL
============================ */

let lojaAberta = false;

var quantidades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var precos = [
    139,
    99,
    75,
    59,
    39,
    69,
    37,
    18,
    18,
    14
];

var nomesCombos = [
    "Super Combo Larikão",
    "Mega Combo",
    "Combo Família",
    "Combo Casal",
    "Combo Solteiro",
    "Combo 2 Xis Salada Aro 17",
    "600g Fritas com Cheddar e Bacon",
    "Pepsi 2L",
    "Coca-Cola 1,5L",
    "Caixa de Bis"
];


/* ============================
   HORÁRIO DE FUNCIONAMENTO
   TERÇA A SEXTA
   20:00 ÀS 00:00
============================ */

function lojaEstaAbertaAgora() {
    const agoraBrasilia = new Date(
        new Date().toLocaleString("en-US", {
            timeZone: "America/Sao_Paulo"
        })
    );

    const dia = agoraBrasilia.getDay();
    const hora = agoraBrasilia.getHours();

    const ehTercaASexta = dia >= 2 && dia <= 5;
    const dentroDoHorario = hora >= 20 && hora < 24;

    return ehTercaASexta && dentroDoHorario;
}


/* ============================
   CONTROLE DE QUANTIDADE
============================ */

function adicionar(index) {
    quantidades[index]++;

    document.getElementById("qtd-" + index).innerText =
        quantidades[index];

    calcularTotal();
}

function remover(index) {
    if (quantidades[index] > 0) {
        quantidades[index]--;

        document.getElementById("qtd-" + index).innerText =
            quantidades[index];

        calcularTotal();
    }
}


/* ============================
   CÁLCULO TOTAL
============================ */

function calcularTotal() {

    let subtotal = 0;

    for (let i = 0; i < quantidades.length; i++) {
        subtotal += quantidades[i] * precos[i];
    }

    let taxaEntrega = 0;

    const bairro = document.getElementById("bairro");

    if (bairro && bairro.value !== "") {
        taxaEntrega = parseFloat(bairro.value);
    }

    const total = subtotal + taxaEntrega;

    document.getElementById("total").innerText =
        total.toFixed(2);
}


/* ============================
   STATUS DA LOJA
============================ */

function atualizarStatusLoja() {

    lojaAberta = lojaEstaAbertaAgora();

    const status = document.getElementById("status-loja");

    if (lojaAberta) {
        status.className = "status aberto";
        status.innerText =
            "🟢 Aberto agora - pedidos liberados";
    } else {
        status.className = "status fechado";
        status.innerText =
            "🔴 Loja fechada • abre terça a sexta das 20h às 00h";
    }
}

function toggleLoja() {
    lojaAberta = !lojaAberta;
    atualizarStatusLoja();
}


/* ============================
   ENVIAR PEDIDO
============================ */

function enviarPedido() {

    atualizarStatusLoja();

    if (!lojaAberta) {
        alert("A loja está fechada no momento. Funcionamos de terça a sexta, das 20h às 00h.");
        return;
    }

    const rua = document.getElementById("rua");
    const numero = document.getElementById("numero");
    const bairro = document.getElementById("bairro");
    const observacao = document.getElementById("observacao");

    let mensagem = "🍔 PEDIDO - LARIKA FLASH\n\n";

    let subtotal = 0;
    let temPedido = false;

    for (let i = 0; i < quantidades.length; i++) {

        if (quantidades[i] > 0) {

            mensagem +=
                quantidades[i] +
                "x " +
                nomesCombos[i] +
                " - R$ " +
                (quantidades[i] * precos[i]).toFixed(2) +
                "\n";

            subtotal +=
                quantidades[i] * precos[i];

            temPedido = true;
        }
    }

    if (!temPedido) {
        alert("Adicione pelo menos um item ao pedido.");
        return;
    }

    if (subtotal < 59) {
        alert("Pedido mínimo de R$ 59,00.");
        return;
    }

    if (rua.value.trim() === "") {
        alert("Digite o nome da rua.");
        return;
    }

    if (!numero || numero.value.trim() === "") {
        alert("Digite o número da casa.");
        return;
    }

    if (bairro.value === "") {
        alert("Selecione o bairro.");
        return;
    }

    mensagem += "\n📍 INFORMAÇÕES\n";

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

    if (observacao.value.trim() !== "") {

        mensagem += "\n📝 OBSERVAÇÃO\n";

        mensagem +=
            observacao.value +
            "\n";
    }

    const totalFinal =
        document.getElementById("total").innerText;

    mensagem +=
        "\n💰 TOTAL: R$ " +
        totalFinal;

    window.open(
        "https://wa.me/5548988509014?text=" +
        encodeURIComponent(mensagem),
        "_blank"
    );
}


/* ============================
   INICIALIZAÇÃO
============================ */

atualizarStatusLoja();
calcularTotal();

setInterval(atualizarStatusLoja, 60000);
function exibirInput() {
  var campoInput = document.getElementById("campoInput");
  campoInput.style.display = "block";
}

function formatarData(data) {
  var partes = data.split("-");
  var dia = partes[2];
  var mes = partes[1];
  var ano = partes[0];
  return dia + "/" + mes + "/" + ano;
}


function enviarPublicacao() {
  var titulo = document.getElementById("titulo").value;
  var dia = formatarData(document.getElementById("dia").value);
  var horaInicio = document.getElementById("horainicio").value;
  var horaFim = document.getElementById("horafim").value;
  var descricao = document.getElementById("descricao").value;
  var curtidas = 0; // Inicializa o contador de curtidas com 0
  var alerta = document.getElementById("alerta");


  var dtDigitada = new Date(document.getElementById("dia").value);
  var dtMinima = new Date();
  var dtMaxima = new Date();
  dtMaxima = new Date(dtMaxima.setMonth(dtMaxima.getMonth() + 3));

  if (dtDigitada < dtMinima) {
    alerta.innerText = "A data não deve ser inferior ao dia atual.";
  } else if (dtDigitada > dtMaxima) {
    alerta.innerText = "Data máxima da faxina em até 3 meses.";
  } else if (descricao.length >= 200) {
    alerta.innerText = " O número máximo de caracteres é 200.";
  } else {
    alerta.innerText = "";

    var publicacoes = document.getElementById("publicacoes");
    var novaPublicacao = document.createElement("div");
    novaPublicacao.classList.add("publicacao");

    var tituloElement = document.createElement("h3");
    tituloElement.textContent = titulo;

    var detalhes = document.createElement("p");
    detalhes.innerHTML = "Data: " + dia + "<br>Hora início: " + horaInicio + "<br>Hora Fim: " + horaFim;

    var descricaoElement = document.createElement("p");
    descricaoElement.textContent = "Descrição: " + descricao;

    var curtirDiv = document.createElement("div");
    curtirDiv.classList.add("curtir");

    var curtirImg = document.createElement("img");
    curtirImg.src = "/assets/img/coracao.png"; // Substitua pelo caminho da imagem de coração desejada
    curtirImg.addEventListener("click", function () {
      curtidas++; // Incrementa o número de curtidas quando a imagem é clicada
      curtidasElement.textContent = curtidas; // Atualiza o número de curtidas exibido
    });

    //curtirDiv.style.margin = "260px 0 0 15px";
    curtirImg.style.width = "30px"
    curtirImg.style.height = "25px"

    var curtidasElement = document.createElement("span");
    curtidasElement.textContent = curtidas; // Exibe o número de curtidas na publicação

    curtirDiv.appendChild(curtirImg);
    curtirDiv.appendChild(curtidasElement);

    novaPublicacao.appendChild(tituloElement);
    novaPublicacao.appendChild(detalhes);
    novaPublicacao.appendChild(descricaoElement);
    novaPublicacao.appendChild(curtirDiv); // Adiciona a div com a imagem de coração e a contagem de curtidas
    publicacoes.appendChild(novaPublicacao);

    // Limpar campos de input
    document.getElementById("titulo").value = "";
    document.getElementById("dia").value = "";
    document.getElementById("horainicio").value = "";
    document.getElementById("horafim").value = "";
    document.getElementById("descricao").value = "";

    // Fechar modal
    $("#exampleModal").modal("hide");
  }






}



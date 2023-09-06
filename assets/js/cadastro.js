function carregarCadastro() {

    const pegaDadosRetorno = function (retorno) {

        document.getElementById("linhas").innerHTML = "";


        for (let i = 0; i < retorno.length; i++) {

            let linha = document.createElement("div");
            if (i % 2 == 0)
                linha.className = "row linhaEscura";
            else
                linha.className = "row linhaClara"


            linha.innerHTML =
                `
                    <div class="col-md-1">${retorno[i].idUsuario}</div>
                    <div class="col-md-4">${retorno[i].nome}</div>
                    <div class="col-md-3">${retorno[i].sobrenome}</div>
                    <div class="col-md-2">${retorno[i].email}</div>
                    <div class="col-md-1">${retorno[i].senha}</div>
                    <div class="col-md-1">${retorno[i].telefone}</div>
                    <div class="col-md-1">${retorno[i].cpf}</div>
                    <div class="col-md-1">${retorno[i].tipo_usuario}</div>
                `;

            document.getElementById("linhas").appendChild(linha);
        }
    }


    axios.get(('http://127.0.0.1:3000/cadastro')
    )
        .then(response => pegaDadosRetorno(response.data))
        .catch(error => console.log(error));
}

function inserirCadastro() {


    axios.post('http://127.0.0.1:3000/inserirCadastro', {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        email: document.getElementById("e-mail").value,
        senha: document.getElementById("senha").value,
        telefone: document.getElementById("telefone").value,
        cpf: document.getElementById("cpf").value,
        tipo_usuario: document.getElementById("tipo_usuario").value
    })
        .then(function (response) { console.log(response); })
        .catch(function (error) { console.error(error); });


    location.reload();

}

function redirecionar() {
    //event.preventDefault();

    //var form = document.getElementById('myForm');
    var nome = document.getElementById('nome');
    var sobrenome = document.getElementById('sobrenome');
    var email = document.getElementById('e-mail');
    var senha = document.getElementById('senha');
    var cpf = document.getElementById('cpf');
    var telefone = document.getElementById('telefone');

    if (nome.value === '' || sobrenome.value === '' || email.value === '' || senha.value === '' || cpf.value === '' ||
        telefone.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios.'
        });
    } else {
        inserirCadastro();
        //form.submit();
        window.location.href = "/pages/login.html";
    }
}


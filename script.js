const uf = document.getElementById("uf");
async function preencherEstado() {
    try {
        const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);
        if (!resposta.ok) {
            throw new Error(`Não foi possível obter os dados desejados.`);
        }
        const estados = await resposta.json();
        estados.forEach(estado => {
            const opcao = document.createElement("option");
            opcao.value = estado.sigla;
            opcao.textContent = estado.nome;
            uf.appendChild(opcao);
        });
    } catch (error) {
        console.error(error);
    }
}
preencherEstado();

enviar = () => {
    validaNome();
    radios();
    validaEmail();
    mostraIdade();
    mascaraCPF();
    mostraEstado();
}

validaNome = () => {
    let nome = document.getElementById(`nome`).value;
    if (/^[a-zA-Z\s]+$/.test(nome) && nome.length >= 2) {
        console.log(`Nome: ${nome}`);
        let erroNome = document.getElementById(`erroNome`);
        erroNome.innerHTML = ``;
    } else {
        let erroNome = document.getElementById(`erroNome`);
        erroNome.innerHTML = `Digite um nome válido!`;
    }
}

mascaraCPF = () => {
    let cpf = document.getElementById(`cpf`).value;
    let regExp = /^[\d]{3}\.[\d]{3}\.[\d]{3}\-[\d]{2}$/;
    let regExp1 = /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/;
    let strCPF;
    if (cpf.search(regExp1) != -1) {
        let mascCPF = cpf.replace(regExp1, "$1.$2.$3-$4");
        console.log(mascCPF);
        strCPF = mascCPF.replace(/\D/g, '');
        if (testaCPF(strCPF)) {
            console.log("CPF válido");
            let erroCPF = document.getElementById(`erroCpf`);
            erroCPF.innerHTML = ``;
        } else {
            let erroCPF = document.getElementById(`erroCpf`);
            erroCPF.innerHTML = `CPF inválido!`;
        }
    } else if (regExp.test(cpf)) {
        strCPF = cpf.replace(/\D/g, '');
        if (testaCPF(strCPF)) {
            console.log("CPF válido!");
            let erroCPF = document.getElementById(`erroCpf`);
            erroCPF.innerHTML = ``;
        } else {
            let erroCPF = document.getElementById(`erroCpf`);
            erroCPF.innerHTML = `CPF inválido!`;
        }
        console.log(cpf);
    } else {
        if (cpf.value == null) {
            let erroCPF = document.getElementById(`erroCpf`);
            erroCPF.innerHTML = `CPF não inserido!`;
        }
    }
    function testaCPF(strCPF) {
        let Soma;
        let Resto;
        Soma = 0;
        if (/^(\d)\1{10}$/.test(strCPF))
            return false;
        for (i = 1; i <= 9; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;
        Soma = 0;
        for (i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }
}

validaEmail = () => {
    let email = document.getElementById(`email`).value;
    let regExp = /^[\w]+@[\w]+\.[\w|\.]+$/;
    if (regExp.test(email)) {
        console.log(`Email: ${email}`);
        let erroEmail = document.getElementById(`erroEmail`);
        erroEmail.innerHTML = ``;
    } else {
        let erroEmail = document.getElementById(`erroEmail`);
        erroEmail.innerHTML = `E-mail inválido!`;
    }
}

IMask(
    document.getElementById(`idade`),
    {
        mask: Number,
        min: 1,
        max: 120,
    }
)

mostraIdade = () => {
    let idade = document.getElementById(`idade`).value;
    if (idade >= 1) {
        let erroIdade = document.getElementById(`erroIdade`);
        erroIdade.innerHTML = ``;
        console.log(`Idade: ${idade} anos`);
    } else {
        let erroIdade = document.getElementById(`erroIdade`);
        erroIdade.innerHTML = `Digite sua Idade!`;
    }
}

mostraEstado = () => {
    let estado = document.getElementById(`uf`).value;
    console.log(`Estado: ${estado}`);
}

radios = () => {
    let radios = document.querySelector('input[name=sexo]:checked').value;
    console.log(`Sexo: ${radios}`);
}


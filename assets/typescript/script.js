"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (typeof document !== 'undefined') {
    //Url fake api
    const url = 'http://localhost:3000/usuarios';
    const mensagensSistema = (mensagem, userName) => {
        const h1Mensagens = document.getElementById("h1msg");
        h1Mensagens.classList.add('animated-text');
        h1Mensagens.innerText = mensagem + (userName ? userName : '');
        setTimeout(() => {
            h1Mensagens.classList.remove('animated-text');
        }, 2800);
    };
    const inserirUsuario = () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            nome: validaNome() || '',
            email: '',
            senha: validaSenhaCadastro() || ''
        };
        const email = yield validaEmailCadastro();
        if (email) {
            user.email = email;
        }
        else {
            return;
        }
        if (user.nome && user.email && user.senha) {
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                });
                if (response.ok) {
                    window.alert("Usuário cadastrado");
                }
                else {
                    window.alert("O usuário não foi cadastrado");
                }
            }
            catch (error) {
                console.log("Erro na requisição: " + error);
            }
        }
    });
    const loginUsuario = () => __awaiter(void 0, void 0, void 0, function* () {
        let emailValido = false;
        let senhaValida = false;
        const email = yield validaEmail();
        const senha = yield validaSenha();
        console.log(email + ' ' + senha);
        fetch(url)
            .then((resp) => resp.json())
            .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].email == email) {
                    emailValido = true;
                }
                else if (data[i].senha == senha) {
                    senhaValida = true;
                }
            }
            if (emailValido && senhaValida) {
                mensagensSistema('Seja bem vindo(a)');
                return;
            }
            mensagensSistema('E-mail ou senha incorretos');
        });
    });
    const formBody = document.querySelector('#formulario');
    //Campos login
    const inputEmail = document.querySelector('#email');
    const emailErro = document.querySelector('#emailErro');
    const inputSenha = document.querySelector('#senha');
    const senhaErro = document.querySelector('#senhaErro');
    //Campos cadastro
    const validaNome = () => {
        const userNome = document.querySelector('#nome');
        const nomeError = document.querySelector('#nomeErro');
        if ((userNome === null || userNome === void 0 ? void 0 : userNome.value) == '') {
            nomeError.innerText = 'Preencha todos os campos';
            setTimeout(() => {
                nomeError.innerText = '';
            }, 4000);
            return;
        }
        return userNome === null || userNome === void 0 ? void 0 : userNome.value;
    };
    //Parte de validação do e-mail
    const consultaUsuarioRepetido = (email) => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((resp) => resp.json())
                .then((data) => {
                const usuarioRepetido = data.some((e) => e.email === email);
                resolve(usuarioRepetido);
            })
                .catch((error) => {
                reject(error);
            });
        });
    };
    //
    const validaEmailCadastro = () => __awaiter(void 0, void 0, void 0, function* () {
        const emailCadastro = document.querySelector('#emailCadastro');
        const emailErro = document.querySelector('#emailErro');
        if ((emailCadastro === null || emailCadastro === void 0 ? void 0 : emailCadastro.value) == '') {
            emailErro.innerText = 'Preencha todos os campos';
            setTimeout(() => {
                emailErro.innerText = '';
            }, 4000);
            return '';
        }
        if (!(emailCadastro === null || emailCadastro === void 0 ? void 0 : emailCadastro.value.includes('@'))) {
            emailErro.innerText = 'Insira um e-mail válido';
            setTimeout(() => {
                emailErro.innerText = '';
            }, 4000);
            return '';
        }
        try {
            const usuarioRepetido = yield consultaUsuarioRepetido(emailCadastro === null || emailCadastro === void 0 ? void 0 : emailCadastro.value);
            if (usuarioRepetido) {
                emailErro.innerText = "Este e-mail já está sendo utilizado";
                setTimeout(() => {
                    emailErro.innerText = "";
                }, 4000);
                return '';
            }
        }
        catch (error) {
            console.log("Erro na consulta: " + error);
        }
        return emailCadastro === null || emailCadastro === void 0 ? void 0 : emailCadastro.value;
    });
    const validaSenhaCadastro = () => {
        const senha1 = document.querySelector('#senhaCadastro');
        const senhaErro = document.querySelector('#senhaErro');
        const senha2 = document.querySelector('#senha2Cadastro');
        const senha2Erro = document.querySelector('#senha2Erro');
        //Valida primeira senha
        if ((senha1 === null || senha1 === void 0 ? void 0 : senha1.value) == '') {
            senhaErro.innerText = 'Preencha todos os campos';
            setTimeout(() => {
                senhaErro.innerText = '';
            }, 4000);
            return;
        }
        if ((senha1 === null || senha1 === void 0 ? void 0 : senha1.value.length) < 6) {
            senhaErro.innerText = 'Sua senha deve ter mais de 6 dígitos';
            setTimeout(() => {
                senhaErro.innerText = '';
            }, 4000);
            return;
        }
        //Valida segunda senha
        if ((senha2 === null || senha2 === void 0 ? void 0 : senha2.value) == '') {
            senha2Erro.innerText = 'Preencha todos os campos';
            setTimeout(() => {
                senha2Erro.innerText = '';
            }, 4000);
            return;
        }
        if ((senha2 === null || senha2 === void 0 ? void 0 : senha2.value.length) < 6) {
            senha2Erro.innerText = 'Sua senha deve ter mais de 6 dígitos';
            setTimeout(() => {
                senha2Erro.innerText = '';
            }, 4000);
            return;
        }
        if ((senha1 === null || senha1 === void 0 ? void 0 : senha1.value) != (senha2 === null || senha2 === void 0 ? void 0 : senha2.value)) {
            senha2Erro.innerText = 'Esta senha é diferente da primeira';
            setTimeout(() => {
                senha2Erro.innerText = '';
            }, 4000);
            return;
        }
        return senha1 === null || senha1 === void 0 ? void 0 : senha1.value;
    };
    const btnLogin = document.querySelector('#btnLogin');
    btnLogin.addEventListener('click', () => {
        loginUsuario();
    });
    formBody.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
        const target = event.target;
        if (target.id === 'btnCadastro') {
            formCadastro();
        }
        else if (target.id === 'btnLogin2') {
            formLogin();
        }
        else if (target.id === 'btnCadastrar') {
            validaNome();
            validaEmailCadastro();
            validaSenhaCadastro();
            inserirUsuario();
        }
    }));
    function validaEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((inputEmail === null || inputEmail === void 0 ? void 0 : inputEmail.value) == '') {
                emailErro.innerText = 'Preencha todos os campos';
                setTimeout(() => {
                    emailErro.innerText = '';
                }, 4000);
                return '';
            }
            if (!(inputEmail === null || inputEmail === void 0 ? void 0 : inputEmail.value.includes('@'))) {
                emailErro.innerText = 'Insira um e-mail válido';
                setTimeout(() => {
                    emailErro.innerText = '';
                }, 4000);
                return '';
            }
            return inputEmail === null || inputEmail === void 0 ? void 0 : inputEmail.value;
        });
    }
    function validaSenha() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((inputSenha === null || inputSenha === void 0 ? void 0 : inputSenha.value) == '') {
                senhaErro.innerText = 'Preencha todos os campos';
                setTimeout(() => {
                    senhaErro.innerText = '';
                }, 4000);
                return '';
            }
            if ((inputSenha === null || inputSenha === void 0 ? void 0 : inputSenha.value.length) < 6) {
                senhaErro.innerText = 'Sua senha deve ter mais de 6 dígitos';
                setTimeout(() => {
                    senhaErro.innerText = '';
                }, 4000);
                return '';
            }
            return inputSenha === null || inputSenha === void 0 ? void 0 : inputSenha.value;
        });
    }
    function formLogin() {
        formBody.innerHTML = `
    <h1>Acesse ou crie uma conta</h1>
    <div>
        <label>E-mail</label><br>
        <input type="e-mail" class="email" id="email">
        <p id="emailErro"></p>
    </div>
    <div>
        <label>Senha</label><br>
        <input type="password" class="senha" id="senha">
        <p id="senhaErro"></p>
    </div>
    <div class="itens">
        <button id="btnLogin">Login</button>
        <div>
            <p>Ainda não está cadastrado?</p>
            <p>Clique<button class="cadastro" id="btnCadastro">aqui</button></p>
        </div>
    </div>`;
    }
    function formCadastro() {
        formBody.innerHTML = `<h1>Acesse ou crie uma conta</h1>
    <div>
        <label>Nome</label><br>
        <input type="text" class="nome" id="nome">
        <p id="nomeErro"></p>
    </div>
    <div>
        <label>E-mail</label><br>
        <input type="e-mail" class="email" id="emailCadastro">
        <p id="emailErro"></p>
    </div>
    <div>
        <label>Senha</label><br>
        <input type="password" class="senha" id="senhaCadastro">
        <p id="senhaErro"></p>
    </div>
    <div>
        <label>Confirmar senha</label><br>
        <input type="password" class="senha" id="senha2Cadastro">
        <p id="senha2Erro"></p>
    </div>
    <div class="itens">
        <span><button class="cadastrar" id="btnCadastrar">Cadastrar</button></span>
        <button id="btnLogin2">Login</button>
    </div>
    `;
    }
}
else {
    console.log('Erro com document');
}
function consultaUsuarioRepetido(value) {
    throw new Error("Function not implemented.");
}

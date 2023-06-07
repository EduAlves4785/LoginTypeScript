if (typeof document !== 'undefined') {

//Url fake api
const url='http://localhost:3000/usuarios'

interface User {
    nome: string;
    email: string;
    senha: string;
}

const mensagensSistema=(mensagem:string,userName?:string)=>{
    const h1Mensagens=document.getElementById("h1msg")as HTMLElement
    h1Mensagens.classList.add('animated-text')
    h1Mensagens.innerText=mensagem + (userName?userName:'')
    setTimeout(() => {
        h1Mensagens.classList.remove('animated-text')
    }, 2800);
}

const inserirUsuario = async () => {
    const user: User = {
        nome: validaNome() || '',
        email:'',
        senha: validaSenhaCadastro() || ''
    };
    const email = await validaEmailCadastro()
    if(email){
        user.email = email
    }else{
        return
    }
    if (user.nome && user.email && user.senha) {
        try {
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });
          if (response.ok) {
            window.alert("Usuário cadastrado")
          } else {
            window.alert("O usuário não foi cadastrado")
          }
        } catch (error) {
          console.log("Erro na requisição: " + error);
        }
    } 
};

const loginUsuario=async()=>{
    let emailValido:boolean=false
    let senhaValida:boolean=false
    const email = await validaEmail()
    const senha = await validaSenha()
    console.log(email + ' ' + senha)
    fetch(url)
    .then((resp)=>resp.json())
    .then(data=>{
        for (let i = 0; i < data.length; i++) {
            if(data[i].email==email){
                emailValido=true
            }else if(data[i].senha==senha){
                senhaValida=true
            }
        }
        if(emailValido && senhaValida){
            mensagensSistema('Seja bem vindo(a)')
            return
        }
        mensagensSistema('E-mail ou senha incorretos')
    })
}

const formBody=document.querySelector('#formulario') as HTMLElement;


//Campos login
const inputEmail: HTMLInputElement | null = document.querySelector('#email');
const emailErro=document.querySelector('#emailErro') as HTMLElement
 
const inputSenha=document.querySelector('#senha') as HTMLInputElement;
const senhaErro=document.querySelector('#senhaErro') as HTMLElement

//Campos cadastro
const validaNome=()=>{
    const userNome=document.querySelector('#nome') as HTMLInputElement
    const nomeError=document.querySelector('#nomeErro') as HTMLParagraphElement
    if(userNome?.value==''){
        nomeError.innerText='Preencha todos os campos'
        setTimeout(() => {
            nomeError.innerText=''
        },4000);
        return
    }
    return userNome?.value
}

//Parte de validação do e-mail
const consultaUsuarioRepetido = (email: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          const usuarioRepetido = data.some((e: any) => e.email === email);
          resolve(usuarioRepetido);
        })
        .catch((error) => {
          reject(error);
        });
    });
};
//


const validaEmailCadastro=async():Promise<string>=>{
    const emailCadastro=document.querySelector('#emailCadastro') as HTMLInputElement
    const emailErro=document.querySelector('#emailErro') as HTMLElement
    if(emailCadastro?.value==''){
        emailErro.innerText='Preencha todos os campos'
        setTimeout(() => {
            emailErro.innerText=''
        },4000);
        return ''
    }
    if(!emailCadastro?.value.includes('@')){    
        emailErro.innerText='Insira um e-mail válido'
        setTimeout(() => {
            emailErro.innerText=''
        },4000);
        return ''
    }
    try {
        const usuarioRepetido = await consultaUsuarioRepetido(emailCadastro?.value);
        if (usuarioRepetido) {
          emailErro.innerText = "Este e-mail já está sendo utilizado";
          setTimeout(() => {
            emailErro.innerText = "";
          }, 4000);
          return '';
        }
      } catch (error) {
        console.log("Erro na consulta: " + error);
    }
    return emailCadastro?.value
}

const validaSenhaCadastro=()=>{
    const senha1=document.querySelector('#senhaCadastro') as HTMLInputElement
    const senhaErro=document.querySelector('#senhaErro') as HTMLElement
    const senha2=document.querySelector('#senha2Cadastro') as HTMLInputElement
    const senha2Erro=document.querySelector('#senha2Erro') as HTMLElement
    //Valida primeira senha
    if(senha1?.value==''){
        senhaErro.innerText='Preencha todos os campos'
        setTimeout(() => {
            senhaErro.innerText=''
        },4000);
        return
    }
    if(senha1?.value.length < 6){
        senhaErro.innerText='Sua senha deve ter mais de 6 dígitos'
        setTimeout(() => {
            senhaErro.innerText=''
        },4000);
        return
    }
    //Valida segunda senha
    if(senha2?.value==''){
        senha2Erro.innerText='Preencha todos os campos'
        setTimeout(() => {
            senha2Erro.innerText=''
        },4000);
        return
    }
    
    if(senha2?.value.length < 6){
        senha2Erro.innerText='Sua senha deve ter mais de 6 dígitos'
        setTimeout(() => {
            senha2Erro.innerText=''
        },4000);
        return
    }

    if(senha1?.value != senha2?.value){
        senha2Erro.innerText='Esta senha é diferente da primeira'
        setTimeout(() => {
            senha2Erro.innerText=''
        },4000);
        return
    }
    return senha1?.value
}

const btnLogin = document.querySelector('#btnLogin') as HTMLButtonElement;
btnLogin.addEventListener('click',()=>{
    loginUsuario()
})

formBody.addEventListener('click', async (event) => {
    const target = event.target as HTMLButtonElement;

    if (target.id === 'btnCadastro') {
        formCadastro();
    } else if (target.id === 'btnLogin2') {
        formLogin()  
    } else if (target.id === 'btnCadastrar') {
        validaNome()
        validaEmailCadastro()
        validaSenhaCadastro()
        inserirUsuario()
    }
});




async function validaEmail():Promise<string>{
    if(inputEmail?.value==''){
        emailErro.innerText='Preencha todos os campos'
        setTimeout(() => {
            emailErro.innerText=''
        },4000);
        return ''
    }
    if(!inputEmail?.value.includes('@')){    
        emailErro.innerText='Insira um e-mail válido'
        setTimeout(() => {
            emailErro.innerText=''
        },4000);
        return ''
    }
    return inputEmail?.value
}

async function validaSenha():Promise<string>{
    if(inputSenha?.value==''){
        senhaErro.innerText='Preencha todos os campos'
        setTimeout(() => {
            senhaErro.innerText=''
        },4000);
        return ''
    }
    if(inputSenha?.value.length < 6){
        senhaErro.innerText='Sua senha deve ter mais de 6 dígitos'
        setTimeout(() => {
            senhaErro.innerText=''
        },4000);
        return ''
    }
    return inputSenha?.value
}

function formLogin(){
    formBody.innerHTML=`
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
    </div>`
}

function formCadastro(){
    formBody.innerHTML=`<h1>Acesse ou crie uma conta</h1>
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
    `
}

}
else{
    console.log('Erro com document')
}

function consultaUsuarioRepetido(value: string): boolean | PromiseLike<boolean> {
    throw new Error("Function not implemented.");
}

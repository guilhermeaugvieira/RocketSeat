function checaIdade(idade){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            if(idade>=18){
                resolve('Maior de idade');
            }else{
                reject('Menor que 18');
            }
        },2000);
    });
}

checaIdade(18)
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });

function gitHubUser(){
    var txtNick = document.querySelector('input[type=text]');
    var repositorios = document.querySelector('ul');

    repositorios.innerHTML = '';
    repo = document.createElement('li');
    repo.appendChild(document.createTextNode("...Carregando..."));
    repositorios.appendChild(repo);


    axios.get('https://api.github.com/users/' + txtNick.value)           
    .then(function(response){
        console.log(response);

        repositorios.innerHTML = '';

        for(i=1;i<=5;i++){
            repo = document.createElement('li');
            repo.appendChild(document.createTextNode('repo'+i));

            repositorios.appendChild(repo);
        }
    })
    .catch(function(error){
        console.log('Usuário não encontrado');
        repositorios.innerHTML = '';
    });
}

var btnPesquisar = document.querySelector('button');

btnPesquisar.onclick = function(){
    gitHubUser();
}
/*class List{
    constructor(){
        this.data = [];
    }
    
    add(data){
        this.data.push(data);
        console.log(this.data);
    }
}

class TodoList extends List{
    constructor(){
        super();

        this.usuario = 'Diego';
    }

    mostraUsuario(){
        console.log(this.usuario);
    }
}

const MinhaLista = new TodoList();

document.getElementById('novoTodo').onclick = function(){
    MinhaLista.add('Novo Todo');
}

MinhaLista.mostraUsuario();*/

/*class Matemática {
    static soma(a, b){
        return a+b;
    }
}

console.log(Matemática.soma(1,5));*/

/*
//Esse tipo de valor não pode ter o valor reatribuido, mutação é possível(objeto)
const a = 1;

//Variáel de escopo
function teste(x){
    let y = 2;

    if(x>5){

        let y = 4;
        console.log(x,y);
    }
}

console.log(y);

teste(10);*/

/*const arr = [1,3,4,5,8,9];

//Percorre todo o vetor
const newArr = arr.map(function(item, index){
    return item;
});

console.log(newArr);

//Realiza a soma do vetor
const sum = arr.reduce(function(total,next){
    return total + next;
});

console.log(sum);

//Realiza um filtro dentro do vetor
const filter = arr.filter(function(item){
    return item % 2 === 0;
});

console.log(filter);

const find = arr.find(function(item){
    return item === 4;
})

console.log(find);*/

//Arrow functions
/*
const arr = [1,3,4,5,6];

const newArr = arr.map(item => item * 2);

console.log(newArr);*/

/*const soma =  (a=3,b=5){
    return a+b;
}

const soma = (a=3,b=5) => a+b;

console.log(soma());*/

//Desestruturação
/*const usuario = {
    nome: 'Diego',
    idade: 23,
    endereco: {
        cidade: 'Rio do Sul',
        estado: 'SC',
    },
};

const {nome, idade, endereco: {cidade}} = usuario;

console.log(nome);
console.log(idade);
console.log(cidade);

function mostraNome({ nome, idade}){
    console.log(nome,idade);
}

mostraNome(usuario);*/

//REST operator(...)
/*
const usuario = {
    nome: 'Diego',
    idade: 23,
    empresa: 'RocketSeat'
};

const {nome, ...resto} = usuario;

console.log(nome);
console.log(resto);

function soma(a,b,...params){
    return params.reduce((total,next) => total + next);
}

console.log(soma(1,3,4,6,9,15,85));

//SPREAD operator(...)
const arr1 = [1,2,3];
const arr2 = [4,5,6];

const arr3 = [...arr1, ...arr2];

console.log(arr3);

const usuario2 = { ...usuario, nome:'Gabriel'}

console.log(usuario2);*/

//Template Literals
/*
const nome = 'Diego';
const idade = 23;

console.log(`Meu nome é ${nome} e tenho ${idade} anos`);*/

//Object Short Syntax
//const nome = 'Diego';
//const idade = 23;

//Só é possível porque os nomes são iguais não precisando fazer nome:nome
/*const usuario = {
    nome,
    idade,
    empresa: 'RocketSeat',
};

console.log(usuario);*/

/*import {soma} from './functions';

console.log(soma(1,2));*/

/*Desafio Webpack Server
import ClasseUsuario from './functions';
import {idade as idadeUsuario} from './functions';

ClasseUsuario.info();

alert(idadeUsuario);*/

/*const minhaPromise = () => new Promise((resolve, reject) => {
    setTimeout(()=> { resolve('OK')},2000);
});

async function executaPromise(){
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
}

//Mesmo método com arrow function
const executaPromise = async () => {
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
}

executaPromise();*/

/* Async/await
import axios from 'axios';

class Api {
    static async getUserInfo(username){
        try{
            const response = await axios.get(`https://api.github.com/users/${username}`);
            console.log(response);
        } catch(err) {
            console.warn('Erro na API');
        }
    }
}

Api.getUserInfo('guilhermeavdino');

Desafio*/

//import axios from 'axios';

// Funão delay aciona o .then após 1s
/*const delay = (msg) => new Promise(resolve => setTimeout(() => {resolve(msg)}, 1000));

const rodaDelay = async () => {
    console.log(await delay('1s'));
    console.log(await delay('2s'));
    console.log(await delay('3s'));
}

rodaDelay();

const getUserGitHub = async (user) => {
    try{
        console.log(await axios.get(`https://api.github.com/users/${user}`));
    } catch(err){
        console.warn('Usuário não existente');
    }
}

getUserGitHub('diego3g');
getUserGitHub('diego3gggggggggg');

const getRepoGitHub = async (repo) => {
    try{
        console.log(await axios.get(`https://api.github.com/repos/${repo}`));
    }catch(err){
        console.warn('Console não encontrado');
    }
}

getRepoGitHub('RocketSeat');*/

//Aplicação com ES6+

import api from './api';
class App{
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando'));
            loadingEl.setAttribute('id','loading');

            this.formEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0) return;

        this.setLoading();

        try{
            const response = await api.get(`/repos/${repoInput}`);

            const {name, description, html_url, owner: {avatar_url}} = response.data;
    
            console.log(response);
    
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });
    
            this.inputEl.value = '';
    
            this.render();
        }catch(err){
            alert('O repositório não existe');
        }

        this.setLoading(false);
        
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src',repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target','_blank');
            linkEl.setAttribute('href',repo.html_url)
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);

        })
    }
}

new App();
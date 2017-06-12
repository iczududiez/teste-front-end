# iCasei - Teste Front End
Criação de SPA baseada em descrição tecnica.

## Desenvolvido
Usando Node.JS com Express, AngularJs, HTML5, CSS3, Karma, Jasmine e Materialize.

# Instalação
Após o clone do projeto, é necessário instalar primeiro todas as dependências.
Navegue até a raiz do repositório e execute:

    $ npm install

## Rodando teste automatizados o projeto
Navegue até a pasta client e execute:

    $ karma start karma.conf.js

Obs: É necessário ter o karma e jasmine-core instalado globalmente para executar os testes, para instalar os mesmos execute os comandos:

```sh
$ npm install -g karma
$ npm install -g jasmine-core
```

## Executando o projeto
Para executar a aplicação use o comando:

    $ nodemon

Obs: É necessário ter o Nodemon instalado globalmente para executar a aplicação, para instalar o mesmo execute o comando:

    $ npm install -g nodemon

A Aplicação é executada em http://localhost:3000/
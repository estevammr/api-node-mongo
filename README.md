# api-node-mongo

# Requisitos para instalação

1. NodeJS e npm (https://nodejs.org/en/)
2. MongoDB (https://www.mongodb.org/)

# Instalação

1.Clone o projeto (git clone https://github.com/estevammr/api-node-mongo.git) para sua máquina. 
2.Entre na pasta do projeto e instale os módulos que estão no package.json da seguinte maneira.

* npm install (E veja as letrinhas subindo haha)

3.Crie o diretório \data\db na pasta do projeto (iremos setar o MongoDB para este diretório).
4.Acesse a pasta /bin do MongoDB (C:\Program Files\MongoDB\Server\3.0\bin) no Windows. Se estiver usando Linux não precisa realizar esse passo, vá para o próximo.
5.Na pasta do MongoDB digite: mongod.exe --dbpath (caminho-onde-voce-clonou-o-projeto)\data. No Linux faça sem o .exe .
6.Agora na pasta do projeto rode o comando 

* npm start

7.Acesse localhost:3000 e corra pro abraço ;)

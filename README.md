# api-node-mongo

# Requisitos para instalação

- NodeJS e npm (https://nodejs.org/en/)
- MongoDB (https://www.mongodb.org/)

# Instalação

- Clone o projeto (git clone https://github.com/estevammr/api-node-mongo.git) para sua máquina. 
- Entre na pasta do projeto e instale os módulos que estão no package.json da seguinte maneira.

* npm install (E veja as letrinhas subindo haha)

- Crie o diretório \data\db na pasta do projeto (iremos setar o MongoDB para este diretório).
- Acesse a pasta /bin do MongoDB (C:\Program Files\MongoDB\Server\3.0\bin) no Windows. Se estiver usando Linux não precisa realizar esse passo, vá para o próximo.
- Na pasta do MongoDB digite: mongod.exe --dbpath (caminho-onde-voce-clonou-o-projeto)\data. No Linux faça sem o .exe .
- Agora na pasta do projeto rode o comando 

* npm start

- Acesse localhost:3000 e corra pro abraço ;)

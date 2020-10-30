// Importa o express
import express from 'express';
// Importa o routes 
import routes  from'./routes';
// Importa a biblioteca do mongoose
import mongoose from 'mongoose';
// Importa o path do node
import path from 'path';

class App{
    // Primeiro método a ser chamado
    constructor(){
        this.server = express();

        // Conexão com o mongodb
        mongoose.connect('mongodb+srv://willtunner:lft11790@devhouse.5jwlq.mongodb.net/devhouse?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Carrega quando inicia 
        this.middlewares();
        this.routes();
    }

    middlewares(){
        // Diz para o express entender json
        this.server.use(express.json());

        //Cria um middleware em app.js que cria a rota files para exibir a imagem depois e casdastrar pelo insominia
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname,'..','uploads'))
        );
    }

    routes(){
        // Define as rotas do arquivo importado
        this.server.use(routes);
    }
}

export default new App().server;
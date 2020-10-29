// Importa o express
import express from 'express';
// Importa o routes 
import routes  from'./routes';
// Importa a biblioteca do mongoose
import mongoose from 'mongoose';

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
    }

    routes(){
        // Define as rotas do arquivo importado
        this.server.use(routes);
    }
}

export default new App().server;
// Importa o express
import express from 'express';
// Importa o routes 
import routes  from'./routes';

class App{
    // Primeiro método a ser chamado
    constructor(){
        this.server = express();

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
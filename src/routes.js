// Importa apenas as rotas do express
import { Router } from 'express';
// Importa o session controller
import SessionController from './controllers/SessionController';

const routes = new Router();

/*
routes.get('/', (req, res) =>{
    return res.json({ok: false});
});
*/

// Elimina o req e res pq o sessioncontroler vai fazer isso
routes.post('/sessions', SessionController.store);




module.exports = routes;


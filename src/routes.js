// Importa apenas as rotas do express
import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) =>{
    return res.json({ok: false});
});

module.exports = routes;


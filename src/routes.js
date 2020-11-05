// Importa apenas as rotas do express
import { Router } from 'express';
// Importa o session controller
import SessionController from './controllers/SessionController';
// Importa o controller da house
import HouseController from './controllers/HouseController';
// Importa o DashBoard
import DashBoardController from './controllers/DashboardController';
// Importa o controller da reserva
import ReserveController from './controllers/ReserveController';


// Importa o multer
import multer from 'multer';
// Importa conf de upload 
import uploadConfig from './config/upload';


const routes = new Router();
// pega as configurações de upload das imagens das casas e passa para o multer
const upload = multer(uploadConfig);

/*
routes.get('/', (req, res) =>{
    return res.json({ok: false});
});
*/

// Elimina o req e res pq o sessioncontroler vai fazer isso
routes.post('/sessions', SessionController.store);
// Coloca o upload nessa rota e diz qual campo referencia
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
// Cria rota para lista casas
routes.get('/houses', HouseController.index);
// Cria rota para atualizar uma casa
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
// Cria rota para excluir
routes.delete('/houses', HouseController.destroy);

// Cria a rota para o DashBoard
routes.get('/dashboard', DashBoardController.show);

// Cria a rota para reserverva
routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);




module.exports = routes;


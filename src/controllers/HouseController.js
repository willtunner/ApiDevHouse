import House from '../models/House';
import User from '../models/User';

class HouseController {

    // Lista casas por true ou false
    async index(req, res) {
        // Mensagem de teste para saber se a rota estpa ok
        //return res.json({ok: true});

        // Pega dados enviado pelo query params no insominia e não pelo body
        const { status } = req.query;
        // Procura na tabela do banco casas com status enviado
        const houses = await House.find({ status });
        // Retorna casas com o filtro
        return res.json(houses);
    }

    // Cadastra uma casa
    async store(req, res) {
        /*
        // Verifica o que está chegando no corpo da mensagem
        console.log(req.body);
        // Verifica o que está chegando no arquivo da mensagem
        console.log(req.file);
        */

        // Pega o arquivo enviado
        const { filename } = req.file;
        // Pega os dados enviados no formulário 
        const { description, price, location, status } = req.body;
        // Pega o id do usuario logado
        const { user_id } = req.headers;

        const houses = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });

        return res.json(houses);
    }

    // Faz o update de uma casa
    async update(req, res) {
        const { filename } = req.file; // Pega a imagem
        const { house_id } = req.params;// Passa pela url da rota o id da casa
        const { description, price, location, status } = req.body;// Pega os dados enviados no formulário 
        const { user_id } = req.headers;// Pega o id do usuario logado

        const houses = await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });
        return res.send();
    }
}

export default new HouseController();
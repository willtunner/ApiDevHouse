import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';

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

        // Configura o Yup para fazer as validações certas
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });

        // Pega o arquivo enviado
        const { filename } = req.file;
        // Pega os dados enviados no formulário 
        const { description, price, location, status } = req.body;
        // Pega o id do usuario logado
        const { user_id } = req.headers;

        // Faz a validação casp não esteja dentro doa padrões 
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Falha na validação."});
        }

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

         // Configura o Yup para fazer as validações certas
         const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        //user._id: pega o id do usuario logado, mostra no insominia
        //houses.user: pega o usuario que cadastrou a casa
        if (String(user._id) !== String(houses.user)) { // Verifica se o id do usuario logado for diferente do usuario que cadastrou a casa
            return res.status(401).json({ error: 'Usuario diferente do usuario que cadastrou a casa.' });
        }

         // Faz a validação casp não esteja dentro doa padrões 
         if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Campos inválidos"});
        }

        await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });
        return res.send();
    }

    // Cria a rota para excluir
    async destroy(req, res) {
        // Pega o id da casa que envia pelo insominia
        const { house_id } = req.body;
        // Pega o id do usuario logado que envia pelo headers do insominia
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        //user._id: pega o id do usuario logado, mostra no insominia
        //houses.user: pega o usuario que cadastrou a casa
        if (String(user._id) !== String(houses.user)) { // Verifica se o id do usuario logado for diferente do usuario que cadastrou a casa
            return res.status(401).json({ error: 'Não autorizado' });
        }

        // Se achar a casa com o id ele delea
        await House.findByIdAndDelete({ _id: house_id});

        return res.json({ message: 'Excluida com sucesso' });
    }
}

export default new HouseController();
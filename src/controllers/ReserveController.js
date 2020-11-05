import Reserve from '../models/Reserve';

// Import para validações
import User from '../models/User';
import House from '../models/House';

class ReserveController{

    async index(req, res){
        // Pega o id do usuario logado
        const { user_id } = req.headers;
        

        // Procura usuario do model reserva pelo id do usuario logado
        const reserves = await Reserve.find({user: user_id}).populate('house');
        // Retorna as reservas para esse usuario
        return res.json(reserves);
    }

    async store(req, res){
        // Pega o id do usurio que o insominia passa
        const { user_id } = req.headers;
        // Pega o id da casa pela url
        const { house_id } = req.params;
        // Pega a data vindo pelo corpo json (insominia)
        const { date } = req.body;

        // #Validações 

        // Verifica se a casa existe
        const house = await House.findById(house_id);
        // Se não existe uma casa cai no if
        if(!house){
            return res.status(400).json({error: 'Essa casa não existe'});
        }

        // Verifica se o status for diferente de true
        if(house.status !== true){
            return res.status(400).json({error: 'Solicitação indisponivel'});
        }

        //Verifica se o usuario não criou essa casa que ele quer reservar
        
        // Pega o id do usuario logado
        const user = await User.findById(user_id) ;
        // Verifica se o usuario logado é igual
        if(String(user_id) === String(house.user)){
            return res.status(401).json({error: 'Reserva não permitida'});
        }


        // Faz a reserva
        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        });

        // Depois de fazer a reserva acima
        // Acrescenta os dados da casa e do usuario
        await reserve.populate('house').populate('user').execPopulate();

        return res.json(reserve);
    }

    async destroy(req, res){
        // Pega o id da reserva
        const { reserve_id } = req.body;
        // Deleta a reserva pelo id acima
        await Reserve.findByIdAndDelete({_id: reserve_id});

        return res.send();
    }
}

export default new ReserveController();
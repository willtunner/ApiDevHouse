// Metodos: index, show, update, store, destroy
/**
 * index: listagem de sessoes
 * store: Criar uma sessão
 * show: Quando queremos listar uma UNICA sessão
 * update: quando queremos alterar alguma sessão
 * destroy: quando queremos deletar uma sessão
 */

import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    // const email = req.body.email;

    // Descontrução do javascript ecs6
    const { email } = req.body;

    // Validação do Yup
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    // Se o nome do campo enviado pelo insominia fosse diferente do usado no model
    // teria que usar dessa forma
    // let user = User.create({email:email})

    // Procura se existe um usuario como email no banco de dados
    let user = await User.findOne({ email });

    // Se não tiver nenhum usuario
    if (!user) {
      // como todos os nomes estão iguais pode usar assim
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();

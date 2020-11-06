import House from '../models/House';

class DashboardController {
  async show(req, res) {
    // Pega o id do ususario logado (insominia)
    const { user_id } = req.headers;
    // Procura no banco as casas cadastradas com esse usuario
    const houses = await House.find({ user: user_id });

    return res.json(houses);
  }
}

export default new DashboardController();

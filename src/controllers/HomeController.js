import Alunos from "../models/Alunos";

class HomeController {
    async index(req, res) {
        const novoAluno = await Alunos.create({
            nome: "Marcelo",
            sobrenome: "Amaral",
            email: "marcelo@email.com",
            idade: 20,
            peso: 103,
            altura: 1.85,
        });

        res.json({
            novoAluno,
        });
    }
}

export default new HomeController();

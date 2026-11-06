import User from "../models/Users";
import { Op } from "sequelize";

class UserController {
    async store(req, res) {
        try {
            const novoUser = await User.create(req.body);
            return res.json(novoUser);
        } catch (e) {
            if (e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    errors: ["Email já cadastrado"],
                });
            }

            console.log(e);
            res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async index(req, res) {
        try {
            const users = await User.findAll();
            return res.send(users);
        } catch (e) {
            return res.json(e);
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);

            return res.json(user);
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({
                    errors: ["Id é necessário"],
                });
            }

            const user = await User.findByPk(id);

            if (!user) {
                res.status(404).json({
                    errors: ["Usuário não existe"],
                });
            }

            const checkEmailExists = await User.findOne({
                where: {
                    email: req.body.email,
                    id: {
                        [Op.ne]: req.params.id,
                    },
                },
            });

            console.log(checkEmailExists);
            if (checkEmailExists) {
                return res.status(400).json({
                    errors: ["Email já existe"],
                });
            }

            const updatedUser = await user.update(req.body);

            return res.status(200).json(updatedUser);
        } catch (e) {
            res.json(e);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    errors: ["Id é necessário"],
                });
            }

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    errors: ["Usuário não existe"],
                });
            }

            await user.destroy();

            res.json({
                msg: ["Usuário deletado"],
            });
        } catch (e) {
            res.send(e);
        }
    }
}

export default new UserController();

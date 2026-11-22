import User from "../models/Users";
import jwt from "jsonwebtoken";

class TokenController {
    async store(req, res) {
        const { email = "", password = "" } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                errors: ["Credenciais inválidas"],
            });
        }

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(404).json({
                errors: ["Usuário não existe."],
            });
        }

        if (!(await user.passwordIsValid(password))) {
            res.status(401).json({
                errors: ["Credenciais inválidas"],
            });
        }

        const id = user.id;
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.json({
            token: token,
        });
    }
}

export default new TokenController();

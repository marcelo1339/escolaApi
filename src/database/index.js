import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Alunos";
import User from "../models/Users";

const models = [Aluno, User];

const connection = new Sequelize(databaseConfig);

models.forEach((m) => {
    m.init(connection);
});

import sequelize from 'sequelize';
import { development as data } from './config/config';

export default new sequelize(data.database,data.username,data.password,{
    host:data.host,
    dialect:data.dialect

});
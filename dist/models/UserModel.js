"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const dbConnection_1 = require("../config/dbConnection");
class UserModel {
    static register(email, name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT * FROM users 
            WHERE email = '${email}'
        `;
            const userCheck = yield dbConnection_1.pool.query(query);
            if (userCheck && userCheck.rows.length > 0)
                throw new Error('User with this email already exists');
            const insertQuery = `
            INSERT INTO users (email, name, password) 
            VALUES ('${email}', '${name}', '${password}')
        `;
            yield dbConnection_1.pool.query(insertQuery);
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT * FROM users 
            WHERE email = '${email}'
        `;
            const userResult = yield dbConnection_1.pool.query(query);
            if (userResult.rows.length === 0)
                throw new Error('User not found');
            const user = userResult.rows[0];
            if (password !== user.password)
                throw new Error('Incorrect password');
            return user;
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT email, name 
            FROM users WHERE id = ${id}
        `;
            const userResult = yield dbConnection_1.pool.query(query);
            if (userResult.rows.length === 0)
                throw new Error('User not found');
            const user = userResult.rows[0];
            return { email: user.email, name: user.name };
        });
    }
}
exports.UserModel = UserModel;

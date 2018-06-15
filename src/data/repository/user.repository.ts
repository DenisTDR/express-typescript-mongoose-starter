import {UserModel} from "../models/user.model";
import {Model} from "mongoose";

import * as bcrypt from "bcryptjs";
import moment = require("moment");
import Auth from "../../auth/auth";
import AuthToken from "../../auth/auth.token";
import IUser from "../interfaces/user.interface";

export default class UserRepository {

    public constructor() {

    }


    public async getUserByUsername(username: string, projection?: any): Promise<IUser> {
        return await UserModel.findOne({username: username}, {_id: false, username: true, fullName: true, role: true}).exec();
    }


    public async registerUser(user: IUser): Promise<IUser> {

        const userModel = new UserModel(user);
        userModel.username = userModel.username.trim();

        try {
            const existingUser = await UserModel.findOne({username: userModel.username});

            if (existingUser !== null) {
                throw "username_already_taken";
            }

            userModel.password = bcrypt.hashSync(userModel.password, 10);

            await userModel.save();
        } catch (e) {
            if (e == "username_already_taken") {
                throw "username_already_taken";
            }
            console.error(e);
            throw "Can't register new user.";
        }

        userModel.password = "";
        return userModel;
    }

    public async loginAndGetInfo(checkUser: IUser): Promise<{ user: IUser, token: AuthToken }> {
        const user = await this.getUserByUsername(checkUser.username.trim());

        if (user === null) {
            throw "invalid_credentials";
        }

        const success = await this.checkPassword(checkUser.password, user.password);
        if (!success) {
            throw "invalid_credentials";
        }

        const token = Auth.genToken(user);

        return {user, token};
    }

    private checkPassword(password: string, hashedPassword: string): boolean {
        const compareResult = bcrypt.compareSync(password, hashedPassword);
        return compareResult;
    }

}
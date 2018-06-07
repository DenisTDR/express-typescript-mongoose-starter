import {Document, model, Model} from "mongoose";
import {GenericSchema} from "../../api/generic/generic.model";
import * as bcrypt from "bcryptjs";

export interface IUser extends Document {
    username?: string;
    email?: string;
    password?: string;
    created?: Date;
    confirmed?: boolean;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

let schema = new GenericSchema({
    username: String,
    email: String,
    password: String,
    confirmed: {type: Boolean, default: true},
    created: {type: Date}
});

schema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};
export const UserModel: Model<IUser> = model('User', schema);
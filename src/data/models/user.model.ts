import {model, Model} from "mongoose";
import {GenericSchema} from "../../api/generic/generic.model";
import IUser from "../interfaces/user.interface";

let schema = new GenericSchema({
    username: String,
    email: String,
    password: String,
    confirmed: {type: Boolean, default: true},
    created: {type: Date}
});

export const UserModel: Model<IUser> = model('User', schema);
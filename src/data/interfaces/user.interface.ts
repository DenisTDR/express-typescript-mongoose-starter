import {Document} from "mongoose";

export default interface IUser extends Document {
    username?: string;
    email?: string;
    password?: string;
    fullName?: string;
    created?: Date;
    confirmed?: boolean;
}
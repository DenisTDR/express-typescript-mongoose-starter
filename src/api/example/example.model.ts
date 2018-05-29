import {Schema, model, Document, Model} from 'mongoose';

export interface IExample extends Document {
    title?: string;
    subtitle?: string;
}

let schema: Schema = new Schema({
    title: String,
    subtitle: String
});

schema.pre("save", next => {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

export const Example: Model<IExample> = model<IExample>('Example', schema);
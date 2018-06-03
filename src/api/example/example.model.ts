import {model, Document, Model} from 'mongoose';
import {GenericSchema} from "../generic/generic.model";

export interface IExample extends Document {
    title?: string;
    subtitle?: string;
    created?: Date;
}

let schema = new GenericSchema({
    title: String,
    subtitle: String,
    created: {type: Date}
});

export const Example: Model<IExample> = model('Example', schema);
import {Schema, SchemaDefinition} from "mongoose";


export class GenericSchema extends Schema {

    constructor(definition?: SchemaDefinition) {
        super(definition);
        this.pre("save", function(next) {
            const doc: any = this;
            if (!doc.created) doc.created = new Date();
            next();
        });
    }
}
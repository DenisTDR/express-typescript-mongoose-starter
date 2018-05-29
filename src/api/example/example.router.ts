import {Router} from 'express';
import ExampleController from './example.controller';
import GenericRouter from "../generic/generic.router";

export class ExampleRouter extends GenericRouter {


    /*--------  Constructor  --------*/
    constructor() {
        super();
    }

    protected init(): void {
        this.router.get('/', ExampleController.getAll);
        this.router.post('/', ExampleController.create);
    }
}

// 
// Create Router and export its configured Express.Router
const router = new ExampleRouter().getRouter();

export default router;
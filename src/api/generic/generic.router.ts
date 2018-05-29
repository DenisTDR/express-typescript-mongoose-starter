import ExampleController from "../example/example.controller";
import {Router} from "express";


export default abstract class GenericRouter {
    protected router: Router;

    /*--------  Constructor  --------*/
    protected constructor() {
        //
        // Set router
        this.router = Router();
        this.init();
    }


    /*--------  Methods  --------*/

    /**
     * Init all routes in this router
     */
    protected abstract init(): void;

    public getRouter(): Router {
        return this.router;
    }
}
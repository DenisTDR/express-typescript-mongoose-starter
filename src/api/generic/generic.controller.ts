import {Router} from "express";

export default abstract class GenericController {

    protected router: Router;

    /*--------  Constructor  --------*/
    protected constructor() {
        //
        // Set router
        this.router = Router();
        this.initRoutes();
    }

    protected abstract initRoutes(): void;

    public getRouter(): Router {
        return this.router;
    }

}
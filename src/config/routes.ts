import {Router, Request, Response, NextFunction, Express} from 'express';
import ControllerFactory from "../patterns/factories/controller.factory";
import ExampleController from "../api/example/example.controller";
import UserController from "../api/user/user.controller";


export default class Routes {

    private app: Express;


    /*--------  Constructor  --------*/


    constructor(app: Express) {

        //
        // Set app
        this.app = app;

        // 
        // Set all routes
        this.setAllRoutes();
    }


    /*--------  Methods  --------*/


    /**
     * Set all app routes
     */
    setAllRoutes() {


        /*--------  Set all custom routes here  --------*/


        // 
        // Your routes goes here
        this.app.use('/api/examples', ControllerFactory.buildController(ExampleController));

        /*--------  Main routes  --------*/


        // 
        // Set main route for any other route found
        // this.setMainRoute();
    }

    /**
     * Set main route
     * this route will be used for all other routes not found before
     */
    private setMainRoute() {

        // 
        // All other routes should redirect to the index.html
        this.app.route('/*').get(this.index);
    }

    /**
     * Main route
     */
    private index(req: Request, res: Response, next: NextFunction) {

        res.json({
            message: 'Hello World!'
        });
    }

}
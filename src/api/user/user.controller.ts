import GenericController from "../generic/generic.controller";
import {NextFunction, Request, Response} from "express";
import UserRepository from "../../data/repository/user.repository";
import SingletonsFactory from "../../patterns/factories/singletons.factory";
import * as ExpressValidator from 'express-validator';
import {Validator} from "express-validator";
import Auth from "../../auth/auth";

export default class UserController extends GenericController {

    protected initRoutes(): void {

        this.router.post('/register', UserController.register);
        this.router.post('/login', UserController.login);

        this.router.get('/me', Auth.isAuthenticated, UserController.myInfo);
    }

    private static async register(req: Request, res: Response, next: NextFunction) {

        const userRepo: UserRepository = SingletonsFactory.getUserRepository();

        try {
            const user = await userRepo.registerUser(req.body);
            res.send({status: "success", user: user});
        } catch (e) {
            const message: string = e.message ? e.message : e;
            res.status(400).send({status: "error", message: message});
        }

    }

    private static async login(req: Request, res: Response, next: NextFunction) {
        try {

            req.checkBody("username", "Invalid username").notEmpty();
            req.checkBody("password", "Invalid password").notEmpty();
            let errors = req.validationErrors();
            if (errors) {
                throw errors;
            }

            const userRepo: UserRepository = SingletonsFactory.getUserRepository();
            let auth = await userRepo.loginAndGetInfo(req.body);

            // if (!user.confirmed) throw "User was not validated";

            res.send({status: "success", message: 'cică ok', auth: auth.token});
        } catch (err) {
            console.error(err);
            res.status(401).json({"message": "Invalid credentials", "errors": err});
        }
    }

    private static async myInfo(req: Request, res: Response, next: NextFunction) {
        //res.locals.user

        const userRepo: UserRepository = SingletonsFactory.getUserRepository();

        const user = await userRepo.getUserByUsername(res.locals.user.username);

        res.send({
            status: "success",
            user: {usuername: user.username}
        });
    }

}
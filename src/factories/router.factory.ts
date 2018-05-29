import GenericRouter from "../api/generic/generic.router";
import {Router} from "express";


export default class RouterFactory {

    public static buildRouter(routerType): Router {
        const genericRouter: GenericRouter = new routerType();
        return genericRouter.getRouter();
    }
}
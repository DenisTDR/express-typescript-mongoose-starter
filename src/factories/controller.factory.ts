import {Router} from "express";
import GenericController from "../api/generic/generic.controller";


export default class ControllerFactory {

    public static buildController(controllerType): Router {
        const controller: GenericController = new controllerType();
        return controller.getRouter();
    }
}
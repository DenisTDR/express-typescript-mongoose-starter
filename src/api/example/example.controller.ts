import {Request, Response, NextFunction} from 'express';
import {Example, IExample} from './example.model';
import GenericController from "../generic/generic.controller";

export default class ExampleController extends GenericController {

    protected initRoutes(): void {
        this.router.get('/', ExampleController.getAll);
        this.router.post('/', ExampleController.create);
    }

    /**
     * Get all
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    public static async getAll(req: Request, res: Response, next: NextFunction) {

        try {

            // 
            // Get data
            let result = await Example.find().exec();

            // 
            // Response
            res.send({
                message: 'it works! We got all examples',
                result: result
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not get Examples',
                err: err
            });
        }
    }

    /**
     * Create
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    public static async create(req: Request, res: Response, next: NextFunction) {

        const reqModel: IExample = req.body;
        console.log(reqModel);

        if (!reqModel.title || typeof reqModel.title !== 'string') {
            res.send({
                status: "error",
                message: "Property 'title' invalid or not found."
            });
            return;
        }
        if (!reqModel.subtitle || typeof reqModel.subtitle !== 'string') {
            res.send({
                status: "error",
                message: "Property 'subtitle' invalid or not found."
            });
            return;
        }

        // 
        // Create model
        let model = new Example({
            title: reqModel.title,
            subtitle: reqModel.subtitle
        });

        //
        // Save
        await model.save();

        res.send({
            message: 'Created!',
            model: model
        });
    }
}
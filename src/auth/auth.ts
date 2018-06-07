
import {Strategy, ExtractJwt} from "passport-jwt";
import * as moment from 'moment';
import * as jwt from "jwt-simple";
import * as express from "express";
import * as passport from "passport";

import SingletonsFactory from "../patterns/factories/singletons.factory";

import AuthToken from "./auth.token";
import UserController from "../api/user/user.controller";
import ControllerFactory from "../patterns/factories/controller.factory";
import UserRepository from "../data/repository/user.repository";
import IUser from "../data/interfaces/user.interface";

export default class Auth {

    constructor() {

    }

    public static initialize(app: express.Express) {
        if (!process.env.JWT_SECRET) {

            console.error("JWT_SECRET env var not found.");
            process.exit(-1);
            return;
        }

        passport.use("jwt", Auth.getStrategy());
        app.use(passport.initialize());

        app.use('/api/user', ControllerFactory.buildController(UserController));
    }


    private static getStrategy(): Strategy {
        const params = {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            passReqToCallback: true
        };

        return new Strategy(params, async (req, payload: { username: string }, done) => {

            try {
                const userRepo: UserRepository = SingletonsFactory.getUserRepository();
                const user = await userRepo.getUserByUsername(payload.username);
                if (user === null) {
                    return done(null, false, {message: "The user in the token was not found"});
                }
                return done(null, {userId: user._id, username: user.username});
            }
            catch (e) {
                return done(e);
            }
            // User.findOne({"username": payload.username}, (err, user) => {
            //     /* istanbul ignore next: passport response */
            //     if (err) {
            //         return done(err);
            //     }
            //     /* istanbul ignore next: passport response */
            //     if (user === null) {
            //         return done(null, false, {message: "The user in the token was not found"});
            //     }
            //
            //
            //     return done(null, {_id: user._id, username: user.username});
            // });
        });
    }

    public static genToken(user: IUser): AuthToken {
        let expires = moment().utc().add({days: 7}).unix();
        let token = jwt.encode({
            exp: expires,
            username: user.username
        }, process.env.JWT_SECRET);

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            userId: user._id
        };
    };



    public static authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);
    public static async isAuthenticated (req, res, next) {
        return Auth.authenticate((err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                if (info.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
                } else {
                    return res.status(401).json({ message: info.message });
                }
            }
            res.locals.user = user;
            return next();
        })(req, res, next);
    };
}
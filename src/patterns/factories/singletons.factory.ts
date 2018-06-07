import UserRepository from "../../data/repository/user.repository";
import {inspect} from "util";

export default class SingletonsFactory {

    private static userRepository: UserRepository;

    public static getUserRepository(): UserRepository {
        if (!SingletonsFactory.userRepository) {
            SingletonsFactory.userRepository = new UserRepository();
        }
        return SingletonsFactory.userRepository;
    }

}
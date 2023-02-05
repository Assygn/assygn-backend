import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel('users') private readonly users: Model<UserDocument>) { }

    private readonly logger = new Logger('user.service');

    async hasUser(userId: string): Promise<boolean> {
        const user = await this.users.find({username: userId});
        this.logger.log(`${user}`);
        return (user != null) && (user != undefined) && (user.length != 0);
    }

    async getUser(userId: object, includePassword: boolean = false) {
        return includePassword
            ? this.users.findOne(userId).select('+password')
            : this.users.findOne(userId);
    }

    async createUser(user: object) {
        return await this.users.create(user);
    }
}
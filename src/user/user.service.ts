import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel('users') private readonly users: Model<UserDocument>) { }

    private readonly logger = new Logger('user.service');

    async hasUser(userId: string): Promise<boolean> {
        const user = await this.users.findOne({ userId });
        return user != null && user != undefined;
    }

    async getUser(userId: object) {
        return this.users.findOne(userId).select('+password');
    }

    async createUser(user: object) {
        return await this.users.create(user);
    }
}
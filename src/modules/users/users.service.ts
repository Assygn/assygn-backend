import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private readonly users: Model<UserDocument>) { }

    async getUserById(id: string) {
        return await this.users.findById(id);
    }
}

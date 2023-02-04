import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'users', schema: UserSchema }
        ])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }

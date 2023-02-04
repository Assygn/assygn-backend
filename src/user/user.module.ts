import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'users', schema: UserSchema }
        ]),
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }

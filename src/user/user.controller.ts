import { Body, Controller, Head, Header, HttpCode, HttpException, HttpStatus, Logger, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register.dto";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    private readonly logger = new Logger('user.controller');

    @UsePipes(new ValidationPipe())
    @Post('register')
    @Header('content-type', 'application/json')
    @HttpCode(201)
    async register(@Body() user: RegisterUserDto) {
        const { username } = user;
        const existingUser = await this.userService.getUser({ username });

        if (existingUser) {
            this.logger.warn(`user already exists`);
            throw new HttpException("User already exists", HttpStatus.CONFLICT);
        }

        user.password = await bcrypt.hash(user.password, 8);;

        const createduser = await this.userService.createUser(user);
        if (createduser) {
            return {
                "code": HttpStatus.CREATED,
                "message": "User created successfully"
            };
        }

        throw new HttpException("Failed to create user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
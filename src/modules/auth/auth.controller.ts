import { Body, Controller, Header, HttpCode, HttpException, HttpStatus, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/schemas/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    private readonly logger = new Logger('auth.controller');

    @UsePipes(new ValidationPipe())
    @Post('register')
    @Header('content-type', 'application/json')
    @HttpCode(201)
    async register(@Body() user: RegisterUserDto) {
        const { username } = user;
        const existingUser = await this.userService.hasUser(username);

        if (existingUser) {
            this.logger.warn(`user already exists`);
            throw new HttpException("User already exists", HttpStatus.CONFLICT);
        }

        user.password = await bcrypt.hash(user.password, 8);
        const createduser = await this.userService.createUser(user);
        if (createduser) {
            return {
                "code": HttpStatus.CREATED,
                "message": "User created successfully",
                "data": {
                    "profile": createduser,
                }
            };
        }

        throw new HttpException("Failed to create user", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    @Header('content-type', 'application/json')
    @HttpCode(200)
    async login(@Body() credentials: LoginDto) {
        const { username, password } = credentials;

        const user = await this.userService.getUser({ username }, true);
        if (!user) {
            return new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        this.logger.log(`${user}`);
        this.logger.log(`${password}`);

        const passwordValid = await bcrypt.compare(password, user.password!);
        if (!passwordValid) {
            return new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED);
        }

        //  login successful
        const payload = {
            username: user.username,
            sub: user._id
        };

        //  remove password before sending in response
        var profileJson = user.toJSON();
        delete profileJson.password;

        return {
            code: HttpStatus.OK,
            data: {
                access_token: this.jwtService.sign(payload),
                profile: profileJson,
            },
            message: "Authentication Successful",
        };;
    }
}

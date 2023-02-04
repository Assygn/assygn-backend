import { IsEmail } from "@nestjs/class-validator";
import { IsNotEmpty, ValidationArguments } from "class-validator";

export class LoginDto {
    @IsEmail(undefined, {
        message: (args: ValidationArguments) => {
            if (!args.value) {
                return "Username cannot be empty";
            }
            return "Please provide a valid email";
        }
    })
    username: string;

    @IsNotEmpty({
        message: (args: ValidationArguments) => "Invalid Password"
    })
    password: string;
}
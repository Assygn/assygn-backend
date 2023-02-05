import { IsNotEmpty } from "@nestjs/class-validator";
import { IsEmail, MinLength, ValidationArguments } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty({
        message: (args: ValidationArguments) => {
            return "First name cannot be empty";
        }
    })
    firstName: string;

    @IsNotEmpty({
        message: (args: ValidationArguments) => {
            return "Last name cannot be empty";
        }
    })
    lastName: string;

    @IsEmail(
        undefined, {
        message: (args: ValidationArguments) => {
            if (!args.value) {
                return "Username cannot be empty";
            }
            return "Please provide a valid email";
        }
    })
    username: string;

    @MinLength(8, {
        message: (args: ValidationArguments) => {
            return "Password should be atleast 8 characters";
        }
    })
    password: string;
}
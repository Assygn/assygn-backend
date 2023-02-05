import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    name: string;

    description: string | undefined;

    status = "open";
}
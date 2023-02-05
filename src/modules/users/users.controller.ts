import { Controller, Get, Header, HttpException, HttpStatus, Logger, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    private readonly logger = new Logger('users.controller');

    @Get(':id')
    @Header('content-type', 'application/json')
    async getUser(@Param('id') id: string) {
        this.logger.log(`user id: ${id}`);
        const user = await this.usersService.getUserById(id);

        if (!user) {
            return new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        return {
            "code": HttpStatus.OK,
            "message": "User retrieved successfully",
            "data": {
                "profile": user
            }
        };
    }
}

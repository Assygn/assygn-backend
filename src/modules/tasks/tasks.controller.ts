import { Body, Controller, Header, HttpCode, HttpException, HttpStatus, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create_task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    private readonly logger = new Logger('tasks.controller');

    @UsePipes(new ValidationPipe())
    @Post('create')
    @Header("content-type", "application/json")
    @HttpCode(HttpStatus.CREATED)
    async create(@Body("task") task: CreateTaskDto) {
        this.logger.log(`${JSON.stringify(task)}`);
        const createdTask = await this.tasksService.create(task);

        if(!task) {
            return new HttpException("Failed to create task", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {
            "code": HttpStatus.CREATED,
            "message": "Task created successfully",
            "data": {
                "task": createdTask,
            }
        };
    }
}

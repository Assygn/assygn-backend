import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument } from 'src/schemas/task.schema';
import { CreateTaskDto } from './dto/create_task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel('tasks') private readonly tasks: Model<TaskDocument>) { }
    
    private readonly logger = new Logger('tasks.service');

    async create(task: object) {
        this.logger.log(`${JSON.stringify(task)}`);
        return await this.tasks.create(task)
    }
}  

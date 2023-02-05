import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/schemas/task.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'tasks', schema: TaskSchema }
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './utils/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';

const API_MODULES = [
  AuthModule,
  UsersModule,
  TasksModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongoUri'),
      }),
    }),
    ...API_MODULES,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

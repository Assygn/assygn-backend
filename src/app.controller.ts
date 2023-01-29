import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  baseUrlCheck(): string {
    console.log("Base URL Check");
    return this.appService.getBaseUrlCheck();
  }
}

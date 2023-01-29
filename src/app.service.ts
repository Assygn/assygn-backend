import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) { }

  getBaseUrlCheck(): string {
    return `Running on Version: ${this.configService.get('port')}`;
  }
}

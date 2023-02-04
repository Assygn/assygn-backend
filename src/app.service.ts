import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) { }

  getBaseUrlCheck(): string {
    const version = this.configService.get('apiVersion');
    const port = this.configService.get('port');
    return `Running on Version: ${version} port: ${port}`;
  }
}

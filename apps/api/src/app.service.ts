import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'Nutrexia Commerce API',
      timestamp: new Date().toISOString()
    };
  }
}

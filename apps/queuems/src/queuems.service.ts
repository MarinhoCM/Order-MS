import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueMsService {
  getHello(): string {
    return 'Hello World!';
  }
}

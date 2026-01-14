import { Controller, Get } from '@nestjs/common';
import { QueueMsService } from './queuems.service';

@Controller()
export class QueueMsController {
  constructor(private readonly queueMsService: QueueMsService) {}

  @Get()
  getHello(): string {
    return this.queueMsService.getHello();
  }
}

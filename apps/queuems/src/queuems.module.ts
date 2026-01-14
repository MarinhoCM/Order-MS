import { Module } from '@nestjs/common';
import { QueueMsController } from './queuems.controller';
import { QueueMsService } from './queuems.service';

@Module({
  imports: [],
  controllers: [QueueMsController],
  providers: [QueueMsService],
})
export class QueueMsModule {}

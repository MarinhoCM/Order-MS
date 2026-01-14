import { NestFactory } from '@nestjs/core';
import { QueueMsModule } from './queuems.module';

async function bootstrap() {
  const app = await NestFactory.create(QueueMsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

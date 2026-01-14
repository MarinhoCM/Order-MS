import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverConfig } from './config/settings.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))
  await app.listen(serverConfig.port).then((err) => {
    console.log(`
      ###################### Orders MS ######################
      \tLISTENING ON PORT: ${serverConfig.port}     
      \tRABBITMQ: order.ms.queue                          
      #######################################################
    `)
  });
}
bootstrap();

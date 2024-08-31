import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 3002;

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: '127.0.0.1',
  //     port: port,
  //   },
  // });

  const app = await NestFactory.create(AppModule);

  await app.listen(port, () => {
    console.log(`Service running on port: ${port}`);
  });
}

bootstrap();

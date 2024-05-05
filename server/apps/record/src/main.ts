import { NestFactory } from '@nestjs/core';
import { RecordModule } from './record.module';

async function bootstrap() {
  const app = await NestFactory.create(RecordModule);
  await app.listen(3000);
}
bootstrap();

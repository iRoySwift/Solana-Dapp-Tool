import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required().port().default(3001),
      }),
      envFilePath: ['./apps/record/.env'],
    }),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}

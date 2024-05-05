import { Injectable } from '@nestjs/common';

@Injectable()
export class RecordService {
  getHello(): string {
    return 'Hello World!';
  }
}

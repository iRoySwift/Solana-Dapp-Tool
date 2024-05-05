import { Test, TestingModule } from '@nestjs/testing';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

describe('RecordController', () => {
  let recordController: RecordController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecordController],
      providers: [RecordService],
    }).compile();

    recordController = app.get<RecordController>(RecordController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(recordController.getHello()).toBe('Hello World!');
    });
  });
});

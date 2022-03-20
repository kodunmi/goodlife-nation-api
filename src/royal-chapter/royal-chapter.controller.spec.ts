import { Test, TestingModule } from '@nestjs/testing';
import { RoyalChapterController } from './royal-chapter.controller';
import { RoyalChapterService } from './royal-chapter.service';

describe('RoyalChapterController', () => {
  let controller: RoyalChapterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoyalChapterController],
      providers: [RoyalChapterService],
    }).compile();

    controller = module.get<RoyalChapterController>(RoyalChapterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

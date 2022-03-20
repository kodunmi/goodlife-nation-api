import { Test, TestingModule } from '@nestjs/testing';
import { RoyalChapterService } from './royal-chapter.service';

describe('RoyalChapterService', () => {
  let service: RoyalChapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoyalChapterService],
    }).compile();

    service = module.get<RoyalChapterService>(RoyalChapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

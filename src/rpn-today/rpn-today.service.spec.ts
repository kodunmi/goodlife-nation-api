import { Test, TestingModule } from '@nestjs/testing';
import { RpnTodayService } from './rpn-today.service';

describe('RpnTodayService', () => {
  let service: RpnTodayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpnTodayService],
    }).compile();

    service = module.get<RpnTodayService>(RpnTodayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

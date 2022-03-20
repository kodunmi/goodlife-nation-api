import { Test, TestingModule } from '@nestjs/testing';
import { TenService } from './ten.service';

describe('TenService', () => {
  let service: TenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenService],
    }).compile();

    service = module.get<TenService>(TenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

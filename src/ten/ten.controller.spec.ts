import { Test, TestingModule } from '@nestjs/testing';
import { TenController } from './ten.controller';
import { TenService } from './ten.service';

describe('TenController', () => {
  let controller: TenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenController],
      providers: [TenService],
    }).compile();

    controller = module.get<TenController>(TenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

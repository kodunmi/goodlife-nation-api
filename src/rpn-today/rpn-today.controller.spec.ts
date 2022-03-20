import { Test, TestingModule } from '@nestjs/testing';
import { RpnTodayController } from './rpn-today.controller';
import { RpnTodayService } from './rpn-today.service';

describe('RpnTodayController', () => {
  let controller: RpnTodayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RpnTodayController],
      providers: [RpnTodayService],
    }).compile();

    controller = module.get<RpnTodayController>(RpnTodayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

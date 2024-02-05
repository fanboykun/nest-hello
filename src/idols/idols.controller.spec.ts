import { Test, TestingModule } from '@nestjs/testing';
import { IdolsController } from './idols.controller';
import { IdolsService } from './idols.service';

describe('IdolsController', () => {
  let controller: IdolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdolsController],
      providers: [IdolsService],
    }).compile();

    controller = module.get<IdolsController>(IdolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { IdolsService } from './idols.service';

describe('IdolsService', () => {
  let service: IdolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdolsService],
    }).compile();

    service = module.get<IdolsService>(IdolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

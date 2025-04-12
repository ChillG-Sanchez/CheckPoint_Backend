import { Test, TestingModule } from '@nestjs/testing';
import { PortaService } from './porta.service';

describe('PortaService', () => {
  let service: PortaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortaService],
    }).compile();

    service = module.get<PortaService>(PortaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

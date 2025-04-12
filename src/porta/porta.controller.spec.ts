import { Test, TestingModule } from '@nestjs/testing';
import { PortaController } from './porta.controller';
import { PortaService } from './porta.service';

describe('PortaController', () => {
  let controller: PortaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortaController],
      providers: [PortaService],
    }).compile();

    controller = module.get<PortaController>(PortaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

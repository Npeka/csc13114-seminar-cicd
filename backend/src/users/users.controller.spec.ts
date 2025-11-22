import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns message from service', () => {
    expect(controller.getMessage()).toEqual({
      message: 'Hello from UsersService',
    });
  });

  it('echos query messages', () => {
    expect(controller.echo('hey')).toEqual({ echoed: 'hey' });
  });

  it('gets and sets local value through controller', () => {
    const before = controller.getLocal();
    expect(before).toHaveProperty('local');
    controller.setLocal('controller-set');
    expect(controller.getLocal()).toEqual({ local: 'controller-set' });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns the demo message', () => {
    expect(service.getMessage()).toEqual({
      message: 'Hello from UsersService',
    });
  });

  it('echos provided messages', () => {
    expect(service.echo('hi')).toEqual({ echoed: 'hi' });
    expect(service.echo()).toEqual({ echoed: null });
  });

  it('gets and sets local value', () => {
    const first = service.getLocal();
    expect(first).toHaveProperty('local');
    expect(service.setLocal('new-val')).toEqual({ local: 'new-val' });
    expect(service.getLocal()).toEqual({ local: 'new-val' });
  });
});

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('message')
  getMessage() {
    return this.usersService.getMessage();
  }

  @Get('echo')
  echo(@Query('msg') msg?: string) {
    return this.usersService.echo(msg);
  }

  @Get('local')
  getLocal() {
    return this.usersService.getLocal();
  }

  @Post('local')
  setLocal(@Body('value') value: string) {
    return this.usersService.setLocal(value);
  }
}

import { Controller, Logger, UseGuards, Get, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  async getUser(data: any): Promise<User> {
    const value = await this.userService.findOne({ username: data.username });
    Logger.log('getUser - value:', value);
    return value;
  }

  @UseGuards(AuthGuard)
  @Get('greet')
  async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }

  @MessagePattern({ role: 'user', cmd: 'create' })
  @Post('create')
  async createUser(@Body() body: Partial<User>): Promise<any> {
    return this.userService.createUser(body);
  }
}

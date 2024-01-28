import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers() {
    const users = await this.userService.findAll();
    return {
      users,
    };
  }
}

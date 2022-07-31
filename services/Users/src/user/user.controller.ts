import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/user.dto';
import { isAuthGuard } from 'src/auth/guards/session.guard';
import { fortyTwoGuard } from 'src/auth/guards/fortytwo.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createLocal(@Body() localUser: JSON) {
  
    return this.userService.createLocal(localUser["username"], localUser["password"]);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }



  @Get()
  // @UseGuards(isAuthGuard)
  findAll(@Request() req) {
    return this.userService.findAll();
  }

  // @UseGuards(isAuthGuard)
  @Get(':id/')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  // @UseGuards(isAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

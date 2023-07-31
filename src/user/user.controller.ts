import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdatePasswordDto } from "./dto/create-user.dto";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  
  @Post()
  addUser(
    @Body() user: CreateUserDto
  ) {
    const newUser = this.userService.insertUser(
        user.login,
        user.password,
    );
    return newUser;
  }

  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) userId: string) {
    return this.userService.getSingleUser(userId);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body()
    updatePassword: UpdatePasswordDto
  ) {
    const updatedUser = this.userService.updateUser(userId, updatePassword.oldPassword, updatePassword.newPassword);
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  removeUser(@Param('id', ParseUUIDPipe) userId: string) {
      this.userService.deleteUser(userId);
      return null;
  }
}
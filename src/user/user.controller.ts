import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdatePasswordDto } from "./dto/create-user.dto";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  
  @Post()
 async addUser(
    @Body() user: CreateUserDto
  ) {
    const newUser = await this.userService.insertUser(
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
    console.log(updatePassword);
    return this.userService.updateUser(userId, updatePassword.oldPassword, updatePassword.newPassword);
    // return updatedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  removeUser(@Param('id', ParseUUIDPipe) userId: string) {
    console.log(userId);
    const response = this.userService.deleteUser(userId);
    console.log(response);
    return response;
  }
}
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdatePasswordDto } from "./dto/create-user.dto";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";

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
    return this.userService.updateUser(userId, updatePassword.oldPassword, updatePassword.newPassword);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'user successfully deleted',
  })
  async removeUser(@Param('id', ParseUUIDPipe) userId: string) {
    console.log(userId);
    const response = await this.userService.deleteUser(userId);
    console.log(response);
    return response;
  }
}
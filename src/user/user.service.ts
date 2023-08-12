import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserInstance } from './user.models';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
    private Users: UserInstance[] = [];

    constructor( private prisma: PrismaService){}

    async insertUser(login: string, userPassword: string): Promise<Omit<UserInstance, "password">> {
      const userId = uuidv4();
      // const newUser = new UserInstance(userId, login, userPassword, 1, Date.parse(new Date().toISOString()), Date.parse(new Date().toISOString()));
      const user = await this.prisma.user.create({
        data: {
          id: userId,
          login: login,
          password: userPassword,
          version: 1
        }
      })
      delete user.password;
      return user;
      // this.Users.push(newUser);
      // const {password, ...res} = newUser;
      // return res;
    }
  
    getUsers() {
      return [...this.Users];
    }
  
    getSingleUser(UserId: string): Omit<UserInstance, 'password'> {
      const user = this.findUser(UserId)[0];
      const {password, ...res} = user;
      return { ...res };
    }
  
    updateUser(UserId: string, oldPassword: string, newPassword: string) {
      // const [User, index] = this.findUser(UserId);
      // if (oldPassword !== User.password) {
      //   throw new HttpException('Password is incorrect', 403)
      // }
      // const updatedUser = { ...User, version: User.version + 1, updatedAt: Date.parse(new Date().toISOString())};
      //   updatedUser.password = newPassword;
      // this.Users[index] = updatedUser;
      // const {password, ...res} = updatedUser;
      // return { ...res };
    }
  
    deleteUser(userId: string) {
        const index = this.findUser(userId)[1];
        this.Users.splice(index, 1);
    }
  
    private findUser(id: string): [UserInstance, number] {
      const UserIndex = this.Users.findIndex(user => user.id === id);
      const User = this.Users[UserIndex];
      if (!User) {
        throw new NotFoundException('Could not find user.');
      }
      return [User, UserIndex];
    }
}
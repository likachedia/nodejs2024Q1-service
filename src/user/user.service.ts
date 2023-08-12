import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserInstance } from './user.models';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class UserService {
    private Users: UserInstance[] = [];

    constructor( private prisma: PrismaService){}

    async insertUser(login: string, userPassword: string): Promise<Omit<UserInstance, "password">> {
      try{
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
      } catch(error){
        if(error instanceof PrismaClientKnownRequestError){
          if(error.code === 'P20020'){
            throw new ForbiddenException("Credentials taken");
          }
        }
      }

      // this.Users.push(newUser);
      // const {password, ...res} = newUser;
      // return res;
    }
  
    async getUsers() {
      const users = await this.prisma.user.findMany();
      return users;
      // return [...this.Users];
    }
  
    async getSingleUser(userId: string): Promise<Omit<UserInstance, "password">> {
      const user = await this.findUser(userId);
      delete user.password;
      // const {password, ...res} = user;
      // return { ...res };
      return {...user};
    }
  
   async updateUser(userId: string, oldPassword: string, newPassword: string) {
      const user = await this.findUser(userId);

      if(!user) {
        throw new ForbiddenException("Credentials incorrect");
      }

      if (oldPassword !== user.password) {
        throw new HttpException('Password is incorrect', 403)
      }
      this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          password: newPassword
        }
      })
      delete user.password;
      return user;
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
  
    async deleteUser(userId: string) {
        const user = await this.findUser(userId);
        // this.Users.splice(index, 1);
        this.prisma.user.delete({
          where: {
            id: userId
          }
        })
    }
  
    private async findUser(id: string): Promise<UserInstance>{
      const user = await this.prisma.user.findUnique({
        where: {
          id: id
        }
      })
      if (!user) {
        throw new NotFoundException('Could not find user.');
      }
      return user;
    }
}
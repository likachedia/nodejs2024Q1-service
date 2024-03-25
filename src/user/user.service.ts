import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserInstance } from './user.models';
import { v4 as uuidv4, validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class UserService {
    private Users: UserInstance[] = [];

    constructor( private prisma: PrismaService){}
    // : Promise<Omit<UserInstance, "password">>
    async insertUser(login: string, userPassword: string) {
      if (!(login && userPassword))
      throw new BadRequestException('invalid credentials');

      try{
        const userId = uuidv4();
        const userData = {
          id: userId,
          login: login,
          password: userPassword,
          version: 1,
          updatedAt: Number(Date.now()),
          createdAt: Number(Date.now()),
        }
        await this.prisma.user.create({
          data: userData
        })
        delete userData.password;
        console.log(userData);
        return userData;
      } catch(error){
        if(error instanceof PrismaClientKnownRequestError){
          if(error.code === 'P20020'){
            throw new ForbiddenException("Credentials taken");
          }
        }
      }
    }
  
    async getUsers() {
      const users = await this.prisma.user.findMany();
      return users;
    }
  
    async getSingleUser(userId: string): Promise<Omit<UserInstance, "password">> {
      if (!validate(userId)) throw new BadRequestException('invalid id'); 
      const user = await this.findUser(userId);
      delete user.password;
      return {...user};
    }
  
   async updateUser(userId: string, oldPassword: string, newPassword: string) {
    // if (!validate(userId)) throw new BadRequestException('invalid id');  
    if (!(oldPassword && newPassword) || 
    (oldPassword && typeof oldPassword !== 'string')
    || (newPassword && typeof newPassword !== 'string')) {
      throw new BadRequestException('missing required fields');
    }
      const user = await this.findUser(userId);

      // if(!user) {
      //   throw new ForbiddenException("Credentials incorrect");
      // }
      const newData = {
        version: user.version++,
        createdAt: user.createdAt,
        updatedAt: Number(Date.now()),
        password: newPassword
      }
      if (oldPassword !== user.password) {
        throw new HttpException('Password is incorrect', 403)
      }
      await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          ...newData
        }
      })
      // delete user.password;
      return {
        ...newData,
        userId,
        login: user.login,
      };
    }
  
    async deleteUser(userId: string) {
      // if (!validate(userId)) throw new BadRequestException('invalid id');
        await this.findUser(userId);
        await this.prisma.user.delete({
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
      console.log(user, 'find');
      return user;
    }
}
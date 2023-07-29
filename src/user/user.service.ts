import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserInstance } from './user.models';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    private Users: UserInstance[] = [];

    insertUser(login: string, userPassword: string): Omit<UserInstance, 'password'> {
      const userId = uuidv4();
      const newUser = new UserInstance(userId, login, userPassword, 0, Date.parse(new Date().toISOString()), Date.parse(new Date().toISOString()));
      this.Users.push(newUser);
      const {password, ...res} = newUser;
      return res;
    }
  
    getUsers() {
      return [...this.Users];
    }
  
    getSingleUser(UserId: string): Omit<UserInstance, 'password'> {
      const user = this.findUser(UserId)[0];
      const {password, ...res} = user;
      return { ...res };
    }
  
    updateUser(UserId: string, oldPassword: string, newPassword: string):Omit<UserInstance, 'password'>  {
      const [User, index] = this.findUser(UserId);
      if (oldPassword !== User.password) {
        throw new HttpException('Password is incorrect', 403)
      }
      const updatedUser = { ...User, version: User.version++, updatedAt: Date.parse(new Date().toISOString())};

    //   if (newPassword) {
        updatedUser.password = newPassword;
    //   } else {
    //     throw new HttpException('', 404)
    //   }
      this.Users[index] = updatedUser;
      const {password, ...res} = updatedUser;
      return { ...res };
    }
  
    deleteUser(prodId: string) {
        const index = this.findUser(prodId)[1];
        this.Users.splice(index, 1);
    }
  
    private findUser(id: string): [UserInstance, number] {
      const UserIndex = this.Users.findIndex(prod => prod.id === id);
      const User = this.Users[UserIndex];
      if (!User) {
        throw new NotFoundException('Could not find user.');
      }
      return [User, UserIndex];
    }
}
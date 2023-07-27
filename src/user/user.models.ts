interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
}

export class UserInstance implements User{
    constructor(
       public id: string,
       public login: string,
       public password: string,
       public version: number,
       public createdAt: number,
       public updatedAt: number,
    ){}
}
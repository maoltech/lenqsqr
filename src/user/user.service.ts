import { Injectable } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepo) {}

    async getUserById(id: number): Promise<IUser> {
      return this.userRepo.getUserById(id);
    }
  
    async getUserByUsername(username: string): Promise<IUser> {
      return this.userRepo.getUserByUsername(username);
    }
}

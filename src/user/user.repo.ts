import { Injectable} from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ICreateUser, ISignInUser, IUser } from './user.interface';

@Injectable()
export class UserRepo {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    async createUser(payload: ICreateUser): Promise<IUser> {
      const [newUser] = await this.knex('Users')
        .insert({payload})
        .returning('*');
      return newUser;
    }
  
    async getUserById(id: number): Promise<IUser> {
      return this.knex('users')
        .where({ id })
        .first();
    }
  
    async getUserByEmail(email: string): Promise<ISignInUser> {
      return this.knex('users')
        .where({ email })
        .first();
    }
  
    async getUserByUsername(username: string): Promise<IUser> {
      return this.knex('users')
        .where({ username })
        .first();
    }
  
    async getAllUsers(): Promise<IUser[]> {
      return this.knex('users').select('*');
    }
  
    async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser> {
      const [updatedUser] = await this.knex('users')
        .where({ id })
        .update(updateData)
        .returning('*');
      return updatedUser;
    }
  
    async deleteUser(id: number): Promise<void> {
      await this.knex('users')
        .where({ id })
        .del();
    }
}
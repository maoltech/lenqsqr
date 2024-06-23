import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';
import {bcrypt} from 'bcrypt';
import { ICreateToken, ICreateUser } from './auth.interface';
import { AuthRepo } from './auth.repo';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepo: AuthRepo
      ) {}
    
    public async signup(payload: ICreateUser): Promise<any> {
    const user = await this.authRepo.getUserByEmail(payload.email);
    if (user) {
        throw new ConflictException('User already exists');
    }
    const {email, username, password} = payload
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.authRepo.createUser({
        email,
        username,
        password: hashedPassword,
    });
    return this.login(newUser);
    }

    public async signin(email: string, password: string): Promise<any> {
    const user = await this.authRepo.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
    }
    return this.login(user);
    }

    public async onboardProcess(userId: string, onboardData: any): Promise<any> {
    return this.authRepo.updateUser(userId, onboardData);
    }

    private async login(payload: ICreateToken) {
    return {
        access_token: this.jwtService.createToken(payload),
    };
    }
}

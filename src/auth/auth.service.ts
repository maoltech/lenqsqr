import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import {bcrypt} from 'bcrypt';
import { ICreateToken} from '../user/user.interface';
import { UserRepo } from 'src/user/user.repo';
import { CreateUserDto, LoginUserDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepo: UserRepo
      ) {}
    
    public async signup(payload: CreateUserDto): Promise<any> {
    const user = await this.userRepo.getUserByEmail(payload.email);
    if (user) {
        throw new ConflictException('User already exists');
    }
    const {email, username, password} = payload
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepo.createUser({
        email,
        username,
        password: hashedPassword,
    });
    return this.login(newUser);
    }

    public async signin(payload: LoginUserDto): Promise<any> {
    const user = await this.userRepo.getUserByEmail(payload.email);
    if (!user || !(await bcrypt.compare(payload.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
    }
    return this.login(user);
    }

    public async onboardProcess(userId: string, onboardData: any): Promise<any> {
    return this.userRepo.updateUser(userId, onboardData);
    }

    private async login(payload: ICreateToken) {
    return {
        access_token: this.jwtService.createToken(payload),
    };
    }

    public async completeRegistration(userId: string){
        return await this.userRepo.updateUser(userId, {
            isOnboarded: true
        })
    }
}

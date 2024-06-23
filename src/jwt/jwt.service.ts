import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: NestJwtService){}

    public createToken = async (payload:any): Promise<string> => {
        return this.jwtService.signAsync(payload);
    }

    public verifyToken = async (token:string): Promise<any> => {
        try {
            return await this.jwtService.verify(token);
        } catch (error) {
            throw new Error('Token verification failed');
        }
    }
}

import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { WalletService } from './wallet.service';
import { IWalletReponse } from './wallet.interface';

@Controller('wallet')
@UseGuards(AuthMiddleware)

export class WalletController {
    constructor(private readonly walletService: WalletService) {}
    @Get('user')
    public async getWalletByUserId(@Req() req: Request, @Res() res: Response): Promise<any> {
      const userId = req['user'].id;
      const wallet = await this.walletService.GetWalletByUserId(userId);
      if(!wallet){
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Wallet not found'
        });
      }
      return res.status(HttpStatus.OK).json(wallet);
    }
  
    @Get('email')
    public async getWalletByEmail(@Req() req: Request, @Res() res: Response): Promise<any> {
      const email = req['user'].email;
      const wallet = await this.walletService.GetWalletByEmail(email);
      if(!wallet){
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Wallet not found'
        });
      }
      return res.status(HttpStatus.OK).json(wallet);
    }
}

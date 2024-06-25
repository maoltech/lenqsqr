import { Controller, Post, Get, Body, Param, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ITransactionResponse } from './transaction.interface';
import { CreateTransferDto, CreateWithdrawDto, CreateDepositDto } from './transaction.dto';
import { Request, Response } from 'express';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Controller('transaction')
@UseGuards(AuthMiddleware)
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Post('transfer')
    public async transfer(@Req() req: Request, @Res() res: Response ): Promise<Response> {
        const transferDto: CreateTransferDto = req.body;
        const userId = req['user'].id;
        try {
           const response = await this.transactionService.transfer(userId, transferDto); 
           return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message)
        }
         
    }

    @Post('withdraw')
    public async withdraw(@Req() req: Request, @Res() res: Response): Promise<Response> {
        
        const userId = req['user'].id;
        const { amount }: CreateWithdrawDto = req.body;

        try {
            const response = await this.transactionService.withdraw(userId, amount);
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
        
    }

    @Post('deposit')
    public async deposit(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const userId = req['user'].id;
        const { amount }: CreateDepositDto = req.body;
        try {
            const response = await this.transactionService.deposit(userId, amount);
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
        
    }

    @Get(':transactionId')
    public async getTransactionById(@Param('transactionId') transactionId: string): Promise<ITransactionResponse> {
        
        return await this.transactionService.getTransactionById(transactionId);
    }

    @Get('user/:userId')
    public async getTransactionsByUserId(@Param('userId') userId: string): Promise<ITransactionResponse[]> {
        return await this.transactionService.getTransactionsByUserId(userId);
    }

    @Get('wallet/:walletId')
    public async getTransactionsByWalletId(@Param('walletId') walletId: string): Promise<ITransactionResponse[]> {
        return await this.transactionService.getTransactionsByWalletId(walletId);
    }
}

import { Controller, Post, Get, Body, Param, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ITransactionResponse } from './transaction.interface';
import { CreateTransferDto, CreateWithdrawDto, CreateDepositDto } from './transaction.dto';
import { Request, Response } from 'express';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';

@Controller('transaction')
@UseGuards(AuthMiddleware)
export class TransactionController {
    constructor(
        private transactionService: TransactionService, 
        private flutterWaveService: FlutterwaveService
    ) {}

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
    public async getTransactionById(@Req() req: Request, @Res() res: Response): Promise<Response> {
        try {
            const response = await this.transactionService.getTransactionById(req.params.transactionId);
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        };
    }

    @Get('user')
    public async getTransactionsByUserId(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const userId = req['user'].id;
        try {
            const response = await this.transactionService.getTransactionsByUserId(userId);
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        };
    }

    @Get('wallet/:walletId')
    public async getTransactionsByWalletId(@Req() req: Request, @Res() res: Response): Promise<Response> {
        try {
            const response = await this.transactionService.getTransactionsByWalletId(req.params.walletId);
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        };;
    }
}

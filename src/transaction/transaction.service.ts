import { Injectable } from '@nestjs/common';
import { ITransaction, ITransactionResponse, ITransfer, transactionDescriptionType, transactionStatusType, transactionType } from './transaction.interface';
import { IWalletReponse } from 'src/wallet/wallet.interface';
import { TransactionRepo } from './transaction.repo';
import { WalletRepo } from 'src/wallet/wallet.repo';
import { UserRepo } from 'src/user/user.repo';

@Injectable()
export class TransactionService {
    constructor(
        private transactionRepo: TransactionRepo, 
        private walletRepo: WalletRepo,
        private userRepo: UserRepo
    ) {}

    public async transfer(userIdFrom: string, payload: ITransfer): Promise<ITransactionResponse> {
        
        const {amount, emailTo, narration} = payload
        const senderWallet: IWalletReponse = await this.walletRepo.DebitWallet(userIdFrom, amount);
        const user = await this.userRepo.getUserByEmail(emailTo)
        const receiverWallet: IWalletReponse = await this.walletRepo.CreditWallet(user.id, amount);

        const senderTransactionPayload: ITransaction = {
            type: transactionType.debit,
            reference: `transfer-${Date.now()}`,
            amount,
            narration,
            description: transactionDescriptionType.transfer,
            currency: 'NGN',
            status: transactionStatusType.success,
            accountNumber: senderWallet.accountNumber,
            user_id: userIdFrom,
            wallet_id: senderWallet.Id,
            isActive: true,
            isDeleted: false,
        };

        const receiverTransactionPayload: ITransaction = {
            type: transactionType.credit,
            reference: `transfer-${Date.now()}`,
            amount,
            narration,
            description: transactionDescriptionType.transfer,
            currency: 'NGN',
            status: transactionStatusType.success,
            accountNumber: senderWallet.accountNumber,
            user_id: user.id,
            wallet_id: receiverWallet.Id,
            isActive: true,
            isDeleted: false,
        };
        await this.transactionRepo.CreateTransaction(receiverTransactionPayload)
        return await this.transactionRepo.CreateTransaction(senderTransactionPayload);
    }

    public async withdraw(userId: string, amount: number): Promise<ITransactionResponse> {

        const userWallet: IWalletReponse = await this.walletRepo.DebitWallet(userId, amount);

        const transactionPayload: ITransaction = {
            type: transactionType.debit,
            reference: `withdrawal-${Date.now()}`,
            amount,
            description: transactionDescriptionType.withdrawal,
            currency: 'NGN',
            status: transactionStatusType.success,
            accountNumber: userWallet.accountNumber,
            user_id: userId,
            wallet_id: userWallet.Id,
            isActive: true,
            isDeleted: false,
        };

        return await this.transactionRepo.CreateTransaction(transactionPayload);
    }

    public async deposit(userId: string, amount: number): Promise<ITransactionResponse> {
    
        const userWallet: IWalletReponse = await this.walletRepo.CreditWallet(userId, amount);
        
        const transactionPayload: ITransaction = {
            type: transactionType.credit,
            reference: `deposit-${Date.now()}`,
            amount,
            description: transactionDescriptionType.deposit,
            currency: 'NGN',
            status: transactionStatusType.success,
            accountNumber: userWallet.accountNumber,
            user_id: userId,
            wallet_id: userWallet.Id,
            isActive: true,
            isDeleted: false,
        };

        return await this.transactionRepo.CreateTransaction(transactionPayload);
    }

    public async getTransactionById(transactionId: string): Promise<ITransactionResponse> {
        return await this.transactionRepo.GetTransactionById(transactionId);
    }

    public async getTransactionsByUserId(userId: string): Promise<ITransactionResponse[]> {
        return await this.transactionRepo.GetTransactionsByUserId(userId);
    }

    public async getTransactionsByWalletId(walletId: string): Promise<ITransactionResponse[]> {
        return await this.transactionRepo.GetTransactionsByWalletId(walletId);
    }
}

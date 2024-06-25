import { Injectable } from '@nestjs/common';
import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';
import { WalletRepo } from './wallet.repo';
import { ICreateWallet, IWalletReponse } from './wallet.interface';

@Injectable()
export class WalletService {

    constructor (private walletrepo: WalletRepo, private flutterwaveService: FlutterwaveService){}

    public CreateWallet = async(payload: ICreateWallet): Promise<IWalletReponse> => {
        const { email, username, name, id } = payload;
        const wallet = await this.flutterwaveService.CreateVirtualAccount(email)
        const {account_number, bank_name, order_ref} = wallet;
        const walletPayload: ICreateWallet = {
            username,
            email,
            name,
            userId: id,
            accountNuber: account_number,
            bankName: bank_name,
            reference: order_ref
        }
        return await this.walletrepo.CreateWallet(walletPayload)
    }

    public GetWalletByUserId = async(userId: string): Promise<IWalletReponse> => {
        return await this.walletrepo.GetWallet(userId)
    }

    public GetWalletById = async(walletId: string): Promise<IWalletReponse> => {
        return await this.walletrepo.GetWalletById(walletId)
    }

    public GetWalletByEmail = async(email: string): Promise<IWalletReponse> => {
        return await this.walletrepo.GetWalletByEmail(email)
    }

    public CreditWallet = async(userId: string, amount: number): Promise<IWalletReponse> => {
        return await this.walletrepo.CreditWallet(userId, amount);
    }

    public DebitWallet = async(userId: string, amount: number): Promise<IWalletReponse> => {
        return await this.walletrepo.DebitWallet(userId, amount);
    }
}

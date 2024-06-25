import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { ICreateWallet, IWalletReponse } from "./wallet.interface";


@Injectable()
export class WalletRepo {

    constructor(private knex: Knex){}
    public CreateWallet = async(payload: ICreateWallet): Promise<IWalletReponse> => {
        return await this.knex('wallet').insert(payload)
    }

    public GetWallet = async(userId: string): Promise<IWalletReponse> => {
        return await this.knex('wallet').where({userId}).first()
    }
    public UpdateWallet = async(userId: string, payload: ICreateWallet): Promise<any> => {
        return await this.knex('wallet').where({userId}).update(payload).returning('*')
    }

    public GetWalletById = async (id :string): Promise<IWalletReponse> => {
        return await this.knex('wallet').where({id}).first()
    }

    public GetWalletByEmail = async (email :string): Promise<IWalletReponse> => {
        return await this.knex('wallet').where({email}).first()
    }

    public DeleteWallet = async (id :string): Promise<any> => {
        return await this.knex('wallet').where({id}).del()
    }

    public DeleteWalletByEmail = async (email :string): Promise<any> => {
        return await this.knex('wallet').where({email}).del()
    }

    public GetAllWallet = async (): Promise<IWalletReponse[]> => {
        return await this.knex('wallet').select('*')
    }

    public CreditWallet = async(userId: string, amount: number): Promise<IWalletReponse> => {
        return await this.knex('wallet')
            .where({ userId })
            .increment('balance', amount)
            .increment('totalRecieved', amount)
            .increment('totalTransaction', 1)
            .increment('totalCreditTransaction', 1)
            .returning('*')
            .then(rows => rows[0]);
    }

    public DebitWallet = async(userId: string, amount: number): Promise<IWalletReponse> => {
        return await this.knex('wallet')
            .where({ userId })
            .decrement('balance', amount)
            .increment('totalSpent', amount)
            .increment('totalTransaction', 1)
            .increment('totalDebitTransaction', 1)
            .returning('*')
            .then(rows => rows[0]);
    }

}
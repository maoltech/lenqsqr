import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { ITransaction, ITransactionResponse } from "./transaction.interface";


@Injectable()
export class TransactionRepo {
    constructor(private knex: Knex) {}

    public CreateTransaction = async(payload: ITransaction): Promise<ITransactionResponse> => {
        return await this.knex('Transaction').insert(payload).returning('*').then(rows => rows[0]);
    }

    public GetTransactionById = async(id: string): Promise<ITransactionResponse> => {
        return await this.knex('Transaction').where({ id }).first();
    }

    public GetTransactionsByUserId = async(userId: string): Promise<ITransactionResponse[]> => {
        return await this.knex('Transaction').where({ user_id: userId });
    }

    public GetTransactionsByWalletId = async(walletId: string): Promise<ITransactionResponse[]> => {
        return await this.knex('Transaction').where({ wallet_id: walletId });
    }

    public UpdateTransactionStatus = async(id: string, status: string): Promise<ITransactionResponse> => {
        return await this.knex('Transaction').where({ id }).update({ status }).returning('*').then(rows => rows[0]);
    }

    public DeleteTransaction = async(id: string): Promise<void> => {
        await this.knex('Transaction').where({ id }).del();
    }
}
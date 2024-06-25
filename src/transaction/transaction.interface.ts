export interface ITransaction {
    id?: string;
    type: transactionType;
    reference: string;
    amount: number;
    currency: string;
    description: transactionDescriptionType;
    narration?: string;
    status: transactionStatusType;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    accountType?: string;
    bankBranch?: string;
    swiftCode?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    user_id: string;
    wallet_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITransactionResponse extends ITransaction {}

export enum transactionType {
    credit = 'credit',
    debit = 'debit'
}

export enum transactionStatusType {
    pending = 'pending',
    success ='success',
    failed = 'failed'
}

export enum transactionDescriptionType {
    deposit = 'deposit',
    withdrawal = 'withdrawal',
    transfer = 'transfer'
}

export interface ITransfer{ 
    emailTo: string, 
    amount: number, 
    narration?: string
}
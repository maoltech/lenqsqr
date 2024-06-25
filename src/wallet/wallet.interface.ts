
export interface ICreateWallet {
    email: string,
    id?: string,
    name: string,
    accountNuber?: string,
    username?: string,
    bankName?: string,
    reference?: string,
    userId?: string
}

export interface IWalletReponse {
    Id: string,
    email: string,
    userId: string,
    name: string,
    accountNumber?: string,
    username?: string,
    bankName?: string,
    reference?: string,
    balance?: number,
    createdAt?: Date,
    updatedAt?: Date,
    totalRecieved?: number,
    totalSpent?: number,
    totalTransaction?: number,
    totalCreditTransaction?: number,
    totalDebitTransaction?: number
    
}
export interface IBankTransfer {
    account_bank: string,
    account_number: string,
    amount: number,
    currency: string,
    narration: string,
    reference: string
}

export interface IWithdraw{
    id: number,
    account_number: string,
    bank_code: string,
    full_name: string,
    created_at: string,
    currency: string,
    debit_currency: string,
    amount: number,
    fee: number,
    status: string,
    reference: string,
    meta: string,
    narration: string,
    complete_message: string,
    requires_approval: number,
    is_approved: number,
    bank_name: string
}

export interface ICreateAccount{
    response_code: string,
    response_message: string,
    order_ref: string,
    account_number: string,
    bank_name: string,
    amount: null
}
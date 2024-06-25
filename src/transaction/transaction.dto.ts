import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateTransferDto {
    userIdFrom: string;

    @IsEmail()
    @IsNotEmpty()
    emailTo: string;

    amount: number;
    narration?: string;
}

export class CreateWithdrawDto {
    amount: number;
}

export class CreateDepositDto {
    amount: number;
}
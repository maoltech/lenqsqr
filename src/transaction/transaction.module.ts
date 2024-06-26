import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { WalletModule } from 'src/wallet/wallet.module';
import { UserModule } from 'src/user/user.module';
import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';
import { FlutterwaveModule } from 'src/flutterwave/flutterwave.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [WalletModule, UserModule, FlutterwaveModule, AuthModule],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}

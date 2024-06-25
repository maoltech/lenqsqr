import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import {FlutterwaveModule} from 'src/flutterwave/flutterwave.module';

@Module({
  imports: [FlutterwaveModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule {}

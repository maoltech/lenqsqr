import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule }  from 'nestjs-knex';
import config from 'src/config/knex.config';

@Module({
    imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [config],
      isGlobal: true,
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        config: configService.get('knex'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})

export class DbModule {}



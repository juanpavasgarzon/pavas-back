import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerConfig } from './throttler.config';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        ThrottlerConfig.create(configService),
      inject: [ConfigService],
    }),
  ],
})
export class ThrottlerConfigModule {}

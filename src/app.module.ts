import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './common/guards';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { ClientsModule } from './modules/clients/clients.module';
import { QuotationsModule } from './modules/quotations/quotations.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.getOrThrow<number>('app.throttle.ttl'),
          limit: configService.getOrThrow<number>('app.throttle.limit'),
        },
      ],
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CatalogModule,
    ClientsModule,
    QuotationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}

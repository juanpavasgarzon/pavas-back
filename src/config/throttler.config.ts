import { ConfigService } from '@nestjs/config';

export class ThrottlerConfig {
  static create(configService: ConfigService) {
    return [
      {
        ttl: configService.getOrThrow<number>('app.throttle.ttl'),
        limit: configService.getOrThrow<number>('app.throttle.limit'),
      },
    ];
  }
}

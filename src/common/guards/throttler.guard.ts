import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Request): Promise<string> {
    const forwardedFor = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];

    if (typeof forwardedFor === 'string') {
      return Promise.resolve(forwardedFor.split(',')[0].trim());
    }
    if (Array.isArray(forwardedFor)) {
      return Promise.resolve(forwardedFor[0].split(',')[0].trim());
    }
    if (typeof realIp === 'string') {
      return Promise.resolve(realIp);
    }
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    return Promise.resolve(ip);
  }

  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    return super.shouldSkip(context);
  }
}

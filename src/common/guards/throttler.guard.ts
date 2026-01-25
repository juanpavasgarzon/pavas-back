import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Request): Promise<string> {
    const forwardedFor = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];

    let ip: string;

    if (typeof forwardedFor === 'string') {
      ip = forwardedFor.split(',')[0].trim();
    } else if (Array.isArray(forwardedFor)) {
      ip = forwardedFor[0].split(',')[0].trim();
    } else if (typeof realIp === 'string') {
      ip = realIp;
    } else {
      ip = req.ip || req.socket.remoteAddress || 'unknown';
    }

    return Promise.resolve(ip);
  }

  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    return super.shouldSkip(context);
  }
}

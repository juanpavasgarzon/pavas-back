import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IUser } from 'src/modules/users';
import { RolePermissions } from '../constants/role-permissions.constant';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';
import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as IUser;
    if (!user || !user.role) {
      throw new ForbiddenException('Access denied');
    }

    const userPermissions = this.getUserPermissions([user.role]);
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }

  private getUserPermissions(roles: Role[]): Permission[] {
    const permissions = new Set<Permission>();

    for (const role of roles) {
      const rolePermissions = RolePermissions[role] || [];
      rolePermissions.forEach((p) => permissions.add(p));
    }

    return Array.from(permissions);
  }
}

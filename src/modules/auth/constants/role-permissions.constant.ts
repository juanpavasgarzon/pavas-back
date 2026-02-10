import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';

export const RolePermissions: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: Object.values(Permission),
  [Role.ADMIN]: [
    Permission.PROFILE_READ,
    Permission.USERS_READ,
    Permission.USERS_CREATE,
    Permission.USERS_UPDATE,
    Permission.PRODUCTS_READ,
    Permission.PRODUCTS_CREATE,
    Permission.PRODUCTS_UPDATE,
    Permission.QUOTATIONS_READ,
    Permission.QUOTATIONS_CREATE,
    Permission.CLIENTS_READ,
    Permission.CLIENTS_CREATE,
    Permission.CLIENTS_UPDATE,
    Permission.CLIENTS_DELETE,
  ],
  [Role.USER]: [
    Permission.PROFILE_READ,
    Permission.PRODUCTS_READ,
    Permission.QUOTATIONS_READ,
    Permission.QUOTATIONS_CREATE,
    Permission.CLIENTS_READ,
    Permission.CLIENTS_CREATE,
    Permission.CLIENTS_UPDATE,
  ],
};

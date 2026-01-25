export enum Permission {
  // Auth
  PROFILE_READ = 'auth.profile.read',

  // Users
  USERS_READ = 'users.users.read',
  USERS_CREATE = 'users.users.create',
  USERS_UPDATE = 'users.users.update',
  USERS_DELETE = 'users.users.delete',

  // Products
  PRODUCTS_READ = 'catalog.products.read',
  PRODUCTS_CREATE = 'catalog.products.create',
  PRODUCTS_UPDATE = 'catalog.products.update',
  PRODUCTS_DELETE = 'catalog.products.delete',
}

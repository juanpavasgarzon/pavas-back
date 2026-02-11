export enum Permission {
  PROFILE_READ = 'auth.profile.read',

  USERS_READ = 'users.users.read',
  USERS_CREATE = 'users.users.create',
  USERS_UPDATE = 'users.users.update',
  USERS_DELETE = 'users.users.delete',

  PRODUCTS_READ = 'catalog.products.read',
  PRODUCTS_CREATE = 'catalog.products.create',
  PRODUCTS_UPDATE = 'catalog.products.update',
  PRODUCTS_DELETE = 'catalog.products.delete',

  SERVICES_READ = 'catalog.services.read',
  SERVICES_CREATE = 'catalog.services.create',
  SERVICES_UPDATE = 'catalog.services.update',
  SERVICES_DELETE = 'catalog.services.delete',

  QUOTATIONS_READ = 'quotations.quotations.read',
  QUOTATIONS_CREATE = 'quotations.quotations.create',
  QUOTATIONS_UPDATE = 'quotations.quotations.update',

  CLIENTS_READ = 'clients.clients.read',
  CLIENTS_CREATE = 'clients.clients.create',
  CLIENTS_UPDATE = 'clients.clients.update',
  CLIENTS_DELETE = 'clients.clients.delete',

  SALES_READ = 'sales.sales.read',
  SALES_CREATE = 'sales.sales.create',
  SALES_UPDATE = 'sales.sales.update',

  SUPPLIERS_READ = 'suppliers.suppliers.read',
  SUPPLIERS_CREATE = 'suppliers.suppliers.create',
  SUPPLIERS_UPDATE = 'suppliers.suppliers.update',
  SUPPLIERS_DELETE = 'suppliers.suppliers.delete',

  INVENTORY_READ = 'inventory.inventory.read',
  INVENTORY_CREATE = 'inventory.inventory.create',

  PURCHASE_ORDERS_READ = 'purchase-orders.purchase-orders.read',
  PURCHASE_ORDERS_CREATE = 'purchase-orders.purchase-orders.create',
  PURCHASE_ORDERS_UPDATE = 'purchase-orders.purchase-orders.update',

  PURCHASES_READ = 'purchases.purchases.read',
  PURCHASES_CREATE = 'purchases.purchases.create',

  INVOICES_READ = 'invoices.invoices.read',
  INVOICES_CREATE = 'invoices.invoices.create',

  REPORTS_READ = 'reports.reports.read',
}

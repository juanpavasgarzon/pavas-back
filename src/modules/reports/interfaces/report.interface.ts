export interface TopProductItem {
  productId: string;
  description: string;
  totalQuantity: number;
  totalAmount: number;
}

export interface SalesByPeriodResult {
  totalSales: number;
  count: number;
  from: string;
  to: string;
}

export interface LowStockProductItem {
  id: string;
  code: string;
  name: string;
  currentStock: number;
  minimumStock: number;
}

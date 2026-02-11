import { BadRequestException, Injectable } from '@nestjs/common';
import { ItemType } from 'src/common/enums/item-type.enum';
import { CatalogService } from 'src/modules/catalog/services/catalog.service';
import { MovementType } from 'src/modules/inventory/enums/movement-type.enum';
import { InventoryReferenceType } from 'src/modules/inventory/enums/reference-type.enum';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';
import { SaleStatus } from '../enums/sale-status.enum';
import type { ISale } from '../interfaces/sale.interface';
import { SalesService } from '../services/sales.service';

@Injectable()
export class ConfirmSaleUseCase {
  constructor(
    private readonly salesService: SalesService,
    private readonly catalogService: CatalogService,
    private readonly inventoryService: InventoryService,
  ) {}

  async execute(id: string): Promise<ISale> {
    const sale = await this.salesService.findById(id, true);
    if (sale.status !== SaleStatus.DRAFT) {
      throw new BadRequestException('Only draft sales can be confirmed');
    }

    const movementDate = sale.saleDate ?? new Date();

    for (const item of sale.items ?? []) {
      if (item.itemType !== ItemType.PRODUCT || !item.itemId) {
        continue;
      }
      const product = await this.catalogService.getProductById(item.itemId);
      if (!product || !product.managesInventory) {
        continue;
      }

      const qty = Number(item.quantity);
      await this.inventoryService.createMovement(
        {
          productId: item.itemId,
          type: MovementType.OUT,
          quantity: qty,
          referenceType: InventoryReferenceType.SALE,
          referenceId: sale.id,
          movementDate,
          notes: `Venta ${sale.number}`,
        },
        sale.createdById,
      );
    }

    return this.salesService.updateStatus(id, SaleStatus.CONFIRMED);
  }
}

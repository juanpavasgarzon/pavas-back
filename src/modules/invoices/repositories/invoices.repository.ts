import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import type {
  CreateInvoiceData,
  IInvoice,
} from '../interfaces/invoice.interface';

@Injectable()
export class InvoicesRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>,
  ) {}

  createQueryBuilder(alias: string = 'invoice'): SelectQueryBuilder<Invoice> {
    return this.repository.createQueryBuilder(alias);
  }

  async findById(id: string): Promise<IInvoice | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['client', 'sale'],
    });
  }

  async create(data: CreateInvoiceData): Promise<IInvoice> {
    const number = await this.getNextNumber();
    const entity = this.repository.create({ ...data, number });
    return this.repository.save(entity);
  }

  async getNextNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `FAC-${year}-`;

    const last = await this.repository
      .createQueryBuilder('i')
      .where('i.number LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('i.number', 'DESC')
      .getOne();

    if (!last) {
      return `${prefix}0001`;
    }

    const lastNum = parseInt(last.number.replace(prefix, ''), 10) || 0;
    return `${prefix}${String(lastNum + 1).padStart(4, '0')}`;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from './products.entity';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDTO,
  ): Promise<ProductsEntity> {
    return await this.productsRepository.save(createProductDto);
  }

  public async getProducts(): Promise<ProductsEntity[]> {
    return await this.productsRepository.find();
  }

  public async deleteProduct(productId: number): Promise<void> {
    await this.productsRepository.delete(productId);
  }
}
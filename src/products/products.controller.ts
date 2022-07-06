import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductsEntity } from './products.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  public async createProduct(
    @Body() createProductDto: CreateProductDTO,
  ): Promise<ProductsEntity> {
    const product = await this.productsService.createProduct(createProductDto);
    return product;
  }

  @Get('all')
  public async getProducts(): Promise<ProductsEntity[]> {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Delete('/delete/:productId')
  public async deleteProduct(@Param('productId') productId: number) {
    const deletedProduct = await this.productsService.deleteProduct(productId);
    return deletedProduct;
  }
}
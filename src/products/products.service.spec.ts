import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsEntity } from './products.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductService', () => {
  let productService;
  let productRepository;
  const mockProductRepository = () => ({
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductsEntity),
          useFactory: mockProductRepository,
        },
      ],
    }).compile();
    productService = await module.get<ProductsService>(ProductsService);
    productRepository = await module.get(getRepositoryToken(ProductsEntity));
  });

  describe('createProduct', () => {
    it('should save a product in the database', async () => {
      productRepository.save.mockResolvedValue('someProduct');
      expect(productRepository.save).not.toHaveBeenCalled();
      const createProductDto = {
        name: 'sample name',
        description: 'sample description',
        price: 'sample price',
      };
      const result = await productService.createProduct(createProductDto);
      expect(productRepository.save).toHaveBeenCalledWith(
        createProductDto,
      );
      expect(result).toEqual('someProduct');
    });
  });

  describe('getProducts', () => {
    it('should get all products', async () => {
      productRepository.find.mockResolvedValue('someProducts');
      expect(productRepository.find).not.toHaveBeenCalled();
      const result = await productService.getProducts();
      expect(productRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someProducts');
    });
  });

  describe('deleteProduct', () => {
    it('should delete product', async () => {
      productRepository.delete.mockResolvedValue(1);
      expect(productRepository.delete).not.toHaveBeenCalled();
      await productService.deleteProduct(1);
      expect(productRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
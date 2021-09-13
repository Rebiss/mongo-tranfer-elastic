import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto, UpdateProductDto } from './dto/';
import { Product, ProductDocument } from '../other/schemas';
import { Model } from 'mongoosastic';

@Injectable()
export class ProductsService {
  private logger = new Logger('ProductsService');
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  public async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  public async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  public async create(productDto: CreateProductDto): Promise<Product> {
    this.logger.log('CREATE');
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }

  public async remove(id: string): Promise<Product> {
    this.logger.log('REMOVE', id);
    return this.productModel.findByIdAndRemove(id);
  }

  public async update(
    id: string,
    productDto: UpdateProductDto,
  ): Promise<Product> {
    this.logger.log('UPDATE', id);
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}

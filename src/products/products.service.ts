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

  public async search(text: string): Promise<string[]> {
    this.logger.log('>>>>>>>>>>>>>', text);
    return new Promise((resolve, reject) => {
      this.productModel.esSearch(
        {
          from: 0,
          size: 10,
          query: {
            regexp: {
              title: {
                value: `.*${text}.*`,
                flags: 'ALL',
                case_insensitive: true,
                max_determinized_states: 10000,
              },
            },
          },
        },
        function (err: Error, titles) {
          if (err) {
            return reject(err);
          }
          this.logger.log('>>>>>>TEXT', titles);

          return resolve(titles.hits.hits.map((item) => item._source.title));
        },
      );
    });
  }

  public async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  public async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  public async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }

  public async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  public async update(
    id: string,
    productDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoosastic';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async search(text: string): Promise<string[]> {
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
        function (err, titles) {
          if (err) {
            return reject(err);
          }

          return resolve(titles.hits.hits.map((item) => item._source.title));
        },
      );
    });
  }

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}

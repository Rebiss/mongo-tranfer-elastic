import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import * as mongoosastic from 'mongoosastic';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema.plugin(mongoosastic, {
          hosts: ['localhost:9200'],
        }),
      },
    ]),
  ],
})
export class ProductsModule {}

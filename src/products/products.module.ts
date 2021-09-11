import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosastic from 'mongoosastic';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import * as elasticsearch from 'elasticsearch';
import { ELASTIC } from './../constant/';

const esClient = new elasticsearch.Client({ host: ELASTIC.HOSTS });

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema.plugin(mongoosastic, {
          esClient: esClient,
          // host: ELASTIC.VM_HOST,
          // port: ELASTIC.PORT,
          // protocol: ELASTIC.PROTOCOL,
        }),
      },
    ]),
  ],
})
export class ProductsModule {}

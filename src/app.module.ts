import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ElasticService } from './elastic/elastic.service';
import { ElasticController } from './elastic/elastic.controller';
import { ElasticModule } from './elastic/elastic.module';
import { MONGO } from './constant/';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(MONGO.HOST), ElasticModule],
  controllers: [ElasticController],
  providers: [ElasticService],
})
export class AppModule {}

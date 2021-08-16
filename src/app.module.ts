import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ElasticService } from './elastic/elastic.service';
import { ElasticController } from './elastic/elastic.controller';
import { ElasticModule } from './elastic/elastic.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/story'),
    ElasticModule,
  ],
  controllers: [AppController, ElasticController],
  providers: [AppService, ElasticService],
})
export class AppModule {}

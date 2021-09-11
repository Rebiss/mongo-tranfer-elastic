import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/';
import { ProductsService } from './products.service';
import { Product } from '../other/schemas/product.schema';

@Controller('products')
export class ProductsController {
  private logger = new Logger('ProductsController');
  constructor(private readonly productsService: ProductsService) {}

  @Get('/search')
  search(@Query('query') query: string): Promise<any> {
    this.logger.log(query);

    return this.productsService.search(query);
  }

  //
  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }
}

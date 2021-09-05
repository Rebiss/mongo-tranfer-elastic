import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ElasticService } from './elastic.service';

@Controller('elastic')
export class ElasticController {
  private logger = new Logger('ElasticController');
  constructor(private readonly elasticService: ElasticService) {}

  @Get('/search')
  async searchData(@Query('q') q: string) {
    this.logger.log(q);
    return await this.elasticService.searchIndex(q);
  }
}

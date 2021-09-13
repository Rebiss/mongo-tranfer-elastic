import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ElasticService } from './elastic.service';

@Controller('elastic')
export class ElasticController {
  private logger = new Logger('ElasticController');
  constructor(private readonly elasticService: ElasticService) {}

  @Get('/search')
  async searchData(@Query('q') q: string): Promise<any> {
    try {
      const query = q.split('/'),
        _field = query[1],
        _query = query[0];

      return await this.elasticService.searchIndex(_query, _field);
    } catch (err) {
      console.log(err);
    }
  }
}

import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ElasticService } from './elastic.service';

@Controller('elastic')
export class ElasticController {
  private logger = new Logger('ElasticController');
  constructor(private readonly elasticService: ElasticService) {}

  @Get('/search')
  public async searchData(@Query('q') q: string) {
    try {
      /**
       * @q Needed validate.
       */
      const field = q.split('/'),
        query = field.shift(),
        size = field.pop();

      return await this.elasticService.searchIndex(query, field, size);
    } catch (err) {
      this.logger.log(err);
    }
  }
}

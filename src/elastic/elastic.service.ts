import { Injectable, HttpException, Logger } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';

const url = 'loacalhost:9200';

@Injectable()
export class ElasticService {
    private logger = new Logger('ElasticService')
  private readonly esclient: elasticsearch.Client;

  constructor() {
    this.esclient = new elasticsearch.Client({
      host: url,
    });
    this.esclient.ping({ requestTimeout: 3000 }).catch((error) => {
      throw new HttpException(
        {
          status: 'Error',
          message: 'ElasticSearch Cluster unable',
        },
        500,
      );
    });
  }
  async searchIndex(q: string) {
      this.logger.log(q)
    const body = {
      size: 200,
      from: 0,
      query: {
        match: {
          url: q,
        },
      },
    };
    return await this.esclient
      .search({ index: 'title', body, q })
      .then((res) => res.hits.hits)
      .catch((err) => {
        throw new HttpException(err, 500);
      });
  }
}

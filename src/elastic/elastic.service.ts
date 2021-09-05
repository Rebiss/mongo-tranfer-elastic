import { Injectable, HttpException, Logger } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ELASTIC } from '../constant/';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticService {
  private logger = new Logger('ElasticService');
  private readonly esClient: elasticsearch.Client;

  constructor() {
    this.esClient = new elasticsearch.Client({
      host: ELASTIC.LOCAL_HOST,
    });
  }

  public async searchIndex(q: string) {
    const checkIndex = await this.esClient.indices.exists({
      index: ELASTIC.INDEX,
    });

    console.log('CHACK', checkIndex);

    const body = {
      size: 200,
      from: 0,
      query: {
        match: {
          url: q,
        },
      },
    };

    return await this.esClient
      .search({ index: ELASTIC.INDEX, body, q })
      // .then((res) => this.logger.log(res.hits))
      .then((res) => {
        return res.hits.hits.map((hit) => this.logger.log(hit._source));
      })
      .catch((err: Error) => {
        throw new HttpException(err, 500);
      });
  }
}

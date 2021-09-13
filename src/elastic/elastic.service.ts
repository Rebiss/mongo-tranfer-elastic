import { Injectable, HttpException, Logger, Query } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ELASTIC } from '../other/constant';
import { getSplitQuery } from './helper/body';

@Injectable()
export class ElasticService {
  private logger = new Logger('ElasticService');
  private esClient: elasticsearch.Client;

  constructor() {
    this.esClient = new elasticsearch.Client({
      host: ELASTIC.HOSTS,
    });
  }

  public async connectionES() {
    const checkIndex = await this.esClient.indices.exists({
      index: ELASTIC.INDEX,
    });
    const isConnection = await this.esClient.cluster.health();
  }

  public async searchIndex(
    q: string,
    field: string,
    response = [],
    body = getSplitQuery(q, field),
  ) {
    if (!q.length) throw new Error('Query parametr is empty');

    await this.esClient
      .search({ index: ELASTIC.INDEX, body, q })
      .then((res) => {
        return res.hits.hits.map((hit) => {
          response.push(Object.values(hit._source));
        });
      })
      .catch((err: Error) => {
        throw new HttpException(err, 500);
      });

    return response.flat();
  }
}

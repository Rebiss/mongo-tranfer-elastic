import { Injectable, HttpException, Logger } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ELASTIC } from '../other/constant';
import { _PrefixQuery } from './query/';

@Injectable()
export class ElasticService {
  private logger = new Logger('ElasticService');
  private esClient: elasticsearch.Client;

  constructor() {
    this.esClient = new elasticsearch.Client({
      host: ELASTIC.HOSTS,
    });
  }

  /**
   * Not used
   */
  public async connectionES() {
    const checkIndex = await this.esClient.indices.exists({
      index: ELASTIC.INDEX,
    });
    const isConnection = await this.esClient.cluster.health();

    // this.logger.log(checkIndex, isConnection);
  }

  public async searchIndex(
    query: string,
    field?: string,
    cutWord?: string,
    response = [],
  ) {
    if (!query.length) throw new Error('Query parametr is empty');

    query.length > ELASTIC.MIN_WORD
      ? (cutWord = query.substring(0, ELASTIC.MIN_WORD))
      : (cutWord = query);

    const q = `${cutWord}*`,
      body = _PrefixQuery(q, field);

    /**
     * @q -The required parameter in this form
     */
    await this.esClient
      .search({ index: ELASTIC.INDEX, body, q })
      .then((res) => {
        return res.hits.hits.map((hit) => {
          response.push(Object.values(hit._source));
        });
      })
      .catch((err: Error) => {
        this.logger.log(err);

        throw new HttpException(err, 500);
      });

    return response.flat();
  }
}

import { Injectable, HttpException, Logger } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ELASTIC } from '../other/constant';
import { _PrefixQuery } from './query/';
import { SearchResponse } from './interface/';

@Injectable()
export class ElasticService {
  private logger = new Logger('ElasticService');
  private esClient: elasticsearch.Client;

  constructor() {
    this.esClient = new elasticsearch.Client({
      host: ELASTIC.HOSTS,
    });
  }

  public async connectionES(idx) {
    return await this.esClient.indices.exists({
      index: idx,
    });
  }

  public async searchIndex(query, field?, size?, cutWord?, response = {}) {
    const isExists = await this.connectionES(ELASTIC.INDEX);
    if (!isExists) throw new Error(`No Index, plese create`);
    if (!query.length) throw new Error('Query parametr is empty');

    query.length > ELASTIC.MIN_WORD
      ? (cutWord = query.substring(0, ELASTIC.MIN_WORD))
      : (cutWord = query);

    const q = `${cutWord}*`,
      body = _PrefixQuery(q, field, size);

    /**
     * @q -The required parameter in this form
     */
    await this.esClient
      .search({ index: ELASTIC.INDEX, body, q })
      .then((res: SearchResponse) => {
        console.log(res, res.hits, res.hits.hits);
        return res.hits.hits.map((hit) => {
          response = hit._source;
        });
      })
      .catch((err: Error) => {
        this.logger.log(err);

        throw new HttpException(err, 500);
      });

    return response;
  }
}

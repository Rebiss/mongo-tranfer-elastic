import { Injectable, HttpException, Logger } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ELASTIC } from '../constant/';

@Injectable()
export class ElasticService {
  private logger = new Logger('ElasticService');
  private readonly esClient: elasticsearch.Client;

  constructor() {
    this.esClient = new elasticsearch.Client({
      host: ELASTIC.HOSTS,
    });
  }

  public async searchIndex(q: string) {
    // const checkIndex = await this.esClient.indices.exists({
    //   index: ELASTIC.INDEX,
    // });

    console.log('CHACK>>>>>>', q);

    const body = {
      size: 200,
      from: 0,
      query: {
        match: {
          url: q,
        },
      },
    };
    const response = [];
    await this.esClient
      .search({ index: ELASTIC.INDEX, body, q })
      .then((res) => {
        return res.hits.hits.map((hit) => {
          const data = Object.values(hit._source);
          response.push(Object.values(hit._source));
          console.log(data);
        });
      })
      .catch((err: Error) => {
        throw new HttpException(err, 500);
      });

    return response.flat();
  }
}

import { ELASTIC, MONGO } from '../constant';

export const MIGRATE = {
  esOpts: {
    esHost: ELASTIC.HOSTS,
    esPort: ELASTIC.PORT,
    log: ELASTIC.LOG,
    apiVersion: ELASTIC.API,
    requestTimeout: ELASTIC.TIMEOUT,
  },
  moColl: MONGO.COLLECTION,
  moUrl: MONGO.HOST,
  pQueue: 250,
};

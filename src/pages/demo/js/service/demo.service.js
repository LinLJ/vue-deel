import { createSingleClass } from '@tdp/core';
import {
  HttpApiService,
  PagingData,
  PagingQuery,
  responseData,
  responseReject,
  ResponseResult,
  responseResult
} from '@tdp/http';
import { Demo, DemoApi } from '../model';

/**
 * @extends {HttpApiService<DemoApi>} */
export class DemoServiceCtor extends HttpApiService {
  httpApi = new DemoApi();

  httpModuleKey = 'demo';

  /**
   * @param {PagingQuery} query
   * @returns {Promise<PagingData<Demo>>} */
  list(query) {
    return this.http.post(this.api.page, query).then(responseData, responseReject);
  }

  /**
   * @param {string} id
   * @returns {Promise<Demo>} */
  info(id) {
    return this.http.get(this.api.info, { params: { id } }).then(responseData, responseReject);
  }

  /**
   * @param {string[]} ids
   * @returns {Promise<ResponseResult>} */
  delete(ids) {
    return this.http.delete(this.api.delete, { params: { ids: ids.join(';') } }).then(responseResult, responseResult);
  }

  /**
   * @param {Demo} demo
   * @returns {Promise<ResponseResult>} */
  save(demo) {
    return this.http.post(this.api.save, demo).then(responseResult, responseReject);
  }
}

/** demo service */
export const DemoService = createSingleClass(DemoServiceCtor);

import { Router } from '@tdp/core';
import { HttpRequestConfig, HttpResponse, HttpResponseFullInterceptor } from '@tdp/http';
import { TokenService } from '@tdp/auth';
import VueRouter from 'vue-router';
import { Notify } from 'quasar';

class AppHttpExceptionResolver {
  get tokenSrv(): typeof TokenService {
    return TokenService;
  }

  get router(): VueRouter {
    return Router;
  }

  protected resolveException(
    response: { status: number; statusText: string; from: string; data?: any },
    config: HttpRequestConfig
  ): boolean {
    let breakOff = true;
    // 1020: 不提示
    let tip = response.status !== 1020;
    const option = { type: 'negative', position: 'top', message: response.statusText };
    const { currentRoute } = this.router;
    switch (response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面, 并携带当前页面的路径
      // 清除 token
      // 在登录成功后返回当前页面, 这一步需要在登录页面操作
      case 401: {
        if (currentRoute.path !== this.tokenSrv.loginUrl) {
          const redirect = currentRoute.query.redirect || currentRoute.fullPath;
          this.router.push({
            path: this.tokenSrv.loginUrl,
            query: { redirect }
          });
          this.tokenSrv.clear();
          // location.hash = this.tokenSrv.loginUrl + '?redirect=' + location.hash.replace('#', '');
        }
        tip = false;
        break;
      }
      // 403: 无权限
      case 403: {
        if (currentRoute.path !== '/403') {
          this.router.replace({
            path: '/403',
            query: {
              redirect: currentRoute.fullPath
            }
          });
        }
        tip = false;
        break;
      }
      // 404: 请求不存在
      case 404: {
        option.message = '网络请求不存在';
        break;
      }
      case 400:
      case 500: {
        let message: string = response?.data?.message || response.statusText || '';
        if (message.includes('JSON parse error')) {
          message = '请求参数格式错误';
        } else if (message === 'Internal Server Error') {
          message = '服务器内部错误';
        }
        option.message = message;
        break;
      }
      case 504: {
        option.message = '网络请求超时';
        break;
      }
      // 其他错误, 直接抛出错误提示
      default:
        if (response.from === 'body') {
          breakOff = false;
        } else {
          console.warn('未知错误, 大部分是由于后端不支持CORS或无效配置引起', response);
        }
    }

    // 全局错误提示
    tip && Notify.create(option as any);
    return breakOff;
  }
}

/**
 * HTTP 响应拦截器
 */
export class AppHttpResponseInterceptor extends AppHttpExceptionResolver implements HttpResponseFullInterceptor {
  intercept(response: HttpResponse<any>): HttpResponse<any> | Promise<HttpResponse<any>> {
    return response.status === 200 ? this.resolveCommon(response) : response;
  }

  error(error: any): Promise<never> {
    let response = error.response;
    if (!response) {
      throw new Error(`[Response] App Interceptor Error: ${error}`);
    }
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      response = { status: 504 };
    }
    this.resolveException(response, error.config);
    return Promise.reject(response);
  }

  private resolveCommon(response: HttpResponse<any>): HttpResponse<any> | Promise<HttpResponse<any>> {
    const data = response.data;
    if (data) {
      // 以下是统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
      // 例如响应内容：
      // 错误内容：{ status: 'error', message: '非法参数', code: '' }
      // 正确内容：{ status: 'success', data: ( {} || [{}] ) }
      if (data.status === 'error') {
        const code = Number.parseInt(data.code, 10) || 0;
        if (this.resolveException({ status: code, statusText: data.message, from: 'body' }, response.config)) {
          return Promise.reject(response);
        }
      }
    }
    return response;
  }
}

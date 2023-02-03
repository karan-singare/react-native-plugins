import axios, {AxiosRequestConfig} from 'axios';

export default class SDK {
  public baseApiUrl: string;
  public appId: string;
  public headers;

  constructor(appId: string, appUrl: string) {
    this.appId = appId;
    this.baseApiUrl = this.getBaseApiUrl(appUrl);

    this.headers = {
      'Content-Type': 'application/json',
      'x-consumer': 'phone',
      'app-id': appId,
    };
  }

  async send(method: string, slug: string, data = null) {
    try {
      const url = slug ? this.baseApiUrl + slug : this.baseApiUrl;
      const config: AxiosRequestConfig = {
        method,
        data,
        url: url,
        headers: this.headers,
      };
      return (await axios(config)).data;
    } catch (error) {
      console.log('error while sending request');
      console.log(error);
    }
  }

  async get(slug: string) {
    return await this.send('get', slug);
  }

  async getAll(slug: string) {
    return await this.send('get', slug);
  }

  async post(data: any, slug: string) {
    return await this.send('post', slug, data);
  }

  async put(data: any, slug: string) {
    return await this.send('put', slug, data);
  }

  async delete(slug: string) {
    return await this.send('delete', slug);
  }

  getBaseApiUrl(appUrl: string) {
    if(appUrl.includes('.dev.')) {
      return 'https://dev-apis.mogiio.com/';
    }
    if(appUrl.includes('.qa.')) {
      return 'https://qa-apis.mogiio.com/';
    }
    if(appUrl.includes('.stag.')) {
      return 'https://stag-apis.mogiio.com/';
    }
    return 'https://apis.mogiio.com/';
  }
}

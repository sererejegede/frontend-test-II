import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env_variables } from '../../environments/environment';

@Injectable()
export class GiphyService {

  private api_key = env_variables.api_key;
  private api_url = env_variables.api_url;
  constructor(private http: HttpClient) {}

  public getGIF (params) {
    return this.http.get(`${this.api_url}?api_key=${this.api_key}&s=${params}`);
  }
}

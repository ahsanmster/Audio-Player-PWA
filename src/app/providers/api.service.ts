import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';

@Injectable()
export class ApiService {

  apiBaseUrl: string = 'https://www.muslimcentral.com/wp-json/wp/v2';

  constructor(private http: HttpClient) {

  }

  getSearchResult(items: any[], searchText: string): any {

    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( item => {
      return item.name.toLowerCase().includes(searchText);
    });
  }

  getAllChannels(page: number): any {
    const url = `${this.apiBaseUrl}/categories?per_page=${page}`;
    return this.http.get<any>(url);
  }

  getChannelById(id): any {
    const url = `${this.apiBaseUrl}/categories/${id}`;
    return this.http.get<any>(url);
  }

  getPlaylistsByChannel(id: number): any {
    const url = `${this.apiBaseUrl}/tags?categories=${id}`;
    return this.http.get<any>(url);
  }

  getPlaylistPlays(link: string): Observable<any> {
    
    const headers = new HttpHeaders().append('Content-Type', 'text/xml')
    .set("Accept", 'application/rss+xml');
    const url: string = `${link}feed/`;
    return this.http.get<any>(url);
    // .map(response => response.json());
  }

}

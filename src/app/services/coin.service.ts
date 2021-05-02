import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  constructor(private httpClient:HttpClient) { }

  getListingsLatest(): Observable<any>{
    return this.httpClient.get('/cryptocurrency/listings/latest?start=1&limit=10&convert=USD', {
      headers: new HttpHeaders({
        'X-CMC_PRO_API_KEY':  'yourcoinmarketcapkey',
      })
    })
  }
}

import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PartylistService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  registerPartylist(electionId, name) {

    const body = {
      'name': name
    };

    return this.http.post(apiUrl + `elections/${electionId}/partylists`, body, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }

  getPartylist(election_id, items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue);
    return this.http.get(apiUrl + `elections/${election_id}/partylists`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }


}

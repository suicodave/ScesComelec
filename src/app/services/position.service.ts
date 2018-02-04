import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PositionService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  registerPosition(electionId, name, numberOfWinners) {

    const body = {
      'name': name,
      'number_of_winners': numberOfWinners
    };

    return this.http.post(apiUrl + `elections/${electionId}/positions`, body, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
    });
  }

  getPositions(election_id, items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue);
    return this.http.get(apiUrl + `elections/${election_id}/positions`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }


}

import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class PartylistService {

  behaviorSource = new BehaviorSubject<number>(0);
  behaviorState = this.behaviorSource.asObservable();
  constructor(private authService: AuthService, private http: HttpClient) { }

  registerPartylist(electionId, name, partyId = null) {

    const body = {
      'name': name
    };

    if (partyId) {
      return this.http.patch(apiUrl + `elections/${electionId}/partylists/${partyId}`, body, {
        headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
      });
    } else {
      return this.http.post(apiUrl + `elections/${electionId}/partylists`, body, {
        headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
      });
    }


  }

  getPartylist(electionId, items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue);
    return this.http.get(apiUrl + `elections/${electionId}/partylists`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }

  delete(id, electionId) {

    return this.http.delete(apiUrl + `elections/${electionId}/partylists/${id}`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });

  }


}

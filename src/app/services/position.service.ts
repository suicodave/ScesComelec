import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PositionService {

  behaviorSource = new BehaviorSubject<number>(0);
  behaviorState = this.behaviorSource.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) { }

  registerPosition(electionId, name, numberOfWinners, posRank, positionId = null) {

    const body = {
      'name': name,
      'number_of_winners': numberOfWinners,
      'rank': posRank
    };

    if (positionId) {
      return this.http.patch(apiUrl + `elections/${electionId}/positions/${positionId}`, body, {
        headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      });
    } else {
      return this.http.post(apiUrl + `elections/${electionId}/positions`, body, {
        headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      });
    }


  }

  getPositions(electionId, items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue);
    return this.http.get(apiUrl + `elections/${electionId}/positions`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }

  delete(id, electionId) {
    return this.http.delete(apiUrl + `elections/${electionId}/positions/${id}`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }

}
